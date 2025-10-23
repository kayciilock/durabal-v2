document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('.hero--automation');
  if (!root) return;

  const wrap = root.querySelector('.hero-slides');
  const slides = Array.from(root.querySelectorAll('.hero-slide'));
  const dotsWrap = root.querySelector('.hero-dots');

  const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const autoplay = wrap.dataset.autoplay === 'true';
  const interval = parseInt(wrap.dataset.interval || '10000', 10);

  slides.forEach(s => {
    const src = (s.dataset.hero || '').trim();
    if (src) s.style.setProperty('--hero-image', `url("${new URL(src, document.baseURI).href}")`);
  });

  const preload = (el) => new Promise(res => {
    const src = el.dataset.hero;
    if (!src) return res();
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => res();
    img.onerror = () => res();
    img.src = new URL(src, document.baseURI).href;
  });

  let index = 0;
  let timer = null;
  let raf = null;

  dotsWrap.innerHTML = slides.map((_, i) => `<button aria-label="Go to slide ${i+1}"></button>`).join('');
  const dots = Array.from(dotsWrap.querySelectorAll('button'));

  const markDots = (i) => {
    dots.forEach((d, k) => {
      d.classList.toggle('is-active', k === i);
      d.setAttribute('aria-current', k === i ? 'true' : 'false');
    });
  };

  const clearTimer = () => { if (timer) { clearTimeout(timer); timer = null; } };
  const schedule = () => { clearTimer(); if (autoplay) timer = setTimeout(() => goTo((index + 1) % slides.length), interval); };

  const goTo = (i) => {
    if (i === index) { schedule(); return; }
    const cur = slides[index];
    const next = slides[i];

    cur.classList.remove('is-active');
    cur.classList.add('is-out');
    next.classList.add('is-active');

    const onEnd = () => { cur.classList.remove('is-out'); cur.removeEventListener('transitionend', onEnd); };
    cur.addEventListener('transitionend', onEnd, { once: true });

    index = i;
    markDots(index);
    schedule();
  };

  dots.forEach((d, i) => d.addEventListener('click', () => { goTo(i); }));

  const parallax = () => {
    const y = -window.scrollY * 0.04;
    slides.forEach(s => s.style.setProperty('--hero-parallax', `${y}px`));
    raf = requestAnimationFrame(parallax);
  };

  Promise.allSettled(slides.map(preload)).then(() => {
    slides[0].classList.add('is-active');
    markDots(0);
    schedule();
    if (!prefersReduce) raf = requestAnimationFrame(parallax);
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { clearTimer(); if (raf) cancelAnimationFrame(raf); }
    else { schedule(); if (!prefersReduce) raf = requestAnimationFrame(parallax); }
  });

  window.addEventListener('beforeunload', () => { clearTimer(); if (raf) cancelAnimationFrame(raf); });
});
