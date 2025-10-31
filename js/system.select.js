(() => {
  const by = s => document.querySelector(s);
  const all = s => Array.from(document.querySelectorAll(s));

  const updateChip = (group, labelText) => {
    const chip = by(`[data-selection-for="${group}"]`);
    if (!chip) return;
    chip.textContent = labelText || 'None';
    chip.classList.toggle('filled', !!labelText);
  };

  const selectCard = (card) => {
    const group = card.dataset.group;
    if (!group) return;
    all(`.selectable[data-group="${group}"]`).forEach(el => el.classList.remove('is-selected'));
    const wasSelected = card.classList.contains('is-selected');
    if (wasSelected) {
      card.classList.remove('is-selected');
      updateChip(group, null);
    } else {
      card.classList.add('is-selected');
      const title = card.querySelector('h3')?.textContent?.trim() || card.id || 'Selected';
      updateChip(group, title);
    }
  };

  all('.selectable').forEach(card => {
    card.addEventListener('click', () => selectCard(card));
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectCard(card); }
    });
  });
})();
