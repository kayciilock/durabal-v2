(() => {
  const retrofitBtn = document.getElementById('retrofit');
  const newProjBtn  = document.getElementById('newproject');
  const panel       = document.getElementById('submitdetails');
  const form        = document.getElementById('projectForm');
  const fieldset    = document.getElementById('typeFieldset');
  const radios      = form?.elements['projectType'];
  const currentType = document.getElementById('currentType');
  const hiddenType  = document.getElementById('lockedProjectType');

  if (!retrofitBtn || !newProjBtn || !panel || !form || !fieldset || !radios || !currentType || !hiddenType) return;

  function lockTo(type) {
    
    [...radios].forEach(r => r.checked = (r.value === type));
    
    currentType.textContent = type;
    hiddenType.value = type;
    
    fieldset.classList.add('locked');
  }
  function openPanel(type) {
    panel.hidden = false;
    requestAnimationFrame(() => {
      
      const nameInput = document.getElementById('name');
      if (nameInput) nameInput.focus({ preventScroll: true });
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    lockTo(type);
  }
  retrofitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openPanel('Retrofit');
  });
  newProjBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openPanel('New Project');
  });
  document.getElementById('submitStub')?.addEventListener('click', (e) => {
    e.preventDefault();
  });
})();
