const TRACKING_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const;

const TRACKING_STORAGE_KEY = 'as_tracking_v1';
const YANDEX_METRIKA_ID = 109187638;
const YANDEX_METRIKA_SCRIPT_ID = 'yandex-metrika-script';

/** Предел длины одного UTM-значения; всё, что длиннее, обрезается. */
const MAX_PARAM_LENGTH = 256;
/** Предел длины URL (landing_url / referrer). */
const MAX_URL_LENGTH = 2048;
/** Управляющие символы, включая CR/LF — их нельзя пропускать дальше в хранилище и в webhook. */
// eslint-disable-next-line no-control-regex -- вырезание управляющих символов и есть цель этого шаблона
const CONTROL_CHARS = /[\u0000-\u001F\u007F]/g;

type TrackingKey = (typeof TRACKING_KEYS)[number];
export type TrackingData = Partial<Record<TrackingKey | 'referrer' | 'landing_url' | 'first_visit_at', string>>;

type YandexMetrikaFn = {
  (...args: unknown[]): void;
  a?: unknown[][];
  l?: number;
};

type WindowWithMetrika = Window & {
  ym?: YandexMetrikaFn;
  dataLayer?: unknown[];
  __asMetrikaInitialized?: boolean;
};

/**
 * Приводит значение из URL/хранилища к безопасному виду:
 * отбрасывает не-строки, режет управляющие символы и ограничивает длину.
 * Возвращает undefined, если после очистки не осталось значимого содержимого.
 */
function sanitizeValue(value: unknown, maxLength = MAX_PARAM_LENGTH): string | undefined {
  if (typeof value !== 'string') return undefined;

  const cleaned = value.replace(CONTROL_CHARS, '').trim().slice(0, maxLength);
  return cleaned || undefined;
}

/** Пропускает только http(s)-URL разумной длины: referrer и landing_url не должны стать javascript:/data:. */
function sanitizeUrl(value: unknown): string | undefined {
  const cleaned = sanitizeValue(value, MAX_URL_LENGTH);
  if (!cleaned) return undefined;

  try {
    const url = new URL(cleaned);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return undefined;
    return cleaned;
  } catch {
    return undefined;
  }
}

/** ISO-дата или ничего — защищает от подмены first_visit_at произвольной строкой. */
function sanitizeIsoDate(value: unknown): string | undefined {
  const cleaned = sanitizeValue(value, 32);
  if (!cleaned) return undefined;

  const parsed = new Date(cleaned);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
}

/** Отбрасывает всё, что не входит в whitelist, и валидирует каждое поле по его типу. */
function sanitizeTracking(input: unknown): TrackingData {
  if (typeof input !== 'object' || input === null || Array.isArray(input)) return {};

  const source = input as Record<string, unknown>;
  const result: TrackingData = {};

  for (const key of TRACKING_KEYS) {
    const value = sanitizeValue(source[key]);
    if (value) result[key] = value;
  }

  const referrer = sanitizeUrl(source.referrer);
  if (referrer) result.referrer = referrer;

  const landingUrl = sanitizeUrl(source.landing_url);
  if (landingUrl) result.landing_url = landingUrl;

  const firstVisitAt = sanitizeIsoDate(source.first_visit_at);
  if (firstVisitAt) result.first_visit_at = firstVisitAt;

  return result;
}

function getStoredTracking(): TrackingData {
  try {
    const raw = sessionStorage.getItem(TRACKING_STORAGE_KEY);
    // Содержимое sessionStorage правится пользователем — доверять его форме нельзя.
    return raw ? sanitizeTracking(JSON.parse(raw)) : {};
  } catch {
    return {};
  }
}

function getFreshTracking(search: string): TrackingData {
  const params = new URLSearchParams(search);
  const fresh: TrackingData = {};

  for (const key of TRACKING_KEYS) {
    const value = sanitizeValue(params.get(key));
    if (value) fresh[key] = value;
  }

  return fresh;
}

