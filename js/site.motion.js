document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.hero');
  const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const headerPos = header ? getComputedStyle(header).position : 'static';
  const headerH = () => (header && (headerPos === 'fixed' || headerPos === 'absolute')) ? header.offsetHeight : 0;

  if (header && (headerPos === 'fixed' || headerPos === 'absolute')) {
    const onScrollHeader = () => {
      const y = window.scrollY;
      const opacity = clamp(1 - y / 240, 0.2, 1);
      header.style.background = `linear-gradient(to bottom, rgba(0,0,0,${0.45 * opacity}), rgba(0,0,0,0))`;
    };
    window.addEventListener('scroll', onScrollHeader, { passive: true });
    onScrollHeader();
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        io.unobserve(e.target);
      }
    });
  }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.pageYOffset - headerH();
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  let raf;
  if (hero && !prefersReduce) {
    const parallax = () => {
      hero.style.backgroundPosition = `center ${-window.scrollY * 0.06}px`;
      raf = requestAnimationFrame(parallax);
    };
    raf = requestAnimationFrame(parallax);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && raf) cancelAnimationFrame(raf);
      else if (!prefersReduce) raf = requestAnimationFrame(parallax);
    });
    window.addEventListener('beforeunload', () => raf && cancelAnimationFrame(raf));
  }
});