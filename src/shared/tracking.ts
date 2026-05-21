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

function getStoredTracking(): TrackingData {
  try {
    const raw = sessionStorage.getItem(TRACKING_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as TrackingData) : {};
  } catch {
    return {};
  }
}

function getFreshTracking(search: string): TrackingData {
  const params = new URLSearchParams(search);
  const fresh: TrackingData = {};

  for (const key of TRACKING_KEYS) {
    const value = params.get(key);
    if (value) fresh[key] = value;
  }

  return fresh;
}

export function captureTracking(): TrackingData {
  if (typeof window === 'undefined') return {};

  const stored = getStoredTracking();
  const fresh = getFreshTracking(window.location.search);
  const hasFreshUtm = Object.keys(fresh).length > 0;

  const merged: TrackingData = hasFreshUtm
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
      };

  try {
    sessionStorage.setItem(TRACKING_STORAGE_KEY, JSON.stringify(merged));
  } catch {
    /* ignore quota errors */
  }

  return merged;
}

export function getTrackedPath(path: string): string {
  if (typeof window === 'undefined') return path;

  const tracking = {
    ...getStoredTracking(),
    ...getFreshTracking(window.location.search),
  };
  const params = new URLSearchParams();

  for (const key of TRACKING_KEYS) {
    const value = tracking[key];
    if (value) params.set(key, value);
  }

  const query = params.toString();
  return query ? `${path}?${query}` : path;
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
