import { dateParts, SITE_TZ } from './content';

const dateFormatters = new Map<string, Intl.DateTimeFormat>();

const DATE_STYLES: Record<string, Intl.DateTimeFormatOptions> = {
  'zh-CN': { year: 'numeric', month: '2-digit', day: '2-digit' },
  'zh-TW': { year: 'numeric', month: '2-digit', day: '2-digit' },
  en: { year: 'numeric', month: 'short', day: '2-digit' },
  ja: { year: 'numeric', month: '2-digit', day: '2-digit' },
  ru: { year: 'numeric', month: 'short', day: '2-digit' },
  ko: { year: 'numeric', month: '2-digit', day: '2-digit' },
};

function formatter(locale: string, options: Intl.DateTimeFormatOptions): Intl.DateTimeFormat {
  const key = `${locale}:${JSON.stringify(options)}`;
  let f = dateFormatters.get(key);
  if (!f) {
    f = new Intl.DateTimeFormat(locale, { ...options, timeZone: SITE_TZ });
    dateFormatters.set(key, f);
  }
  return f;
}

/** 01 §9：2026.10.28 / Oct 28, 2026 / 28 окт. 2026 / 2026. 10. 28. */
export function formatDate(date: Date, locale: string): string {
  const p = dateParts(date);
  const mm = String(p.month).padStart(2, '0');
  const dd = String(p.day).padStart(2, '0');
  if (locale === 'en') return formatter(locale, { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
  if (locale === 'ru') return formatter(locale, { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
  if (locale === 'ko') return `${p.year}. ${mm}. ${dd}.`;
  return `${p.year}.${mm}.${dd}`;
}

/** 10.28（时间流左列；不写年份） */
export function formatMonthDay(date: Date, locale: string): string {
  const p = dateParts(date);
  const mm = String(p.month).padStart(2, '0');
  const dd = String(p.day).padStart(2, '0');
  if (locale === 'en') return formatter(locale, { month: 'short', day: '2-digit' }).format(date);
  if (locale === 'ru') return formatter(locale, { day: '2-digit', month: 'short' }).format(date);
  if (locale === 'ko') return `${mm}. ${dd}.`;
  return `${mm}.${dd}`;
}

export function formatTime(date: Date): string {
  const p = dateParts(date);
  return `${String(p.hour).padStart(2, '0')}:${String(p.minute).padStart(2, '0')}`;
}

/** 14:03 · 10.28 —— 文章页时间行（01 §2：不写年份） */
export function formatPostStamp(date: Date, locale: string): string {
  if (locale === 'en') {
    return `${formatter(locale, { hour: '2-digit', minute: '2-digit', hour12: false }).format(date)} · ${formatMonthDay(date, locale)}`;
  }
  if (locale === 'ru') {
    return `${formatter(locale, { hour: '2-digit', minute: '2-digit', hour12: false }).format(date)} · ${formatMonthDay(date, locale)}`;
  }
  return `${formatTime(date)} · ${formatMonthDay(date, locale)}`;
}

/** 2026.03.02 */
export function formatDay(iso: string, locale = 'zh-CN'): string {
  return formatDate(new Date(`${iso}T00:00:00+08:00`), locale);
}

export function formatNumber(value: number, locale: string): string {
  return new Intl.NumberFormat(locale).format(value);
}

/** ISO 日期，用于 datetime 属性与 RSS */
export function iso(date: Date): string {
  return date.toISOString();
}

export function datePartsOf(date: Date) {
  return dateParts(date);
}
