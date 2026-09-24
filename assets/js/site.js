// =============================================================
//  Visyn Studio — shared site script
//  Powers Home, About, Services, Contact, 404.
// =============================================================

// ── Swappable config ────────────────────────────────────────
// Single source of truth for the booking flow. Every "Book a Growth
// Call" and "Claim a Founding Spot" button on every page resolves to
// this one value via the [data-book] attribute.
const BOOKING_URL = "https://calendar.app.google/4ZqwkECFsBakrisj9";

// Boxed Joy Co. stat cards. Held false while Ian settles the final stat
// set — the cards in #results still carry the brief's placeholder values
// (15 lives in July / $458 average per live), and these are Kelly's
// revenue figures on a public page. Flip to true once the set is final.
const SHOW_BOXED_JOY_STATS = false;

// ── Sticky nav shadow ───────────────────────────────────────
(function () {
  const nav = document.getElementById("nav");
  if (!nav) return;
  const onScroll = function () {
    nav.classList.toggle("scrolled", window.scrollY > 20);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

// ── Hamburger menu ──────────────────────────────────────────
(function () {
  const hamburger = document.getElementById("nav-hamburger");
  const navLinks = document.getElementById("nav-links");
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener("click", function () {
    const open = navLinks.classList.toggle("is-open");
    hamburger.setAttribute("aria-expanded", String(open));
    hamburger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  navLinks.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      navLinks.classList.remove("is-open");
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.setAttribute("aria-label", "Open menu");
    });
  });
})();

// ── Mobile sticky CTA bar ───────────────────────────────────
// Shows once the hero has scrolled out of view, and hides again while
// the closing CTA section is on screen so the two never compete.
(function () {
  const bar = document.getElementById("mobile-cta-bar");
  const hero = document.getElementById("top");
  if (!bar || !hero) return;
  const closing = document.getElementById("closing-cta");

  function update() {
    const heroGone = hero.getBoundingClientRect().bottom < 0;
    let closingVisible = false;
    if (closing) {
      const r = closing.getBoundingClientRect();
      closingVisible = r.top < window.innerHeight && r.bottom > 0;
    }
    bar.classList.toggle("is-visible", heroGone && !closingVisible);
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update, { passive: true });
  update();
})();

// ── Boxed Joy stat callouts ─────────────────────────────────
(function () {
  const row = document.getElementById("boxed-joy-stats");
  if (!row) return;
  if (SHOW_BOXED_JOY_STATS) {
    row.hidden = false;
  } else {
    row.remove();
  }
})();

// ── Wire every booking CTA ──────────────────────────────────
document.querySelectorAll("[data-book]").forEach(function (el) {
  el.setAttribute("href", BOOKING_URL);
});

// ── Dynamic copyright year ──────────────────────────────────
document.querySelectorAll("[data-year]").forEach(function (el) {
  el.textContent = String(new Date().getFullYear());
});
