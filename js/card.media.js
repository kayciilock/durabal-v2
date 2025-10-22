document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.card-media[data-media]').forEach((el, i) => {
    const raw = (el.dataset.media || '').trim();
    if (!raw) return;

    const url = new URL(raw, document.baseURI).href;

    const img = new Image();
    img.onload = () => {
      el.style.setProperty('--media', `url("${url}")`);
    };
    img.onerror = () => console.warn('card-media 404:', url, el);
    img.src = url;
  });
});
