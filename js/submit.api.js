document.addEventListener('DOMContentLoaded', () => {

  const typeOfQuery = sessionStorage.getItem('typeOfQuery');
  if (typeOfQuery) {
    const roleSel = document.getElementById('role');
    if (roleSel) roleSel.value = typeOfQuery;
    sessionStorage.removeItem('typeOfQuery');
  }

  const form = document.querySelector('.contact-form');
  if (!form) return;

  const successEl = form.querySelector('.success-message');
  const errorEl   = form.querySelector('.error-message');
  const submitBtn = form.querySelector('.btn-submit');

  const show = (el) => { if (el) el.style.display = 'block'; };
  const hide = (el) => { if (el) el.style.display = 'none'; };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    hide(successEl);
    hide(errorEl);

    const fd = new FormData(form);
    const payload = {};
    fd.forEach((v, k) => { payload[k] = v; });

    payload.formType   = 'generalContact';
    payload.page       = location.pathname;
    payload.timestamp  = new Date().toISOString();

    const json = JSON.stringify(payload);

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.dataset.label = submitBtn.textContent;
      submitBtn.textContent = 'Sending…';
    }

    try {
      const res = await fetch('https://rrj6fb2ec4.execute-api.ap-southeast-2.amazonaws.com/prod/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: json
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      show(successEl);
      hide(errorEl);
      form.reset();

      setTimeout(() => hide(successEl), 5000);
    } catch (err) {
      console.error('Submit error:', err);
      hide(successEl);
      show(errorEl);
      setTimeout(() => hide(errorEl), 5000);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = submitBtn.dataset.label || 'Send enquiry';
      }
    }
  });
});
