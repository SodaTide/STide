<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { Dialog } from 'mochi-ui';
import 'mochi-ui/styles/dialog.css';
import SearchPanel from './SearchPanel.vue';

interface Props {
  locale: string;
  strings: Record<string, string>;
  recent: { title: string; url: string; persona: string; date: string }[];
  people: { id: string; name: string; hue: number; signature: string; url: string }[];
  archiveCount: number;
  archiveUrl: string;
  peopleUrl: string;
  aboutUrl: string;
  rssUrl: string;
}

const props = defineProps<Props>();
const open = ref(false);

function openNow() {
  open.value = true;
}

onMounted(() => {
  document.addEventListener('stide:open-search', openNow);
});

onBeforeUnmount(() => {
  document.removeEventListener('stide:open-search', openNow);
});
</script>

<template>
  <Dialog
    v-model:open="open"
    :show-close="false"
    title=""
    :width="640"
    custom-class="stide-search"
    :close-on-click-modal="true"
  >
    <SearchPanel
      :open="open"
      :locale="props.locale"
      :strings="props.strings"
      :recent="props.recent"
      :people="props.people"
      :archive-count="props.archiveCount"
      :archive-url="props.archiveUrl"
      :people-url="props.peopleUrl"
      :about-url="props.aboutUrl"
      :rss-url="props.rssUrl"
      @close="open = false"
    />
  </Dialog>
</template>
