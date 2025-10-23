document.addEventListener('DOMContentLoaded', () => {
  const sel = '.card-media[data-media], .feature-media[data-media], .bento .media[data-media], .module .media[data-media]';
  const els = Array.from(document.querySelectorAll(sel));
  if (!els.length) return;

  const inView = (el) => {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || 0, vw = window.innerWidth || 0;
    return r.top < vh * 1.25 && r.left < vw && r.bottom > -vh * 0.25 && r.right > 0;
  };

  const pickSrc = (el) => {
    const dpr = Math.min(Math.max(window.devicePixelRatio || 1, 1), 3);
    const hi = el.dataset.mediaHd || el.dataset.media2x;
    const base = (el.dataset.media || '').trim();
    if (!base) return '';
    return dpr >= 1.5 && hi ? hi : base;
  };

  const preloadLink = (href) => {
    if (!href) return;
    if (document.querySelector(`link[rel="preload"][as="image"][href="${href}"]`)) return;
    const l = document.createElement('link');
    l.rel = 'preload';
    l.as = 'image';
    l.href = href;
    document.head.appendChild(l);
  };

  const eagerLoad = (el) => {
    const raw = pickSrc(el);
    if (!raw) return;
    const url = new URL(raw, document.baseURI).href;

    el.style.setProperty('--media', `url("${url}")`);

    const img = new Image();
    img.decoding = 'async';
    img.fetchPriority = 'high';
    img.onload = () => el.classList.add('is-loaded');
    img.onerror = () => console.warn('media not found:', url);
    img.src = url;

    preloadLink(url);
  };

  const lazyLoad = (el) => {
    const raw = pickSrc(el);
    if (!raw) return;
    const url = new URL(raw, document.baseURI).href;

    const img = new Image();
    img.decoding = 'async';
    img.fetchPriority = 'low';
    img.onload = () => {
      el.style.setProperty('--media', `url("${url}")`);
      el.classList.add('is-loaded');
    };
    img.onerror = () => console.warn('media not found:', url);
    img.src = url;
  };

  const io = ('IntersectionObserver' in window)
    ? new IntersectionObserver((entries) => {
        entries.forEach(({ isIntersecting, target }) => {
          if (!target.dataset.mediaLoaded && isIntersecting) {
            target.dataset.mediaLoaded = '1';
            eagerLoad(target);
            io.unobserve(target);
          }
        });
      }, { root: null, rootMargin: '200px 0px', threshold: 0.01 })
    : null;

  els.forEach((el) => {
    const priority = (el.dataset.priority || '').toLowerCase(); // "high" to force eager
    if (priority === 'high' || inView(el) || !io) {
      eagerLoad(el);
    } else {
      io.observe(el);
      lazyLoad(el);
    }
  });
});