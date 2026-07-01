// =============================================
//  Visyn Studio — shared site script (multi-page)
//  Powers Home, Services, About, Contact.
//  (The archived original home uses pricing.js instead.)
// =============================================

// ── Swappable URL constants ─────────────────────────────
// Single source of truth for the booking flow. Swap to TidyCal/Cal.com here.
const BOOKING_URL = "https://cal.com/visyn-studio/free-shoot"; // TODO: replace with real booking link

// Per-service "Learn more" destinations. Each defaults to the contact flow and
// gets flipped to its real subpage URL the moment that subpage ships.
// Product Shoots can point at its subpage as soon as it's live.
const SERVICE_URLS = {
  "product-shoots":    "/contact", // TODO: → "/services/product-shoots" when live
  "web-design":        "/contact", // TODO: → "/services/web-design" when live
  "paid-ads":          "/contact", // TODO: → "/services/paid-ads" when live
  "social-media":      "/contact", // TODO: → "/services/social-media" when live
  "email-marketing":   "/contact", // TODO: → "/services/email-marketing" when live
  "creative-campaigns":"/contact", // TODO: → "/services/creative-campaigns" when live
};

// ── Dark mode ───────────────────────────────────────────
(function () {
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('visyn-theme') || 'light';
  html.setAttribute('data-theme', savedTheme);

  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('visyn-theme', next);
    });
  }
})();

// ── Sticky nav shadow ───────────────────────────────────
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
})();

// ── Hamburger menu ──────────────────────────────────────
(function () {
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;
  hamburger.addEventListener('click', function () {
    const open = navLinks.classList.toggle('is-open');
    hamburger.setAttribute('aria-expanded', String(open));
  });
  // Close the menu when a real (non-dropdown-parent) link is tapped.
  navLinks.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      navLinks.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
})();

// ── Mobile sticky CTA bar ───────────────────────────────
(function () {
  const bar = document.getElementById('mobile-cta-bar');
  const hero = document.getElementById('top');
  const book = document.getElementById('book');
  if (!bar || !hero || !book) return;
  function checkBar() {
    const heroBottom = hero.getBoundingClientRect().bottom;
    const bookTop = book.getBoundingClientRect().top;
    if (heroBottom < 0 && bookTop > window.innerHeight) {
      bar.classList.remove('hidden');
    } else {
      bar.classList.add('hidden');
    }
  }
  window.addEventListener('scroll', checkBar, { passive: true });
  checkBar();
})();

// ── Wire booking + per-service links ────────────────────
document.querySelectorAll('[data-book]').forEach(function (el) {
  el.setAttribute('href', BOOKING_URL);
});
document.querySelectorAll('[data-service]').forEach(function (el) {
  const key = el.getAttribute('data-service');
  if (SERVICE_URLS[key]) el.setAttribute('href', SERVICE_URLS[key]);
});
