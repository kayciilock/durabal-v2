(function(){
  const overlay = document.getElementById('lightbox');
  const img = document.getElementById('lb-img');
  const tag = document.getElementById('lb-tag');
  const closeBtn = overlay.querySelector('.lb-close');

  function extractBgURL(el){
    const cs = getComputedStyle(el);
    const bg = cs.backgroundImage || '';
    const m = bg.match(/url\(["']?(.*?)["']?\)/i);
    return m ? m[1] : '';
  }

  function openLightbox(src, label){
    img.src = '';
    img.src = src;
    img.alt = label || '';
    tag.textContent = label || '';
    overlay.classList.add('is-open');
    document.documentElement.classList.add('no-scroll');
    document.body.classList.add('no-scroll');
    closeBtn.focus({preventScroll:true});
  }

  function closeLightbox(){
    overlay.classList.remove('is-open');
    document.documentElement.classList.remove('no-scroll');
    document.body.classList.remove('no-scroll');
    img.src = '';
  }

  document.addEventListener('click', (e)=>{
    const item = e.target.closest('.bento-item');
    if(!item) return;
    const media = item.querySelector('.media');
    if(!media) return;
    const src = media.dataset.full || media.dataset.media || extractBgURL(media);
    const label = (item.querySelector('.tag')?.textContent || '').trim();
    if(src) openLightbox(src, label);
  });

  overlay.addEventListener('click', (e)=>{
    if(e.target === overlay) closeLightbox();
  });
  closeBtn.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && overlay.classList.contains('is-open')) closeLightbox();
  });
})();