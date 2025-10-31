(() => {
  const trigger = document.querySelector('.nav-item.has-dropdown');
  const panel   = document.querySelector('.dropdown-panel');
  if (!trigger || !panel) return;

  let hideTimer = null;

  const open = () => {
    clearTimeout(hideTimer);
    panel.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
  };

  const scheduleClose = () => {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      if (!trigger.matches(':hover') && !panel.matches(':hover')) {
        panel.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    }, 180);
  };

  trigger.addEventListener('mouseenter', open);
  trigger.addEventListener('mouseleave', scheduleClose);
  panel.addEventListener('mouseenter', open);
  panel.addEventListener('mouseleave', scheduleClose);

  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    panel.classList.toggle('is-open');
    trigger.setAttribute('aria-expanded', panel.classList.contains('is-open') ? 'true' : 'false');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      panel.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && !trigger.contains(e.target)) {
      panel.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });

  trigger.setAttribute('aria-haspopup', 'true');
  trigger.setAttribute('aria-expanded', 'false');
})();
