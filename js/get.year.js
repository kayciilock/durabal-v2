(function () {
  var el = document.getElementById('copyright');
  if (!el) return;
  var y = new Date().getFullYear();
  el.textContent = y + ' © Durabal Design Studio';
})();