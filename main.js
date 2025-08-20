  // Oznaci da je JS aktivan (za CSS .js selektore)
  document.documentElement.classList.add('js');

  const nav    = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  const menu   = document.getElementById('nav-menu');

  const closeMenu = () => {
    if (nav.classList.contains('nav--open')) {
      nav.classList.remove('nav--open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  };

  // Toggle otvaranje/zatvaranje
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = nav.classList.toggle('nav--open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Zatvori na klik linka
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => closeMenu());
  });

  // Zatvori na klik izvan menija
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) closeMenu();
  });

  // ESC za zatvaranje
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // (Opcionalno) reset kad odeš na desktop
  const mq = window.matchMedia('(min-width: 769px)');
  mq.addEventListener('change', (ev) => { if (ev.matches) closeMenu(); });





  

  // Hero ready – pokreni samo ako postoji
  (function(){
    const hero = document.querySelector('.hero');
    if (hero) setTimeout(() => hero.classList.add('is-ready'), 120);
  })();

  // (Opcionalno) Reveal za kartice ponude – pokreni samo ako postoje
  (function(){
    const offerCards = document.querySelectorAll('.offer-card');
    if (offerCards.length) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(en => {
          if (en.isIntersecting) {
            en.target.style.willChange = 'transform, opacity';
            en.target.classList.remove('is-hidden-initial');
            io.unobserve(en.target);
          }
        });
      }, { threshold: 0.15 });

      offerCards.forEach(c => {
        c.classList.add('is-hidden-initial');
        io.observe(c);
      });
    }
  })();

  // Timeline reveal – ovo ti je bitno
  (function(){
    const items = document.querySelectorAll('#o-nama .reveal');
    if (!items.length) return;
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if(en.isIntersecting){
          en.target.classList.add('is-visible');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach(el=>io.observe(el));
  })();


    (function(){
    const root = document.querySelector('#o-nama.about-dark.decor');
    if(!root) return;
    const left = root.querySelector(':scope::before'); // pseudo se ne hvata JS-om
    // zato radimo suptilan parallax na cijelim dekor blokovima preko CSS varijabli:
    root.style.setProperty('--pxL', '0px');
    root.style.setProperty('--pxR', '0px');
    // koristimo translate na ::before/::after kroz filter drop-shadow? — lakše: na glow
    const glow = root.querySelector('.bg-glow');
    let ticking=false;
    window.addEventListener('scroll', ()=>{
      if(ticking) return; ticking=true;
      requestAnimationFrame(()=>{
        const y = window.scrollY || 0;
        // pomakni glow elemente
        glow.style.transform = `translateY(${y*0.05}px)`;
        ticking=false;
      });
    }, {passive:true});
  })();


 (function(){
      const buttons = document.querySelectorAll('.offer-section .filter-btn');
    const cards = document.querySelectorAll('.offer-section .offer-card');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;

        cards.forEach(card => {
          const cat = card.getAttribute('data-cat');
          const show = (f === 'all') || (cat === f);
          card.style.display = show ? '' : 'none';
        });
      });
    });
  })();



  (function(){
  const el = document.getElementById('bakeCountdown');
  if(!el) return;

  // Termin ture pečenja (24h format) – prilagodi
  const bakeSlots = ["06:30","11:00","15:00","18:00"];

  function nextSlot(){
    const now = new Date();
    const today = now.toISOString().slice(0,10);
    for(const t of bakeSlots){
      const dt = new Date(`${today}T${t}:00`);
      if(dt > now) return dt;
    }
    // ako su svi prošli, uzmi prvi sutra
    const first = new Date(`${today}T${bakeSlots[0]}:00`);
    first.setDate(first.getDate() + 1);
    return first;
  }

  function tick(){
    const target = nextSlot();
    const now = new Date();
    let diff = Math.max(0, target - now);
    const h = Math.floor(diff / (1000*60*60));
    diff -= h * 3600000;
    const m = Math.floor(diff / (1000*60));
    diff -= m * 60000;
    const s = Math.floor(diff / 1000);
    el.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }
  tick();
  setInterval(tick, 1000);
})();



(function(){
  const imgs = Array.from(document.querySelectorAll('.process-sticky .ps-img'));
  if (imgs.length < 2) return;

  let i = 0, timer = null;
  const delay = 3500; // ms između slika (promijeni po želji)

  function show(n){
    imgs.forEach((im, idx) => im.classList.toggle('active', idx === n));
  }

  function start(){
    if (timer) return;
    timer = setInterval(() => {
      i = (i + 1) % imgs.length;
      show(i);
    }, delay);
  }

  function stop(){
    clearInterval(timer);
    timer = null;
  }

  // pokreni samo kad je sekcija na ekranu (štedi CPU)
  const section = document.querySelector('.process-section');
  if (section && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => e.isIntersecting ? start() : stop());
    }, { threshold: 0.25 });
    obs.observe(section);
  } else {
    start();
  }

  // pauza na hover preko sticky okvira
  const sticky = document.querySelector('.process-sticky');
  if (sticky) {
    sticky.addEventListener('mouseenter', stop);
    sticky.addEventListener('mouseleave', start);
  }

  // prva slika vidljiva
  show(0);
  })();

  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();