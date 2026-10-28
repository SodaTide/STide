/**
 * 文章页增强（外部模块脚本）：阅读进度、目录高亮、giscus 懒加载。
 * 不依赖框架；ClientRouter 切换页面时用 window 上的 cleanup 收尾。
 */
declare global {
  interface Window {
    __stidePostCleanup?: (() => void) | null;
  }
}

const w = window as Window;
w.__stidePostCleanup?.();

const cleanups: (() => void)[] = [];

function initProgress() {
  const bar = document.querySelector<HTMLElement>('[data-progress-bar]');
  if (!bar) return;
  let raf = 0;
  const update = () => {
    raf = 0;
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const ratio = max <= 0 ? 0 : Math.min(1, Math.max(0, window.scrollY / max));
    bar.style.transform = `scaleX(${ratio})`;
    bar.style.opacity = String(ratio > 0.002 ? 1 : 0);
  };
  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(update);
  };
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  cleanups.push(() => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    if (raf) cancelAnimationFrame(raf);
  });
}

function initToc() {
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-toc] a'));
  if (!links.length) return;
  const targets = links
    .map((link) => {
      const id = decodeURIComponent(link.hash.slice(1));
      const heading = document.getElementById(id);
      return heading ? { link, heading } : null;
    })
    .filter((item): item is { link: HTMLAnchorElement; heading: HTMLElement } => Boolean(item));

  let raf = 0;
  const update = () => {
    raf = 0;
    let active = targets[0];
    for (const item of targets) {
      if (item.heading.getBoundingClientRect().top <= 120) active = item;
      else break;
    }
    for (const item of targets) item.link.classList.toggle('on', item === active);
  };
  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(update);
  };
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  cleanups.push(() => {
    window.removeEventListener('scroll', onScroll);
    if (raf) cancelAnimationFrame(raf);
  });
}

function currentTheme(): 'light' | 'dark' {
  const mode = document.documentElement.getAttribute('data-mc-color-mode');
  return mode === 'dark' ? 'dark' : 'light';
}

function initGiscus() {
  const section = document.querySelector<HTMLElement>('[data-giscus]');
  const target = section?.querySelector<HTMLElement>('[data-giscus-target]');
  if (!section || !target) return;

  const dataset = section.dataset;
  let iframe: HTMLIFrameElement | null = null;

  const build = () => {
    const params = new URLSearchParams({
      origin: window.location.origin,
      repo: dataset.giscusRepo ?? '',
      repoId: dataset.giscusRepoId ?? '',
      category: dataset.giscusCategory ?? '',
      categoryId: dataset.giscusCategoryId ?? '',
      mapping: dataset.giscusMapping ?? 'pathname',
      strict: '0',
      reactionsEnabled: '1',
      emitMetadata: '0',
      inputPosition: 'top',
      theme: currentTheme(),
      lang: dataset.giscusLang ?? 'zh-CN',
    });
    return `https://giscus.app/widget?${params.toString()}`;
  };

  const mount = () => {
    iframe = document.createElement('iframe');
    iframe.src = build();
    iframe.title = 'Comments';
    iframe.loading = 'lazy';
    iframe.setAttribute('scrolling', 'no');
    target.appendChild(iframe);
    observer.disconnect();
  };

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) mount();
    },
    { rootMargin: '400px 0px' },
  );
  observer.observe(section);

  const modeObserver = new MutationObserver(() => {
    if (iframe) iframe.src = build();
  });
  modeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-mc-color-mode'] });

  cleanups.push(() => {
    observer.disconnect();
    modeObserver.disconnect();
    iframe?.remove();
    iframe = null;
  });
}

initProgress();
initToc();
initGiscus();

w.__stidePostCleanup = () => {
  while (cleanups.length) cleanups.pop()?.();
  w.__stidePostCleanup = null;
};
