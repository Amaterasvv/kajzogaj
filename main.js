function toggleMenu() {
  document.querySelector('.nav-left').classList.toggle('active');
  document.querySelector('.nav-right').classList.toggle('active');
  document.querySelector('.menu-toggle').classList.toggle('open');
}


const sadrzaji = {
  kruh: {
    html: `
      <div class="kategorije-kartica">
        <img src="pics/rye-sliced-bread-table.jpg" alt="Kruh">
        <div class="kategorije-opis">
          <h2>Domaći Kruh</h2>
          <p>Ručno rađen, pečen na kamenoj ploči – naš kruh odiše tradicijom i savršen je dodatak svakom obroku.</p>
        </div>
      </div>
    `,
    background: 'url(pics/bg-kru.jpg)'
  },

  peciva: {
    html: `
      <div class="kategorije-kartica">
        <img src="pics/peciva.jpg" alt="Peciva">
        <div class="kategorije-opis">
          <h2>Svježa Peciva</h2>
          <p>Topla i mirisna peciva, savršena uz kavu ili čaj. Idealna za doručak ili brzu užinu kroz dan.</p>
        </div>
      </div>
    `,
    background: 'url(pics/bg-peciva.jpg)'
  },

  burek: {
    html: `
      <div class="kategorije-kartica">
        <img src="pics/burek.jpeg" alt="Burek">
        <div class="kategorije-opis">
          <h2>Burek</h2>
          <p>Sočan, svježe pečen burek s mesom, sirom ili povrćem. Tradicionalni okus Balkana u modernoj izvedbi.</p>
        </div>
      </div>
    `,
    background: 'url(pics/bg-burek.jpg)'
  },

  sendvici: {
    html: `
      <div class="kategorije-kartica">
        <img src="pics/sendvic.jpg" alt="Sendviči">
        <div class="kategorije-opis">
          <h2>Sendviči</h2>
          <p>Bogati, svježe pripremljeni sendviči – savršen spoj domaćeg kruha, kvalitetnih namaza i punjenja.</p>
        </div>
      </div>
    `,
    background: 'url(pics/bg-sendvici.jpg)'
  },

  slatko: {
    html: `
      <div class="kategorije-kartica">
        <img src="pics/slatko.jpg" alt="Slatko">
        <div class="kategorije-opis">
          <h2>Slatki Program</h2>
          <p>Od kremastih kolača do laganih pita – svaki desert izrađen s ljubavlju, idealan za trenutke uživanja.</p>
        </div>
      </div>
    `,
    background: 'url(pics/bg-slatko.jpg)'
  },

  kebab: {
    html: `
      <div class="kategorije-kartica">
        <img src="pics/kebab.jpg" alt="Kebab">
        <div class="kategorije-opis">
          <h2>Kebab</h2>
          <p>Sočno meso, svježe povrće i domaća lepinja – naš kebab je brz, ukusan i uvijek svježe pripremljen.</p>
        </div>
      </div>
    `,
    background: 'url(pics/bg-kebab.jpg)'
  }
};

function prikaziKategoriju(ime) {
  const podatak = sadrzaji[ime];
  const sadrzaj = document.getElementById("kategorija");
  const sekcija = document.querySelector(".kategorije");

  // Promijeni HTML sadržaj
  sadrzaj.classList.remove("show");
  setTimeout(() => {
    sadrzaj.innerHTML = podatak.html;
    sadrzaj.classList.add("show");
  }, 150);

  // Promijeni pozadinu sekcije
  sekcija.style.backgroundImage = podatak.background;

  // Pomicanje markera
  const dugmad = document.querySelectorAll(".kategorije-lista button");
  const marker = document.getElementById("marker");
 dugmad.forEach((btn) => {
  btn.classList.remove("active");
});

const aktivnoDugme = document.querySelector(`.kategorije-lista button[onclick*="${ime}"]`);
if (aktivnoDugme) {
  aktivnoDugme.classList.add("active");
  marker.style.top = aktivnoDugme.offsetTop + "px";
}
}

// Inicijalno prikazati "kruh"
window.addEventListener("DOMContentLoaded", () => {
  prikaziKategoriju("kruh");
});

// Fade-in za cijelu sekciju
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.animate-fade-in').forEach(el => observer.observe(el));

function otvoriLightbox(src) {
  document.getElementById("lightbox-img").src = src;
  document.getElementById("lightbox").classList.add("show");
}

function zatvoriLightbox() {
  document.getElementById("lightbox").classList.remove("show");
}

let trenutačna = 0;
const slike = document.querySelectorAll("#galerija-slider .galerija-item");
const galerija = document.querySelector("#galerija-slider");

function rotirajGaleriju() {
  slike.forEach(el => el.classList.remove("active"));
  slike[trenutačna].classList.add("active");
  trenutačna = (trenutačna + 1) % slike.length;
}

if (slike.length > 0) {
  galerija.style.position = "relative";
  rotirajGaleriju(); // Prikaži prvu sliku
  setInterval(rotirajGaleriju, 4000); // Rotiraj slike
}
