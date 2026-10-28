/**
 * 归档页：URL 状态（?layout= / ?who= / ?year=）优先于页面局部，再优先于全局偏好。
 * 无 JS 时全部可见、按列表渲染。
 */
declare global {
  interface Window {
    __stideArchive?: boolean;
  }
}

interface ArchiveState {
  who: string;
  layout: 'list' | 'grid' | 'masonry';
  year: string | null;
}

const w = window as Window;

function readState(): ArchiveState {
  const params = new URLSearchParams(window.location.search);
  const layout = params.get('layout');
  const htmlLayout = document.documentElement.getAttribute('data-st-layout');
  const value = layout === 'grid' || layout === 'masonry' || layout === 'list' ? layout : htmlLayout;
  return {
    who: params.get('who') ?? 'all',
    layout: value === 'grid' || value === 'masonry' ? value : 'list',
    year: params.get('year'),
  };
}

function writeState(state: ArchiveState) {
  const url = new URL(window.location.href);
  if (state.layout !== 'list') url.searchParams.set('layout', state.layout);
  else url.searchParams.delete('layout');
  if (state.who !== 'all') url.searchParams.set('who', state.who);
  else url.searchParams.delete('who');
  if (state.year) url.searchParams.set('year', state.year);
  else url.searchParams.delete('year');
  history.replaceState(null, '', url);
}

function apply(state: ArchiveState, updateUrl = false) {
  const list = document.querySelector('[data-archive-list]');
  if (!list) return;

  document.documentElement.setAttribute('data-st-layout', state.layout);

  let visible = 0;
  const byYear = new Map<string, number>();
  for (const row of document.querySelectorAll<HTMLElement>('[data-archive-row]')) {
    const matchWho = state.who === 'all' || row.dataset.persona === state.who;
    const matchYear = !state.year || row.dataset.archiveYearRow === state.year;
    const show = matchWho && matchYear;
    row.hidden = !show;
    if (show) {
      visible += 1;
      const year = row.dataset.archiveYearRow ?? '';
      byYear.set(year, (byYear.get(year) ?? 0) + 1);
    }
  }

  for (const label of document.querySelectorAll<HTMLElement>('[data-archive-year]')) {
    const year = label.dataset.archiveYear ?? '';
    label.hidden = (byYear.get(year) ?? 0) === 0;
  }

  const count = document.querySelector<HTMLElement>('[data-archive-count]');
  if (count) {
    const template = count.dataset.template ?? '{n}';
    count.textContent = template.replace('{n}', String(visible));
  }

  for (const button of document.querySelectorAll<HTMLElement>('[data-archive-layout]')) {
    const on = button.dataset.archiveLayout === state.layout;
    button.classList.toggle('on', on);
    button.setAttribute('aria-pressed', String(on));
  }
  for (const button of document.querySelectorAll<HTMLElement>('[data-archive-who]')) {
    const on = button.dataset.archiveWho === state.who;
    button.classList.toggle('on', on);
    if (button.tagName === 'BUTTON') button.setAttribute('aria-pressed', String(on));
  }

  if (updateUrl) writeState(state);
}

if (!w.__stideArchive) {
  w.__stideArchive = true;

  document.addEventListener('click', (event) => {
    const target = event.target as Element | null;
    const layoutButton = target?.closest<HTMLElement>('[data-archive-layout]');
    if (layoutButton) {
      const value = layoutButton.dataset.archiveLayout;
      if (value === 'list' || value === 'grid' || value === 'masonry') {
        apply({ ...readState(), layout: value }, true);
      }
      return;
    }
    const whoButton = target?.closest<HTMLElement>('[data-archive-who]');
    if (whoButton) {
      apply({ ...readState(), who: whoButton.dataset.archiveWho ?? 'all' }, true);
    }
  });

  document.addEventListener('astro:page-load', () => {
    if (document.querySelector('[data-archive-list]')) apply(readState());
  });

  if (document.querySelector('[data-archive-list]')) apply(readState());
}

export {};
