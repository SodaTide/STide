<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { Drawer, Segmented, Slider, Select, Switch, Icon } from 'mochi-ui';
import 'mochi-ui/styles/drawer.css';
import 'mochi-ui/styles/segmented.css';
import 'mochi-ui/styles/slider.css';
import 'mochi-ui/styles/select.css';
import 'mochi-ui/styles/switch.css';

import { PREF_DEFAULTS, currentPrefs, savePrefs, type Prefs } from '@/lib/prefs-types';

interface Props {
  locale: string;
  strings: Record<string, string>;
  page: string;
  siteHue: number;
  serverHue: number;
  pageWall: string;
  people: { id: string; name: string; hue: number }[];
  locales: { code: string; label: string }[];
  currentLocale: string;
  aboutHref: string;
}

const props = defineProps<Props>();
const s = computed(() => props.strings);

const open = ref(false);
const prefs = ref<Prefs>({ ...PREF_DEFAULTS });

const appearanceOptions = computed(() => [
  { label: '', value: 'light', icon: 'sun' },
  { label: '', value: 'dark', icon: 'moon' },
  { label: '', value: 'auto', icon: 'sun-moon' },
]);

const layoutOptions = computed(() => [
  { label: s.value.pageLayoutList, value: 'list', icon: 'list' },
  { label: s.value.pageLayoutGrid, value: 'grid', icon: 'grid' },
  { label: s.value.pageLayoutMasonry, value: 'masonry', icon: 'columns' },
]);

const motionOptions = computed(() => [
  { label: s.value.motionFull, value: 'full' },
  { label: s.value.motionLite, value: 'lite' },
  { label: s.value.motionOff, value: 'off' },
]);

const fontOptions = computed(() => [
  { label: s.value.fontSong, value: 'song' },
  { label: s.value.fontHei, value: 'hei' },
  { label: s.value.fontKai, value: 'kai' },
  { label: s.value.fontMono, value: 'mono' },
]);

const languageOptions = computed(() => props.locales.map((l) => ({ label: l.label, value: l.code })));

const showLanguage = computed(() => props.page !== 'post' && props.page !== 'persona');

const hueValue = computed({
  get: () => prefs.value.hue ?? props.serverHue ?? props.siteHue,
  set: (value: number) => setPref({ hue: Math.round(value) }),
});

const wallOptions = computed(
  () =>
    [
      { value: 'solid', label: s.value.solid },
      { value: 'banner', label: s.value.banner },
      { value: 'full', label: s.value.full },
      { value: 'transparent', label: s.value.transparent },
    ] as { value: string; label: string }[],
);

const currentWall = computed(() => {
  const chosen = prefs.value.wall ?? (props.pageWall as Prefs['wall']);
  if (chosen === 'transparent' && props.page === 'post') return 'full';
  return chosen ?? 'solid';
});

function sync() {
  prefs.value = currentPrefs();
}

function setPref(patch: Partial<Prefs>) {
  prefs.value = savePrefs(patch);
}

function openNow() {
  sync();
  open.value = true;
}

function onColorMode(value: string | number) {
  setPref({ colorMode: value as Prefs['colorMode'] });
}

function onLayout(value: string | number) {
  setPref({ layout: value as Prefs['layout'] });
}

function onMotion(value: string | number) {
  setPref({ motion: value as Prefs['motion'] });
}

function onFont(value: unknown) {
  setPref({ font: value as Prefs['font'] });
}

function onLanguage(value: unknown) {
  const code = String(value);
  setPref({ lang: code });
  const page =
    props.page === 'archive' || props.page === 'people' || props.page === 'about' || props.page === 'search'
      ? props.page
      : 'home';
  const base = page === 'home' ? '/' : `/${page}/`;
  const target = code === 'zh-CN' ? base : base === '/' ? `/${code}/` : `/${code}${base}`;
  window.location.assign(target);
}

function onSidebar(value: boolean) {
  setPref({ sidebar: value });
}

function onFollowPersona(value: boolean) {
  setPref({ followPersona: value });
}

function onHue(value: number | number[]) {
  hueValue.value = Array.isArray(value) ? value[0] : value;
}

function pickWall(value: string) {
  setPref({ wall: value as Prefs['wall'] });
}

function pickHue(hue: number | null) {
  setPref({ hue });
}

function clearAll() {
  window.STIDE_PREFS?.reset();
  prefs.value = { ...PREF_DEFAULTS };
  window.location.reload();
}

onMounted(() => {
  sync();
  document.addEventListener('stide:open-settings', openNow);
});

onBeforeUnmount(() => {
  document.removeEventListener('stide:open-settings', openNow);
});
</script>

