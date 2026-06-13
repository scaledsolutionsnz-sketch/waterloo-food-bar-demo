// Waterloo Food Bar — shared interactions

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

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
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
