const topbar = document.querySelector('.topbar');
let lastScrollY = scrollY;

const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const closeMobileNav = () => {
  if (!menuToggle || !mobileNav) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');
  mobileNav.classList.remove('open');
};
menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  menuToggle.setAttribute('aria-label', open ? 'Abrir menu' : 'Fechar menu');
  mobileNav?.classList.toggle('open', !open);
});
mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMobileNav));
document.addEventListener('click', event => {
  if (mobileNav?.classList.contains('open') && !mobileNav.contains(event.target) && !menuToggle?.contains(event.target)) closeMobileNav();
});
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMobileNav(); });

addEventListener('scroll', () => {
  const currentScrollY = scrollY;
  const scrollingDown = currentScrollY > lastScrollY && currentScrollY > 120;

  topbar.classList.toggle('scrolled', currentScrollY > 12);
  topbar.classList.toggle('nav-hidden', scrollingDown);
  lastScrollY = Math.max(currentScrollY, 0);
}, { passive: true });

const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('in'); revealObserver.unobserve(entry.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(item => revealObserver.observe(item));

const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project-card');
const empty = document.querySelector('.filter-empty');
filters.forEach(filter => filter.addEventListener('click', () => {
  const selected = filter.dataset.filter;
  let visible = 0;
  filters.forEach(item => item.classList.toggle('is-active', item === filter));
  projects.forEach(project => {
    const matches = selected === 'all' || project.dataset.category.split(' ').includes(selected);
    project.hidden = !matches;
    if (matches) visible++;
  });
  empty.hidden = visible !== 0;
}));

const routeTitles = {
  '/': 'Velto Studio — Criação de sites profissionais e portfólios digitais',
  '/projetos': 'Projetos — Velto Studio',
  '/processo': 'Processo — Velto Studio',
  '/faq': 'FAQ — Velto Studio',
  '/contato': 'Contato — Velto Studio'
};
const updateRoute = () => {
  const route = (location.hash.replace(/^#/, '') || '/').split('/').slice(0, 2).join('/') || '/';
  document.title = routeTitles[route] || routeTitles['/'];
  if (route !== '/' && document.getElementById(route.slice(1))) document.getElementById(route.slice(1)).scrollIntoView({ behavior: 'smooth' });
};
addEventListener('hashchange', updateRoute);
updateRoute();