<template>
  <Drawer
    v-model:open="open"
    placement="right"
    :size="392"
    :show-close="false"
    title=""
    custom-class="stide-settings"
  >
    <div class="settings-panel">
      <div class="settings-head">
        <h3>{{ s.title }}</h3>
        <button type="button" class="icon-btn" :aria-label="s.close" @click="open = false">
          <Icon name="close" :size="18" />
        </button>
      </div>

      <div class="settings-body">
        <section class="set-section">
          <div class="set-label">{{ s.appearance }}</div>
          <Segmented :options="appearanceOptions" :model-value="prefs.colorMode" @update:model-value="onColorMode" />
        </section>

        <section class="set-section">
          <div class="set-label">{{ s.hue }}</div>
          <div class="hue-row">
            <div class="hue-dots">
              <button
                type="button"
                class="hue-dot"
                :class="{ on: prefs.hue === null }"
                :style="{ '--h': siteHue }"
                :title="s.hueSite"
                :aria-label="s.hueSite"
                @click="pickHue(null)"
              />
              <button
                v-for="person in people"
                :key="person.id"
                type="button"
                class="hue-dot"
                :class="{ on: prefs.hue === person.hue }"
                :style="{ '--h': person.hue }"
                :title="person.name"
                :aria-label="person.name"
                @click="pickHue(person.hue)"
              />
            </div>
          </div>
          <Slider :model-value="hueValue" :min="0" :max="360" :step="1" class="hue-slider" @update:model-value="onHue" />
          <div class="set-note">{{ s.hueReset }}：{{ prefs.hue ?? s.hueSite }}</div>
        </section>

        <section class="set-section">
          <div class="set-label">{{ s.wallpaper }}</div>
          <div class="wall-tiles">
            <button
              v-for="option in wallOptions"
              :key="option.value"
              type="button"
              class="wall-tile"
              :class="{ on: currentWall === option.value }"
              :aria-pressed="currentWall === option.value"
              :aria-label="option.label"
              @click="pickWall(option.value)"
            >
              <span :class="option.value === 'solid' ? 'solid' : option.value === 'banner' ? 'sky' : 'full'" />
              <span class="line" />
              <span class="line" style="width: 60%" />
            </button>
          </div>
        </section>

        <section class="set-section">
          <div class="set-label">{{ s.layout }}</div>
          <Segmented :options="layoutOptions" :model-value="prefs.layout" @update:model-value="onLayout" />
        </section>

        <section class="set-section">
          <div class="set-label">{{ s.sidebar }}</div>
          <div class="set-inline">
            <span>{{ s.sidebarShow }}</span>
            <Switch :model-value="prefs.sidebar" :aria-label="s.sidebarShow" @update:model-value="onSidebar" />
          </div>
          <div class="set-note">{{ s.sidebarNote }}</div>
        </section>

        <section class="set-section">
          <div class="set-label">{{ s.font }}</div>
          <Select class="set-select" :options="fontOptions" :model-value="prefs.font" @update:model-value="onFont" />
          <div class="set-note">{{ s.fontNote }}</div>
        </section>

        <section class="set-section">
          <div class="set-label">{{ s.motion }}</div>
          <Segmented :options="motionOptions" :model-value="prefs.motion" @update:model-value="onMotion" />
        </section>

        <section v-if="showLanguage" class="set-section">
          <div class="set-label">{{ s.language }}</div>
          <Select
            class="set-select"
            :options="languageOptions"
            :model-value="currentLocale"
            @update:model-value="onLanguage"
          />
          <div class="set-note">{{ s.langNote }}</div>
        </section>

        <section class="set-section">
          <div class="set-label">{{ s.other }}</div>
          <div class="set-inline">
            <span>{{ s.followPersona }}</span>
            <Switch
              :model-value="prefs.followPersona"
              :aria-label="s.followPersona"
              @update:model-value="onFollowPersona"
            />
          </div>
          <div class="set-inline" style="margin-top: 14px">
            <button type="button" class="clear-btn" @click="clearAll">{{ s.clear }}</button>
            <a class="link-btn" :href="aboutHref">{{ s.about }}</a>
          </div>
        </section>
      </div>
    </div>
  </Drawer>
</template>

<style>
.hue-slider {
  margin-top: 14px;
}
.hue-slider .mc-slider__rail {
  background: linear-gradient(
    90deg,
    hsl(0 62% 58%),
    hsl(60 62% 58%),
    hsl(120 62% 58%),
    hsl(180 62% 58%),
    hsl(240 62% 58%),
    hsl(300 62% 58%),
    hsl(360 62% 58%)
  );
}
.hue-slider .mc-slider__fill,
.hue-slider .mc-slider__groove {
  opacity: 0;
}
</style>
