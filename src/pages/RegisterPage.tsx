import { type ChangeEvent, type FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './RegisterPage.module.css';

const Gender = {
  MALE: 'male',
  FEMALE: 'female',
} as const;

type Gender = (typeof Gender)[keyof typeof Gender];

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  telegram: string;
  email: string;
  city: string;
  gender: Gender | '';
  birthDate: string;
  agreeToPolicy: boolean;
}

function formatDateInput(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  const parts: string[] = [];

  if (digits.length > 0) parts.push(digits.slice(0, 4));
  if (digits.length > 4) parts.push(digits.slice(4, 6));
  if (digits.length > 6) parts.push(digits.slice(6, 8));

  return parts.join('-');
}

function calculateAge(birthDate: string): number | null {
  const match = birthDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;

  const [, yearStr, monthStr, dayStr] = match;
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);

  if (month < 1 || month > 12 || day < 1 || day > 31) return null;

  const birth = new Date(year, month - 1, day);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    telegram: '',
    email: '',
    city: '',
    gender: '',
    birthDate: '',
    agreeToPolicy: false,
  });
  const [cityQuery, setCityQuery] = useState('');
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [isCityLoading, setIsCityLoading] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cityWrapRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  const fetchCities = useCallback((query: string) => {
    const q = query.trim();
    if (q.length < 2) {
      setCitySuggestions([]);
      setIsCityLoading(false);
      return;
    }
    const token = import.meta.env.VITE_DADATA_TOKEN as string | undefined;
    console.log('[DaData] query:', q, 'token present:', !!token);
    if (!token) {
      console.warn('[DaData] VITE_DADATA_TOKEN is missing — restart npm run dev');
      setCitySuggestions([]);
      setIsCityLoading(false);
      return;
    }
    const controller = new AbortController();
    fetch(
      'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
      {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          query: q,
          count: 10,
          from_bound: { value: 'city' },
          to_bound: { value: 'settlement' },
          locations: [{ country: '*' }],
        }),
      },
    )
      .then((res) => res.json())
      .then((data: { suggestions?: Array<{ value: string; data: { city?: string | null; settlement?: string | null; region?: string | null; country?: string | null } }> }) => {
        const seen = new Set<string>();
        const results: string[] = [];
        for (const s of data.suggestions ?? []) {
          const city = s.data.city || s.data.settlement;
          if (!city) continue;
          const region = s.data.region && s.data.region !== city ? s.data.region : null;
          const country = s.data.country;
          const label = [city, region, country].filter(Boolean).join(', ');
          if (!seen.has(label)) {
            seen.add(label);
            results.push(label);
          }
        }
        setCitySuggestions(results);
      })
      .catch(() => {})
      .finally(() => setIsCityLoading(false));
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (cityQuery.trim().length < 2) {
      setCitySuggestions([]);
      return;
    }
    setIsCityLoading(true);
    debounceRef.current = setTimeout(() => fetchCities(cityQuery), 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [cityQuery, fetchCities]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cityWrapRef.current && !cityWrapRef.current.contains(e.target as Node)) {
        setIsCityDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : false;

    if (name === 'birthDate') {
      const formatted = formatDateInput(value);
      setForm((prev) => ({ ...prev, birthDate: formatted }));
      if (formatted.length === 10) {
        const age = calculateAge(formatted);
        if (age !== null && (age < 16 || age > 22)) {
          setErrors((prev) => ({ ...prev, birthDate: 'Возраст должен быть от 16 до 22 лет' }));
        } else {
          setErrors((prev) => {
            const { birthDate: _, ...rest } = prev;
            return rest;
          });
        }
      } else {
        setErrors((prev) => {
          const { birthDate: _, ...rest } = prev;
          return rest;
        });
      }
      return;
    }

    if (name === 'gender') {
      setForm((prev) => ({ ...prev, gender: value as Gender | '' }));
      if (value === Gender.MALE) {
        setErrors((prev) => ({ ...prev, gender: 'Форум только для девушек' }));
      } else {
        setErrors((prev) => {
          const { gender: _, ...rest } = prev;
          return rest;
        });
      }
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormData, string>> = {};

    if (!form.firstName.trim()) next.firstName = 'Введите имя';
    if (!form.lastName.trim()) next.lastName = 'Введите фамилию';
    if (!form.phone.trim()) next.phone = 'Введите телефон';
    if (!form.telegram.trim()) next.telegram = 'Введите Telegram';
    if (!form.email.trim()) {
      next.email = 'Введите email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Некорректный email';
    }
    if (!form.city) next.city = 'Выберите город';
    if (!form.gender) {
      next.gender = 'Выберите пол';
    } else if (form.gender === Gender.MALE) {
      next.gender = 'Форум только для девушек';
    }
    if (!form.birthDate) {
      next.birthDate = 'Введите дату рождения';
    } else {
      const age = calculateAge(form.birthDate);
      if (age === null) {
        next.birthDate = 'Формат: YYYY-MM-DD';
      } else if (age < 16 || age > 22) {
        next.birthDate = 'Возраст должен быть от 16 до 22 лет';
      }
    }
    if (!form.agreeToPolicy) next.agreeToPolicy = 'Необходимо согласие';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault()
  //   if (!validate()) return

  //   setIsSubmitting(true)
  //   try {
  //     // TODO: заменить на реальный эндпоинт
  //     await new Promise((resolve) => setTimeout(resolve, 800))
  //     setIsSubmitted(true)
  //   } finally {
  //     setIsSubmitting(false)
  //   }
  // }

  const WEBHOOK_URL = 'https://wh.webjack.ru/http/d68363dd564b4c21ab62208f25961de2/';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const formData = new FormData();

      formData.append('firstName', form.firstName.trim());
      formData.append('lastName', form.lastName.trim());
      formData.append('phone', form.phone.trim());
      formData.append('telegram', form.telegram.trim());
      formData.append('email', form.email.trim());
      formData.append('city', form.city);
      formData.append('gender', form.gender);
      formData.append('birthDate', form.birthDate);
      formData.append('age', String(calculateAge(form.birthDate)));
      formData.append('agreeToPolicy', String(form.agreeToPolicy));

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`);
      }

      // Успешная отправка
      setIsSubmitted(true);
    } catch (error) {
      console.error('Ошибка отправки заявки:', error);

      window.alert('Не удалось отправить заявку. Попробуйте ещё раз или свяжитесь с нами.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={styles.page}>
        <div className={styles.successCard}>
          <h2 className={styles.successTitle}>Заявка отправлена!</h2>
          <p className={styles.successText}>Мы свяжемся с вами в ближайшее время.</p>
          <button type="button" className={styles.backButton} onClick={() => navigate('/')}>
            Вернуться на главную
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <button type="button" className={styles.backLink} onClick={() => navigate('/')}>
          ← Назад
        </button>
        <h1 className={styles.heading}>Регистрация</h1>
        <p className={styles.subtitle}>Заполните форму для участия в Форуме Алабуга Старт</p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.row}>
            <label className={styles.field}>
              <span className={styles.label}>Имя</span>
              <input
                className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Анна"
              />
              {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Фамилия</span>
              <input
                className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Иванова"
              />
              {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
            </label>
          </div>

          <div className={styles.row}>
            <label className={styles.field}>
              <span className={styles.label}>Телефон</span>
              <input
                className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+7 (999) 123-45-67"
              />
              {errors.phone && <span className={styles.error}>{errors.phone}</span>}
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Telegram</span>
              <input
                className={`${styles.input} ${errors.telegram ? styles.inputError : ''}`}
                type="text"
                name="telegram"
                value={form.telegram}
                onChange={handleChange}
                placeholder="@username"
              />
              {errors.telegram && <span className={styles.error}>{errors.telegram}</span>}
            </label>
          </div>

          <label className={styles.field}>
            <span className={styles.label}>Email</span>
            <input
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="anna@example.com"
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </label>

          <div className={styles.row}>
            <div className={styles.field} ref={cityWrapRef}>
              <span className={styles.label}>Город</span>
              <input
                className={`${styles.input} ${errors.city ? styles.inputError : ''}`}
                type="text"
                autoComplete="off"
                value={form.city || cityQuery}
                onChange={(e) => {
                  setCityQuery(e.target.value);
                  setForm((prev) => ({ ...prev, city: '' }));
                  setIsCityDropdownOpen(true);
                }}
                onFocus={() => setIsCityDropdownOpen(true)}
                placeholder="Начните вводить город"
              />
              {isCityDropdownOpen && citySuggestions.length > 0 && (
                <ul className={styles.dropdown}>
                  {citySuggestions.map((city) => (
                    <li key={city}>
                      <button
                        type="button"
                        className={styles.dropdownItem}
                        onClick={() => {
                          setForm((prev) => ({ ...prev, city }));
                          setCityQuery('');
                          setIsCityDropdownOpen(false);
                        }}>
                        {city}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {isCityLoading && <span className={styles.hint}>Поиск...</span>}
              {errors.city && <span className={styles.error}>{errors.city}</span>}
            </div>

            <label className={styles.field}>
              <span className={styles.label}>Пол</span>
              <select
                className={`${styles.input} ${styles.select} ${errors.gender ? styles.inputError : ''}`}
                name="gender"
                value={form.gender}
                onChange={handleChange}>
                <option value="" disabled>
                  Выберите пол
                </option>
                <option value={Gender.FEMALE}>Женский</option>
                <option value={Gender.MALE}>Мужской</option>
              </select>
              {errors.gender && <span className={styles.error}>{errors.gender}</span>}
            </label>
          </div>

          <label className={styles.field}>
            <span className={styles.label}>Дата рождения</span>
            <input
              className={`${styles.input} ${errors.birthDate ? styles.inputError : ''}`}
              type="text"
              name="birthDate"
              value={form.birthDate}
              onChange={handleChange}
              placeholder="YYYY-MM-DD"
              maxLength={10}
              inputMode="numeric"
            />
            <span className={styles.hint}>Формат: YYYY-MM-DD, возраст от 16 до 22</span>
            {errors.birthDate && <span className={styles.error}>{errors.birthDate}</span>}
          </label>

          <label
            className={`${styles.checkboxLabel} ${errors.agreeToPolicy ? styles.checkboxError : ''}`}>
            <input
              className={styles.checkbox}
              type="checkbox"
              name="agreeToPolicy"
              checked={form.agreeToPolicy}
              onChange={handleChange}
            />
            <span>
              Я согласен(а) на{' '}
              <Link className={styles.policyLink} to="/approval" target="_blank" rel="noopener noreferrer">
                обработку персональных данных
              </Link>
            </span>
          </label>
          {errors.agreeToPolicy && <span className={styles.error}>{errors.agreeToPolicy}</span>}

          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? 'Отправка...' : 'Зарегистрироваться'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
