// =============================================================
//  Visyn Studio — shared site script
//  Powers Home, About, Services, Contact, 404.
// =============================================================

// ── Swappable config ────────────────────────────────────────
// Single source of truth for the booking flow. Every "Book a Growth
// Call" and "Claim a Founding Spot" button on every page resolves to
// this one value via the [data-book] attribute.
const BOOKING_URL = "https://calendar.app.google/4ZqwkECFsBakrisj9";

// Boxed Joy Co. stat cards. Figures come from the store's own order export
// for May-Aug 2026; see VISYN_STUDIO_SITE_SPEC.md for how they are derived.
// These are a real brand's revenue figures, so the block stays gated.
const SHOW_BOXED_JOY_STATS = true;

// Visitors who ask for reduced motion get every animation's end state.
// .motion-ok gates the CSS that hides things until they animate in.
const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const CAN_OBSERVE = "IntersectionObserver" in window;
if (!REDUCED_MOTION && CAN_OBSERVE) document.documentElement.classList.add("motion-ok");

// ── Land page anchors precisely ─────────────────────────────
// Links like /#tools from other pages jump before the web fonts swap in,
// and the swap reflows everything above the target, so the first jump can
// end up under the sticky nav. For the first few seconds, re-align the
// target whenever the page changes height, until the visitor scrolls.
(function () {
  if (!location.hash) return;
  let target = null;
  try { target = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch (e) {}
  if (!target) return;
  let moved = false;
  ["wheel", "touchstart", "keydown", "mousedown"].forEach(function (type) {
    window.addEventListener(type, function () { moved = true; }, { once: true, passive: true });
  });
  const root = document.documentElement;
  function align() {
    if (moved) return;
    root.style.scrollBehavior = "auto";
    target.scrollIntoView({ block: "start" });
    root.style.scrollBehavior = "";
  }
  window.addEventListener("load", function () {
    align();
    if (!("ResizeObserver" in window)) return;
    const ro = new ResizeObserver(align);
    ro.observe(document.body);
    setTimeout(function () { ro.disconnect(); }, 3000);
  });
})();

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
  if (!SHOW_BOXED_JOY_STATS) {
    row.remove();
    return;
  }
  // Safety net: these are a real brand's revenue figures. If any value is
  // still a placeholder, keep the whole block out of the page rather than
  // publish a made-up number.
  const pending = row.querySelectorAll("[data-pending]").length;
  if (pending) {
    console.warn(
      "Boxed Joy stats withheld: " + pending + " placeholder value(s) remain. " +
      "Set the real figures and remove their data-pending attributes."
    );
    row.remove();
    return;
  }
  row.hidden = false;
})();

// ── Pause / play looping animation ──────────────────────────
// The spotlights, strip, bulbs and prism glint loop forever, so WCAG 2.2.2
// needs a way to stop them. The choice sticks across visits.
(function () {
  const btn = document.getElementById("motion-toggle");
  if (!btn) return;
  const root = document.documentElement;
  function set(paused) {
    root.classList.toggle("motion-paused", paused);
    btn.setAttribute("aria-pressed", String(paused));
    btn.title = paused ? "Play animations" : "Pause animations";
  }
  let saved = false;
  try { saved = localStorage.getItem("visyn-motion") === "paused"; } catch (e) {}
  set(saved);
  btn.addEventListener("click", function () {
    const paused = btn.getAttribute("aria-pressed") !== "true";
    set(paused);
    try { localStorage.setItem("visyn-motion", paused ? "paused" : "on"); } catch (e) {}
  });
})();

// ── Problem chart ───────────────────────────────────────────
// On first view the "without" line draws, then the "with Visyn" line
// follows. The two buttons switch between them at any time.
(function () {
  const chart = document.getElementById("problem-chart");
  if (!chart) return;
  const buttons = chart.querySelectorAll(".chart-btn");
  let timer = null;
  let touched = false;

  function show(state) {
    chart.setAttribute("data-show", state);
    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.show === state));
    });
  }
  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      touched = true;
      clearTimeout(timer);
      show(b.dataset.show);
    });
  });

  chart.classList.add("chart--live");
  if (REDUCED_MOTION || !CAN_OBSERVE) {
    show("with");
    return;
  }
  show("none");
  const io = new IntersectionObserver(function (entries) {
    if (!entries[0].isIntersecting) return;
    io.disconnect();
    if (touched) return;
    show("without");
    timer = setTimeout(function () { if (!touched) show("with"); }, 2000);
  }, { threshold: 0.45 });
  io.observe(chart);
})();

// ── Count-up figures ────────────────────────────────────────
// [data-count] numbers roll up from zero once on screen. Each has an
// sr-only twin holding the final value, so screen readers never hear a
// half-counted number. Runs after the Boxed Joy gate above.
(function () {
  if (REDUCED_MOTION || !CAN_OBSERVE) return;
  const els = Array.prototype.filter.call(
    document.querySelectorAll("[data-count]"),
    function (el) { return !el.closest("[hidden]"); }
  );
  if (!els.length) return;

  function text(el, n) {
    return (el.dataset.prefix || "") + n + (el.dataset.suffix || "");
  }
  function run(el) {
    const target = Number(el.dataset.count);
    const start = performance.now();
    const duration = 1400;
    (function frame(now) {
      const p = Math.min(1, (now - start) / duration);
      el.textContent = text(el, Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(frame);
    })(start);
  }
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      run(e.target);
    });
  }, { threshold: 0.6 });
  els.forEach(function (el) {
    el.textContent = text(el, 0);
    io.observe(el);
  });
})();

// ── Founding seats ──────────────────────────────────────────
(function () {
  const ticket = document.getElementById("founding-ticket");
  if (!ticket) return;
  if (REDUCED_MOTION || !CAN_OBSERVE) {
    ticket.classList.add("is-in");
    return;
  }
  const io = new IntersectionObserver(function (entries) {
    if (!entries[0].isIntersecting) return;
    io.disconnect();
    ticket.classList.add("is-in");
  }, { threshold: 0.4 });
  io.observe(ticket);
})();

// ── Wire every booking CTA ──────────────────────────────────
document.querySelectorAll("[data-book]").forEach(function (el) {
  el.setAttribute("href", BOOKING_URL);
});

// ── Dynamic copyright year ──────────────────────────────────
document.querySelectorAll("[data-year]").forEach(function (el) {
  el.textContent = String(new Date().getFullYear());
});
