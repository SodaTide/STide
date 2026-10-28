import { siteConfig } from '../../site.config';
import { formatMonthDay } from './format';
import { getTranslator } from './i18n';
import type { SiteData } from './content';

function shellUrl(locale: string, path: string): string {
  const base = locale === siteConfig.defaultLocale ? path : `/${locale}${path}`;
  return base.replace(/\/{2,}/g, '/');
}

export function settingsIslandProps(
  locale: string,
  page: string,
  hue: number,
  data: SiteData,
  pageWall: string,
) {
  const t = getTranslator(locale);
  return {
    locale,
    page,
    siteHue: siteConfig.defaultHue,
    serverHue: hue,
    pageWall,
    currentLocale: locale,
    strings: {
      title: t('settings.title'),
      appearance: t('settings.appearance'),
      light: t('settings.light'),
      dark: t('settings.dark'),
      auto: t('settings.auto'),
      hue: t('settings.hue'),
      hueSite: t('settings.hueSite'),
      hueReset: t('settings.hueReset'),
      wallpaper: t('settings.wallpaper'),
      solid: t('settings.solid'),
      banner: t('settings.banner'),
      full: t('settings.full'),
      transparent: t('settings.transparent'),
      layout: t('settings.layout'),
      sidebar: t('settings.sidebar'),
      sidebarShow: t('settings.sidebarShow'),
      sidebarNote: t('settings.sidebarNote'),
      font: t('settings.font'),
      fontSong: t('settings.fontSong'),
      fontHei: t('settings.fontHei'),
      fontKai: t('settings.fontKai'),
      fontMono: t('settings.fontMono'),
      fontNote: t('settings.fontNote'),
      motion: t('settings.motion'),
      motionFull: t('settings.motionFull'),
      motionLite: t('settings.motionLite'),
      motionOff: t('settings.motionOff'),
      language: t('settings.language'),
      langNote: t('settings.langNote'),
      other: t('settings.other'),
      followPersona: t('settings.followPersona'),
      clear: t('settings.clear'),
      about: t('settings.about'),
      close: t('settings.close'),
      pageLayoutList: t('archive.layoutList'),
      pageLayoutGrid: t('archive.layoutGrid'),
      pageLayoutMasonry: t('archive.layoutMasonry'),
    },
    people: data.sortedPeople.map((p) => ({ id: p.data.id, name: p.data.name, hue: p.data.hue })),
    locales: siteConfig.locales.map((l) => ({ code: l.code, label: l.label })),
    aboutHref: shellUrl(locale, '/about/'),
  };
}

export function searchIslandProps(locale: string, data: SiteData) {
  const t = getTranslator(locale);
  return {
    locale,
    strings: {
      placeholder: t('search.placeholder'),
      hint: t('search.hint'),
      recent: t('search.recent'),
      people: t('search.people'),
      pages: t('search.pages'),
      articles: t('search.articles'),
      loading: t('search.loading'),
      unavailable: t('search.unavailable'),
      goArchive: t('search.goArchive'),
      none: t('search.none'),
      noneHint: t('search.noneHint'),
      index: t('search.index'),
      kbdUp: t('search.kbdUp'),
      kbdOpen: t('search.kbdOpen'),
      kbdClose: t('search.kbdClose'),
      archive: t('search.pageArchive'),
      peoplePage: t('search.pagePeople'),
      aboutPage: t('search.pageAbout'),
      rss: t('search.pageRss'),
    },
    recent: data.publicPosts.slice(0, 4).map((post) => ({
      title: post.data.title ?? post.body?.slice(0, 40) ?? '',
      url: `/p/${post.id.split('/').pop()}/`,
      persona: post.data.persona,
      date: formatMonthDay(post.data.date, locale),
    })),
    people: data.sortedPeople.map((p) => ({
      id: p.data.id,
      name: p.data.name,
      hue: p.data.hue,
      signature: p.data.signature,
      url: `/people/${p.data.id}/`,
    })),
    archiveCount: data.publicPosts.length,
    archiveUrl: shellUrl(locale, '/archive/'),
    peopleUrl: shellUrl(locale, '/people/'),
    aboutUrl: shellUrl(locale, '/about/'),
    rssUrl: '/rss.xml',
  };
}
