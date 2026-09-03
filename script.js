// shared across all pages: hamburger nav + active-link highlight
(function () {
  const navOverlay = document.getElementById('navOverlay');
  const menuBtn = document.getElementById('menuBtn');
  const navClose = document.getElementById('navClose');

  function openNav() { navOverlay.classList.add('active'); }
  function closeNav() { navOverlay.classList.remove('active'); }

  if (menuBtn) menuBtn.addEventListener('click', openNav);
  if (navClose) navClose.addEventListener('click', closeNav);
  if (navOverlay) {
    navOverlay.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeNav);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeNav();
      const lightbox = document.getElementById('lightbox');
      if (lightbox) lightbox.classList.remove('active');
    }
  });

  // highlight the current page in the nav overlay + footer nav
  const current = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-overlay a, .footer-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('current');
    }
  });
})();