export function captureTracking(): TrackingData {
  if (typeof window === 'undefined') return {};

  const stored = getStoredTracking();
  const fresh = getFreshTracking(window.location.search);
  const hasFreshUtm = Object.keys(fresh).length > 0;

  const merged: TrackingData = sanitizeTracking(
    hasFreshUtm
      ? {
          ...fresh,
          referrer: document.referrer || stored.referrer || '',
          landing_url: window.location.href,
          first_visit_at: stored.first_visit_at || new Date().toISOString(),
        }
      : {
          ...stored,
          referrer: stored.referrer || document.referrer || '',
          landing_url: stored.landing_url || window.location.href,
          first_visit_at: stored.first_visit_at || new Date().toISOString(),
        },
  );

  try {
    sessionStorage.setItem(TRACKING_STORAGE_KEY, JSON.stringify(merged));
  } catch {
    /* ignore quota errors */
  }

  return merged;
}

/**
 * Разрешает только внутренние пути вида "/foo".
 * Отсекает абсолютные и протокол-относительные ("//evil.com") адреса,
 * чтобы значение никогда не превратилось во внешний редирект.
 */
function sanitizeInternalPath(path: unknown): string {
  if (typeof path !== 'string') return '/';

  // Браузеры трактуют "\" в URL как "/", поэтому убираем его до проверки на "//".
  const cleaned = path.replace(CONTROL_CHARS, '').replace(/\\/g, '/').trim();
  if (!cleaned.startsWith('/') || cleaned.startsWith('//')) return '/';

  return cleaned;
}

export function getTrackedPath(path: string): string {
  const safePath = sanitizeInternalPath(path);
  if (typeof window === 'undefined') return safePath;

  const tracking = {
    ...getStoredTracking(),
    ...getFreshTracking(window.location.search),
  };

  // Разбор относительно origin корректно доклеивает метки к пути,
  // у которого уже есть свой query или якорь.
  const url = new URL(safePath, window.location.origin);

  for (const key of TRACKING_KEYS) {
    const value = tracking[key];
    if (value) url.searchParams.set(key, value);
  }

  return `${url.pathname}${url.search}${url.hash}`;
}

export function addYandexMetrikaToHead(): void {
  if (typeof window === 'undefined') return;

  const w = window as WindowWithMetrika;
  w.dataLayer = w.dataLayer || [];
  w.ym =
    w.ym ||
    function ymQueue(...args: unknown[]) {
      w.ym!.a = w.ym!.a || [];
      w.ym!.a.push(args);
    };
  w.ym.l = w.ym.l || Date.now();

  if (!document.getElementById(YANDEX_METRIKA_SCRIPT_ID)) {
    const script = document.createElement('script');
    script.id = YANDEX_METRIKA_SCRIPT_ID;
    script.async = true;
    script.src = `https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRIKA_ID}`;
    document.head.appendChild(script);
  }

  if (w.__asMetrikaInitialized) return;

  w.ym(YANDEX_METRIKA_ID, 'init', {
    webvisor: true,
    clickmap: true,
    ecommerce: 'dataLayer',
    referrer: document.referrer,
    url: window.location.href,
    accurateTrackBounce: true,
    trackLinks: true,
  });
  w.__asMetrikaInitialized = true;
}

export function sendYandexPageHit(url?: string): void {
  if (typeof window === 'undefined') return;

  addYandexMetrikaToHead();
  const w = window as WindowWithMetrika;
  w.ym?.(YANDEX_METRIKA_ID, 'hit', url || window.location.href, { referrer: document.referrer });
}

export function sendYandexGoal(goal: string): void {
  if (typeof window === 'undefined') return;

  addYandexMetrikaToHead();
  const w = window as WindowWithMetrika;
  w.ym?.(YANDEX_METRIKA_ID, 'reachGoal', goal);
}
