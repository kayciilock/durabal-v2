document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const headerH = () => {
    if (!header) return 0;
    const pos = getComputedStyle(header).position;
    return (pos === 'fixed' || pos === 'absolute') ? header.offsetHeight : 0;
    };

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        obs.unobserve(e.target);
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

  document.querySelectorAll('.hero[data-hero]').forEach(el => {
    const raw = (el.dataset.hero || '').trim();
    if (!raw) return;
    const url = new URL(raw, document.baseURI).href;
    el.style.setProperty('--hero-image', `url("${url}")`);
  });

  const hero = document.querySelector('.hero');
  let raf;
  const startParallax = () => {
    if (!hero || prefersReduce) return;
    const tick = () => {
      hero.style.backgroundPosition = `center ${-window.scrollY * 0.06}px`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
  };
  const stopParallax = () => { if (raf) cancelAnimationFrame(raf); };

  startParallax();
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopParallax(); else startParallax();
  });
  window.addEventListener('beforeunload', stopParallax);
});
