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

// shared entry motion: reveal [data-rv] blocks as they come into view.
// The hidden state is set by CSS as soon as <html> gets .js-enter (inline,
// before first paint); this only lifts it.
(function () {
  const els = document.querySelectorAll('[data-rv]');
  if (!els.length) return;

  const show = el => {
    const wait = parseInt(el.getAttribute('data-rv-delay') || '0', 10);
    setTimeout(() => {
      el.classList.add('rv-in');
      setTimeout(() => el.classList.add('rv-done'), 700);
    }, wait);
  };

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('rv-in'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      show(en.target);
      io.unobserve(en.target);
    });
  // threshold 0 + a negative bottom margin: a block taller than the viewport
  // can never reach a ratio threshold, so trigger on entry instead
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0 });

  els.forEach(el => io.observe(el));
})();
