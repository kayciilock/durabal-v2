document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('.wd-systems');
  if (!root) return;

  const carousel = root.querySelector('.systems-carousel');
  const track = root.querySelector('.systems-track');
  const cards = Array.from(root.querySelectorAll('.system-card'));
  const prev = root.querySelector('.wd-prev');
  const next = root.querySelector('.wd-next');

  cards.forEach(c => {
    const src = (c.dataset.media || '').trim();
    if (src) c.style.setProperty('--media', `url("${new URL(src, document.baseURI).href}")`);
  });

  let index = 0;
  const autoplay = carousel.dataset.autoplay === 'true';
  const interval = parseInt(carousel.dataset.interval || '7000', 10);
  let timer = null;

  const show = i => {
    cards.forEach((c, k) => c.classList.toggle('is-active', k === i));
  };

  const goto = i => {
    index = (i + cards.length) % cards.length;
    show(index);
    if (autoplay) { clearTimeout(timer); timer = setTimeout(() => goto(index + 1), interval); }
  };

  prev.addEventListener('click', () => goto(index - 1));
  next.addEventListener('click', () => goto(index + 1));

  show(0);
  if (autoplay) timer = setTimeout(() => goto(1), interval);
});
