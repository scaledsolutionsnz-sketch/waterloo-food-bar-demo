// Waterloo Food Bar, shared interactions

// Intro overlay
window.addEventListener('load', () => {
  const intro = document.getElementById('intro');
  if (intro) setTimeout(() => intro.classList.add('hide'), 1100);
});

// Nav scroll state
const nav = document.querySelector('header.nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// Mobile nav toggle, animated X, backdrop, scroll lock, tap-outside/esc to close
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  const backdrop = document.createElement('div');
  backdrop.className = 'nav-backdrop';
  document.body.appendChild(backdrop);
  const setOpen = (open) => {
    links.classList.toggle('open', open);
    toggle.classList.toggle('open', open);
    backdrop.classList.toggle('show', open);
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  };
  toggle.addEventListener('click', () => setOpen(!links.classList.contains('open')));
  backdrop.addEventListener('click', () => setOpen(false));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  window.addEventListener('resize', () => { if (window.innerWidth > 880) setOpen(false); });
}

// Hero rolling slides
const slides = Array.from(document.querySelectorAll('.hero-slide'));
const dots = Array.from(document.querySelectorAll('.scroll-dots button'));
if (slides.length > 1) {
  let i = 0;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const show = n => {
    slides.forEach((s, k) => s.classList.toggle('active', k === n));
    dots.forEach((d, k) => d.classList.toggle('on', k === n));
    i = n;
  };
  show(0);
  if (!reduce) {
    let timer = setInterval(() => show((i + 1) % slides.length), 6000);
    dots.forEach((d, k) => d.addEventListener('click', () => {
      show(k); clearInterval(timer); timer = setInterval(() => show((i + 1) % slides.length), 6000);
    }));
  }
}

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Footer year
document.querySelectorAll('.js-year').forEach(el => el.textContent = new Date().getFullYear());

// Hero Google reviews rotator (real reviews)
(function () {
  var GR = [
    { q: '"Their roast meat rolls are nice and filling, a good meal to keep you going."', by: 'Andrew Cotter · Local Guide' },
    { q: '"Best stop for a bacon and egg pie hot off the grill. Most of the kai is handmade and this team can cook."', by: 'Viliami Moheloa · Local Guide' },
    { q: '"Amazing food, constant foot traffic until they close around 3pm. Baking and food made on site."', by: 'Elsa K · Local Guide' },
    { q: '"Loved the sausage rolls, nice and juicy! Rolls packed with meat, veg and sauce. Great lunch."', by: 'Bradlee Spanyol · Google' },
    { q: '"Best cheese rolls, lovely pies, homemade slice. Love this place."', by: 'Marie Wilson · Google' },
    { q: '"Lovely service and a great chicken and gravy roll. Recommend for a quick bite."', by: 'Nick Ward · Local Guide' }
  ];
  var q = document.getElementById('gwQuote'), b = document.getElementById('gwBy');
  if (!q || !b || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var i = 0;
  setInterval(function () {
    i = (i + 1) % GR.length;
    q.style.opacity = 0; b.style.opacity = 0;
    setTimeout(function () { q.textContent = GR[i].q; b.textContent = GR[i].by; q.style.opacity = 1; b.style.opacity = 1; }, 400);
  }, 4500);
})();
