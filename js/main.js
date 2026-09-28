const topbar = document.querySelector('.topbar');
const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
let lastScrollY = scrollY;

addEventListener('scroll', () => {
  const currentScrollY = scrollY;
  const scrollingDown = currentScrollY > lastScrollY && currentScrollY > 120;

  topbar.classList.toggle('scrolled', currentScrollY > 12);
  topbar.classList.toggle('nav-hidden', scrollingDown && !mobileNav.classList.contains('open'));
  lastScrollY = Math.max(currentScrollY, 0);
}, { passive: true });
menuButton.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open);
  topbar.classList.remove('nav-hidden');
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

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
