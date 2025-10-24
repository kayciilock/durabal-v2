document.addEventListener('DOMContentLoaded', () => {
  const colors = ['#3B3B3B','#A5883A','#474644','#9DA2A6','#92979D','#CCBAA4'];

  document.querySelectorAll('.swatch').forEach((el, i) => {
    const hex = colors[i % colors.length];
    el.style.setProperty('--tone', hex);

    const name = el.dataset.name || '';
    const sub  = el.dataset.sub  || '';
    const type = el.dataset.type || '';
    const code = el.dataset.hex || hex;

    const label = document.createElement('div');
    label.className = 'label';
    label.innerHTML = `
      <div class="name">${name}</div>
      <div class="meta"><span>${sub}</span><span>•</span><span>${type}</span><span class="code">${code}</span></div>
    `;
    el.appendChild(label);
  });
});
