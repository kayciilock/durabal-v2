document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.card-media[data-media]').forEach(el => {
    const src = (el.dataset.media || '').trim();
    if (!src) return;
    const img = new Image();
    img.onload = () => el.style.setProperty('--media', `url("${src}")`);
    img.onerror = () => console.warn('card-media: not found ->', src);
    img.src = src;
  });
});
