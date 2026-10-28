export type ColorMode = 'light' | 'dark' | 'auto';
export type WallpaperMode = 'solid' | 'banner' | 'full' | 'transparent';
export type LayoutMode = 'list' | 'grid' | 'masonry';
export type FontPreset = 'song' | 'hei' | 'kai' | 'mono';
export type MotionLevel = 'full' | 'lite' | 'off';

export interface Prefs {
  colorMode: ColorMode;
  hue: number | null;
  wall: WallpaperMode | null;
  layout: LayoutMode;
  sidebar: boolean;
  font: FontPreset;
  motion: MotionLevel;
  followPersona: boolean;
  lang: string | null;
}

export interface StidePrefsApi {
  key: string;
  defaults: Prefs;
  read(): Prefs;
  effective(): Prefs;
  write(patch: Partial<Prefs>): Prefs;
  apply(next?: Partial<Prefs>): void;
  reset(): void;
}

declare global {
  interface Window {
    STIDE_PREFS?: StidePrefsApi;
  }
}

export const PREF_DEFAULTS: Prefs = {
  colorMode: 'auto',
  hue: null,
  wall: null,
  layout: 'list',
  sidebar: true,
  font: 'song',
  motion: 'full',
  followPersona: true,
  lang: null,
};

export function currentPrefs(): Prefs {
  if (typeof window === 'undefined' || !window.STIDE_PREFS) return { ...PREF_DEFAULTS };
  return window.STIDE_PREFS.read();
}

export function savePrefs(patch: Partial<Prefs>): Prefs {
  if (typeof window === 'undefined' || !window.STIDE_PREFS) return { ...PREF_DEFAULTS, ...patch };
  return window.STIDE_PREFS.write(patch);
}

export function resolvedColorMode(mode: ColorMode): 'light' | 'dark' {
  if (mode !== 'auto') return mode;
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}
