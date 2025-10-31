  (function(){
    const pills = Array.from(document.querySelectorAll('.motion-nav .pill'));
    const sections = pills.map(p => document.querySelector(p.getAttribute('href'))).filter(Boolean);

    
    document.querySelectorAll('.motion-media[data-media]').forEach(el=>{
      const url = el.getAttribute('data-media');
      if (url) el.style.setProperty('--media', `url("${url}")`);
    });

    
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const id = '#' + entry.target.id;
          pills.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === id));
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

    sections.forEach(sec => io.observe(sec));

    
    pills.forEach(a=>{
      a.addEventListener('click', ()=>{
        pills.forEach(p=>p.classList.remove('is-active'));
        a.classList.add('is-active');
      });
    });
  })();