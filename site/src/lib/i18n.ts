import zhCN from '../i18n/zh-CN.json';
import zhTW from '../i18n/zh-TW.json';
import en from '../i18n/en.json';
import ja from '../i18n/ja.json';
import ru from '../i18n/ru.json';
import ko from '../i18n/ko.json';
import { siteConfig, type LocaleCode } from '../../site.config';

export type AboutSection = { h: string; p: string[] };
export type Dict = Record<string, unknown> & { 'about.sections'?: AboutSection[] };

const DICTS: Record<LocaleCode, Dict> = {
  'zh-CN': zhCN as Dict,
  'zh-TW': zhTW as Dict,
  en: en as Dict,
  ja: ja as Dict,
  ru: ru as Dict,
  ko: ko as Dict,
};

export const fallbackLocale: LocaleCode = 'zh-CN';

export function getDict(locale: string): Dict {
  return DICTS[(locale as LocaleCode) in DICTS ? (locale as LocaleCode) : fallbackLocale];
}

export function translate(locale: string, key: string, vars?: Record<string, string | number>): string {
  const dict = getDict(locale);
  let value = dict[key];
  if (typeof value !== 'string') {
    value = getDict(fallbackLocale)[key];
  }
  if (typeof value !== 'string') return key;
  if (!vars) return value;
  return value.replace(/\{(\w+)\}/g, (_, name: string) => String(vars[name] ?? `{${name}}`));
}

export function getTranslator(locale: string) {
  return (key: string, vars?: Record<string, string | number>) => translate(locale, key, vars);
}

export function aboutSections(locale: string): AboutSection[] {
  const dict = getDict(locale);
  const sections = dict['about.sections'];
  return Array.isArray(sections) ? sections : [];
}

export function localeLabel(code: string): string {
  return siteConfig.locales.find((l) => l.code === code)?.label ?? code;
}
