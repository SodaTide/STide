/**
 * 人物索引排序（全部 / 最近活跃）
 * 无 JS 时保持 registry 顺序；排序只重排 DOM，不改内容。
 */
declare global {
  interface Window {
    __stidePeopleSort?: boolean;
  }
}

const w = window as Window;

function applySort(mode: 'all' | 'recent', updateUrl = false) {
  const list = document.querySelector<HTMLElement>('[data-people-list]');
  if (!list) return;
  const rows = Array.from(list.querySelectorAll<HTMLElement>('[data-person-row]'));
  const indexed = rows.map((row, index) => ({ row, index }));
  indexed.sort((a, b) => {
    if (mode === 'recent') {
      const av = a.row.dataset.last ?? '';
      const bv = b.row.dataset.last ?? '';
      if (av === bv) return a.index - b.index;
      if (!av) return 1;
      if (!bv) return -1;
      return bv.localeCompare(av);
    }
    return a.index - b.index;
  });
  for (const { row } of indexed) list.appendChild(row);

  for (const button of document.querySelectorAll<HTMLButtonElement>('[data-people-sort]')) {
    const on = button.dataset.peopleSort === mode;
    button.classList.toggle('on', on);
    button.setAttribute('aria-pressed', String(on));
  }

  if (updateUrl) {
    const url = new URL(window.location.href);
    if (mode === 'recent') url.searchParams.set('sort', 'recent');
    else url.searchParams.delete('sort');
    history.replaceState(null, '', url);
  }
}

if (!w.__stidePeopleSort) {
  w.__stidePeopleSort = true;

  document.addEventListener('click', (event) => {
    const button = (event.target as Element | null)?.closest<HTMLElement>('[data-people-sort]');
    if (!button) return;
    event.preventDefault();
    applySort(button.dataset.peopleSort === 'recent' ? 'recent' : 'all', true);
  });

  document.addEventListener('astro:page-load', () => {
    if (!document.querySelector('[data-people-list]')) return;
    const mode = new URLSearchParams(window.location.search).get('sort') === 'recent' ? 'recent' : 'all';
    applySort(mode);
  });

  if (document.querySelector('[data-people-list]')) {
    const mode = new URLSearchParams(window.location.search).get('sort') === 'recent' ? 'recent' : 'all';
    applySort(mode);
  }
}

export {};
