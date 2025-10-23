document.addEventListener('DOMContentLoaded', () => {
  const resolve = (p) => new URL(p, document.baseURI).href;

  const hydrate = (selector, attr = 'data-media', cssVar = '--media') => {
    document.querySelectorAll(`${selector}[${attr}]`).forEach(el => {
      const raw = (el.getAttribute(attr) || '').trim();
      if (!raw) return;
      const url = resolve(raw);
      const img = new Image();
      img.onload = () => el.style.setProperty(cssVar, `url("${url}")`);
      img.onerror = () => console.warn('media 404:', url, el);
      img.src = url;
    });
  };

  hydrate('.card-media');
  hydrate('.media');
});
