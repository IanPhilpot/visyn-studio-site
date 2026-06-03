# Visyn Studio Website — Build Spec

Build spec for the Visyn Studio one-page launch site. Hand it to Claude Code. All copy, pricing, and configuration in this document is final and explicit — use it verbatim. Do not paraphrase headlines, body copy, or prices.

---

## Locked decisions (from the founder)

1. **Booking tool:** Cal.com for launch. (TidyCal planned later — build the CTA so the booking URL is a single easy-to-swap constant.)
2. **Pricing:** Use the precomputed pack pricing table provided by the founder (covers Q = 1 through Q = 99). Quantity = products × scenes. Use values verbatim, including fractional cents where they appear. Any Q ≥ 100, or "10+" selected on either dropdown, routes to Contact Sales.
3. **"Visyonaries" community term:** Include subtly in the footer.
4. **OG image:** Use the hero shot (`hero-saltbird-kitchen.jpg`) for now.
5. **Images & social links:** Use placeholders. Gray placeholder boxes for all images; `#` placeholder hrefs for social links.

---

## Goals

Ship a one-page site at `visyn.studio` today. Plain HTML, vanilla CSS, vanilla JS. No framework, no build step. GitHub Pages deployment. Designed to expand into `/solutions`, `/about`, `/contact` over the following weeks without rewriting the base.

## Tech stack

- HTML5, vanilla CSS, vanilla JS
- No framework, no build step
- Google Fonts (Bagel Fat One, Lilita One, Lora)
- Cal.com embed (or simple link) for the booking CTA — store the URL once as a JS constant `BOOKING_URL` and reuse everywhere
- GitHub Pages deployment with custom domain `visyn.studio`

## File structure

```
visyn-studio/
├── index.html
├── 404.html
├── CNAME                          # contains: visyn.studio
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── pricing.js
│   ├── img/
│   │   ├── logo.png               # provided
│   │   ├── hero-saltbird-kitchen.jpg
│   │   ├── work-saltbird-1.jpg ... work-saltbird-4.jpg
│   │   ├── work-marrow-1.jpg ... work-marrow-4.jpg
│   │   ├── work-fieldday-1.jpg ... work-fieldday-4.jpg
│   │   ├── team-ian.jpg
│   │   ├── team-steve.jpg
│   │   ├── team-phil.jpg
│   │   └── og-image.jpg           # use hero shot for now
│   └── video/
│       ├── saltbird-pour.mp4
│       ├── marrow-application.mp4
│       └── fieldday-pour.mp4
├── README.md
└── .gitignore
```

**Placeholder handling:** None of the image or video files exist yet. For every `<img>` and `<video>`, render a gray placeholder box at the correct aspect ratio (CSS background `#d9d6c5` with a thin dashed border and centered caption text showing the intended filename). When the real assets arrive, they drop into `assets/img/` and `assets/video/` with the exact filenames above — no markup changes needed.

---

## Design system

### Colors

```css
:root {
  --eggshell: #F5F2DE;
  --amethyst: #271442;
  --terracotta: #ED5C3B;
  --moss: #4D891F;
  --honey: #F1B658;
  --lime: #FFFE9B;

  --amethyst-soft: rgba(39, 20, 66, 0.7);
  --terracotta-hover: #d44d2e;
  --moss-hover: #3d6f19;
  --placeholder: #d9d6c5;
}
```

**Usage rules:**
- `--eggshell` is the dominant background. ~70% of the page real estate.
- `--amethyst` is high-contrast section background (promise strip, final CTA, footer) AND the default text color on light backgrounds.
- `--terracotta` is primary buttons, headline accent words, active states.
- `--moss` is secondary text accents, links, decorative dividers, the "save $100" callout.
- `--honey` is tertiary highlights and hover states.
- `--lime` is reserved for the pricing configurator section background only.

### Typography

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bagel+Fat+One&family=Lilita+One&family=Lora:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
```

```css
:root {
  --font-logo: 'Bagel Fat One', cursive;
  --font-display: 'Lilita One', sans-serif;
  --font-body: 'Lora', serif;

  --text-xs: 0.875rem;
  --text-sm: 1rem;
  --text-base: 1.125rem;
  --text-lg: 1.375rem;
  --text-xl: 1.75rem;
  --text-2xl: 2.5rem;
  --text-3xl: 4rem;
  --text-hero: clamp(2.75rem, 7vw, 5.5rem);

  --leading-tight: 1.1;
  --leading-snug: 1.3;
  --leading-normal: 1.6;
}
```

**Usage rules:**
- `--font-logo` (Bagel Fat One) is the logo only. Never use it anywhere else.
- `--font-display` (Lilita One) is H1, H2, large display numerals, button labels.
- `--font-body` (Lora) is paragraph text, captions, subheads, list items.
- No more than 3 type sizes per section.

### Spacing

```css
:root {
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2rem;
  --space-5: 3rem;
  --space-6: 5rem;
  --space-7: 8rem;

  --container-max: 1200px;
  --container-pad: 1.5rem;
}
```

### Buttons

```css
.btn {
  font-family: var(--font-display);
  font-size: var(--text-base);
  padding: 1rem 2rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  transition: transform 150ms ease, background-color 150ms ease;
  display: inline-block;
  text-decoration: none;
}
.btn-primary {
  background: var(--terracotta);
  color: var(--eggshell);
}
.btn-primary:hover {
  background: var(--terracotta-hover);
  transform: translateY(-1px);
}
.btn-secondary {
  background: transparent;
  color: var(--moss);
  padding: 0.5rem 0;
  border-radius: 0;
  font-family: var(--font-body);
  font-weight: 600;
}
.btn-secondary:hover { text-decoration: underline; }
.btn-secondary::after {
  content: " →";
  display: inline-block;
  margin-left: 0.25rem;
  transition: transform 150ms ease;
}
.btn-secondary:hover::after { transform: translateX(2px); }
.btn-large { padding: 1.25rem 2.5rem; font-size: var(--text-lg); }
```

### Section pattern

```css
.section { padding: var(--space-6) var(--container-pad); }
.section-inner { max-width: var(--container-max); margin: 0 auto; }
.section--dark { background: var(--amethyst); color: var(--eggshell); }
.section--lime { background: var(--lime); }
```

---

## Section-by-section build spec

Each section below gives the EXACT final copy. Use it verbatim.

### 1. Navigation

```html
<nav class="nav">
  <a href="#top" class="nav-logo"><img src="assets/img/logo.png" alt="Visyn Studio"></a>
  <ul class="nav-links">
    <li><a href="#work">Work</a></li>
    <li><a href="#how">How It Works</a></li>
    <li><a href="#pricing">Pricing</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
  <a href="#book" class="btn btn-primary nav-cta">Get a Free Shoot</a>
</nav>
```

- Eggshell background, dark amethyst text. Logo height 40px desktop / 32px mobile.
- Sticky on scroll; add a subtle shadow once scrolled > 20px.
- Mobile (<768px): hamburger reveals nav links; the "Get a Free Shoot" CTA stays visible.
- Smooth scroll between anchor links.

### 2. Hero

```html
<section class="hero" id="top">
  <div class="hero-content">
    <h1 class="hero-headline">Share your vision. We'll <span class="accent">shoot</span> the rest.</h1>
    <p class="hero-subhead">Pro-grade product photos and video, delivered in 48 hours. No studio bookings. No five-figure invoices. No reshoots required.</p>
    <div class="hero-ctas">
      <a href="#book" class="btn btn-primary">Get a Free Virtual Photo Shoot</a>
      <a href="#how" class="btn btn-secondary">See How It Works</a>
    </div>
  </div>
  <div class="hero-visual">
    <img src="assets/img/hero-saltbird-kitchen.jpg" alt="Saltbird Yuzu + Yarrow sparkling tonic on a sunlit kitchen counter">
  </div>
</section>
```

- Eggshell background.
- Headline: Lilita One, dark amethyst, `--text-hero`. The word "shoot" is wrapped in `.accent` and colored terracotta.
- Subhead: Lora, dark amethyst, `--text-lg`, `--leading-normal`, max-width 32rem.
- Desktop: 60/40 split (text left, visual right). Mobile: text on top, visual below.
- Hero visual: full-bleed within its column, `border-radius: 1.5rem`.

### 3. Promise strip

```html
<section class="section section--dark promise">
  <div class="section-inner promise-grid">
    <div class="promise-item">
      <div class="promise-icon"></div>
      <h3>48-hour turnaround</h3>
      <p>Visuals in hand in 2–3 business days, not weeks.</p>
    </div>
    <div class="promise-item">
      <div class="promise-icon"></div>
      <h3>Unlimited revisions</h3>
      <p>If a shot isn't right, we regenerate it. Until it works.</p>
    </div>
    <div class="promise-item">
      <div class="promise-icon"></div>
      <h3>Real humans, real work</h3>
      <p>We answer our own emails. AI is our tool, not our identity.</p>
    </div>
  </div>
</section>
```

- Dark amethyst background, eggshell text. Three columns desktop, stacked mobile.
- `.promise-icon` is a small honey-bronze geometric shape (circle, square, triangle), ~40px.
- `h3`: Lilita One, eggshell, `--text-xl`. `p`: Lora, eggshell at 0.85 opacity, `--text-base`.

### 4. The work

```html
<section class="section work" id="work">
  <div class="section-inner">
    <h2 class="section-title">See what 48 hours looks like.</h2>
    <p class="section-lede">We work across categories — food, beverage, personal care, and more. Each shoot is built around your product and your scenes. Here's a sample of what we've made.</p>
    <div class="work-grid">

      <article class="work-card work-card--saltbird">
        <header>
          <h3>Saltbird</h3>
          <p class="work-type">Botanical sparkling tonic</p>
        </header>
        <div class="work-thumbs">
          <img src="assets/img/work-saltbird-1.jpg" alt="Saltbird on a sunlit kitchen counter">
          <img src="assets/img/work-saltbird-2.jpg" alt="Saltbird on a summer picnic blanket">
          <img src="assets/img/work-saltbird-3.jpg" alt="Saltbird in a beach cooler">
          <img src="assets/img/work-saltbird-4.jpg" alt="Saltbird close-up detail shot">
        </div>
        <p class="work-caption">Yuzu + Yarrow tonic. Three scenes, twelve hours.</p>
      </article>

      <article class="work-card work-card--marrow">
        <header>
          <h3>Marrow &amp; Moss</h3>
          <p class="work-type">Botanical body oil</p>
        </header>
        <div class="work-thumbs">
          <img src="assets/img/work-marrow-1.jpg" alt="Marrow & Moss on a marble bathroom vanity">
          <img src="assets/img/work-marrow-2.jpg" alt="Marrow & Moss on a sunlit dresser">
          <img src="assets/img/work-marrow-3.jpg" alt="Marrow & Moss on a garden table">
          <img src="assets/img/work-marrow-4.jpg" alt="Marrow & Moss close-up detail shot">
        </div>
        <p class="work-caption">Cedar + Calendula oil. Three scenes, fourteen hours.</p>
      </article>

      <article class="work-card work-card--fieldday">
        <header>
          <h3>Field Day</h3>
          <p class="work-type">Small-batch granola</p>
        </header>
        <div class="work-thumbs">
          <img src="assets/img/work-fieldday-1.jpg" alt="Field Day granola on a breakfast tablescape">
          <img src="assets/img/work-fieldday-2.jpg" alt="Field Day granola at a trail rest stop">
          <img src="assets/img/work-fieldday-3.jpg" alt="Field Day granola on a café counter">
          <img src="assets/img/work-fieldday-4.jpg" alt="Field Day granola close-up detail shot">
        </div>
        <p class="work-caption">Maple + Pecan granola. Three scenes, ten hours.</p>
      </article>

    </div>
  </div>
</section>
```

- Eggshell background.
- `.section-title`: Lilita One, dark amethyst, `--text-2xl`. `.section-lede`: Lora, dark amethyst, `--text-lg`, max-width 48rem.
- Three cards. Mobile: stacked. Desktop: asymmetric grid — offset card 2 vertically ~3rem lower than cards 1 and 3 to avoid a static grid feel.
- Card background tints (10% wash): Saltbird → honey, Marrow & Moss → moss, Field Day → terracotta.
- `.work-thumbs`: 2×2 grid, rounded corners, consistent 1:1 aspect ratio. Card padding `--space-3`.

### 5. How it works

```html
<section class="section how" id="how">
  <div class="section-inner">
    <h2 class="section-title">Three steps. Two days. Done.</h2>
    <div class="how-steps">
      <div class="how-step">
        <div class="how-numeral">01</div>
        <h3>Book a free virtual photo shoot.</h3>
        <p>Hop on a call with Steve. Tell us about your brand. Pick a scene.</p>
      </div>
      <div class="how-step">
        <div class="how-numeral">02</div>
        <h3>Send your product.</h3>
        <p>Just the images you already have. No shipping. No studio booking.</p>
      </div>
      <div class="how-step">
        <div class="how-numeral">03</div>
        <h3>Get your visuals in 48–72 hours.</h3>
        <p>10 photos and 3 videos per product per scene — ready for your shop, your social, and your shelf.</p>
      </div>
    </div>
  </div>
</section>
```

- Eggshell background. `.how-numeral`: Lilita One, terracotta, ~96px desktop / ~72px mobile.
- Step `h3`: Lilita One, dark amethyst, `--text-lg`. Step `p`: Lora, dark amethyst, `--text-base`.
- Desktop: three columns with a thin honey-bronze line between them. Mobile: stacked with a 4px honey-bronze vertical divider on the left.

### 6. Pricing configurator

```html
<section class="section section--lime pricing" id="pricing">
  <div class="section-inner pricing-inner">
    <h2 class="section-title">Pricing that scales with you.</h2>
    <p class="section-lede">Pick a billing cadence, choose how many products and scenes you need, and we'll show you exactly what you'll pay. No surprises.</p>

    <div class="pricing-card">
      <div class="pricing-toggle" role="tablist">
        <button class="pricing-toggle-btn is-active" data-billing="onetime">One-time</button>
        <button class="pricing-toggle-btn" data-billing="monthly">Monthly</button>
      </div>

      <div class="pricing-controls">
        <label>
          <span>Products</span>
          <select id="products">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10plus">10+</option>
          </select>
        </label>
        <label>
          <span>Scenes per product</span>
          <select id="scenes">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3" selected>3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10plus">10+</option>
          </select>
        </label>
      </div>

      <div class="pricing-display">
        <div class="pricing-price" id="price">$499</div>
        <div class="pricing-period" id="period">one-time</div>
        <div class="pricing-includes" id="includes">Includes 30 photos and 9 videos.</div>
      </div>

      <div class="pricing-cta">
        <a href="#book" class="btn btn-primary" id="pricing-cta-btn">Get Started</a>
      </div>

      <div class="pricing-note" id="savings-note">
        <!-- Populated by pricing.js -->
      </div>
    </div>
  </div>
</section>
```

**Default state:** Products = 1, Scenes = 3 → 3 packs → **$499 one-time**, "Includes 30 photos and 9 videos." (1 product × 3 scenes is the canonical "3-pack." 3 products × 1 scene is equivalent.) Toggling to Monthly at this default shows **$398.97 / month**.

**Visuals:**
- Lime cream section background, dark amethyst text.
- Pricing card: white background, `border-radius: 1.5rem`, soft shadow, generous padding.
- Toggle: a pill with two segments; active segment is terracotta with eggshell text.
- Dropdowns: large (min-height 48px), Lora font, dark amethyst text, honey-bronze border.
- `.pricing-price`: Lilita One, terracotta, `--text-3xl`.
- `.pricing-period`: Lora italic, dark amethyst at 0.7 opacity.
- `.pricing-note`: Lora, forest moss, `--text-sm`, centered below the CTA.

**Pricing model (READ CAREFULLY — this is exact):**

- 1 pack = 1 product in 1 scene = 10 photos + 3 videos.
- Quantity **Q = products × scenes**.
- Photos = Q × 10. Videos = Q × 3.
- Prices come from the founder-provided pack pricing table (Q = 1 through Q = 99), used verbatim. Some prices include fractional cents — display them as given.
- If EITHER dropdown is "10+", OR Q ≥ 100 → show "Contact Sales" (price), "for custom pricing" (period), and the includes line: "Talk to Steve about volume pricing for larger projects." The CTA label stays "Get Started", but it should still route to `BOOKING_URL` via the existing `data-book` mechanism.
- The maximum Q reachable via the two dropdowns is 9 × 9 = 81, so the Q ≥ 100 case is a defensive guard, not the primary Contact Sales trigger.

**Price display formatting:**
- Whole-dollar prices display with no decimals: `$499`, `$799`, `$1,699`.
- Non-whole prices display with two decimals: `$398.97`, `$999.20`, `$1,499.30`.
- Always use thousands separators.
- This is handled by the `formatPrice` helper in `pricing.js`.

**Savings note (replaces the old static "$100" line):**

The `#savings-note` element is fully driven by JS. Behavior:
- One-time tab selected: `Switch to monthly to save $XXX every month.` where the amount is `oneTimePrice − monthlyPrice` for the current Q, formatted the same way as the price display.
- Monthly tab selected: `You're saving $XXX every month vs. one-time. Cancel anytime, no penalty.`
- Contact Sales state (either dropdown is "10+", or Q ≥ 100): `Reach out for a custom plan that fits your scale.`

**pricing.js (use as-is, replace any previous version):**

```javascript
// Booking URL — single source of truth. Swap to TidyCal later by changing this one value.
const BOOKING_URL = "https://cal.com/visyn-studio/free-shoot"; // TODO: replace with the real Cal.com link

// Founder-provided pack pricing table, Q = 1..99. Used verbatim, including fractional cents.
// Q = products * scenes. Photos = Q * 10. Videos = Q * 3.
const PRICE_TABLE = {
  onetime: {
    1: 199, 2: 379, 3: 499, 4: 679, 5: 849, 6: 999.2, 7: 1189, 8: 1359, 9: 1499.3, 10: 1699,
    11: 1869, 12: 1999.4, 13: 2209, 14: 2379, 15: 2498.5, 16: 2719, 17: 2889, 18: 2998.6, 19: 3229, 20: 3399,
    21: 3498.7, 22: 3739, 23: 3909, 24: 3998.8, 25: 4249, 26: 4419, 27: 4498.9, 28: 4759, 29: 4929, 30: 4999,
    31: 5269, 32: 5439, 33: 5499.1, 34: 5779, 35: 5949, 36: 5999.2, 37: 6289, 38: 6459, 39: 6499.3, 40: 6799,
    41: 6969, 42: 6999.4, 43: 7309, 44: 7479, 45: 7498.5, 46: 7819, 47: 7989, 48: 7998.6, 49: 8329, 50: 8499,
    51: 8498.7, 52: 8839, 53: 9009, 54: 8998.8, 55: 9349, 56: 9519, 57: 9498.9, 58: 9859, 59: 10029, 60: 9999,
    61: 10369, 62: 10539, 63: 10499.1, 64: 10879, 65: 11049, 66: 10999.2, 67: 11389, 68: 11559, 69: 11499.3, 70: 11899,
    71: 12069, 72: 11999.4, 73: 12409, 74: 12579, 75: 12498.5, 76: 12919, 77: 13089, 78: 12998.6, 79: 13429, 80: 13599,
    81: 13498.7, 82: 13939, 83: 14109, 84: 13998.8, 85: 14449, 86: 14619, 87: 14498.9, 88: 14959, 89: 15129, 90: 14999,
    91: 15469, 92: 15639, 93: 15499.1, 94: 15979, 95: 16149, 96: 15999.2, 97: 16489, 98: 16659, 99: 16499.3
  },
  monthly: {
    1: 149, 2: 279, 3: 398.97, 4: 539, 5: 674, 6: 799, 7: 944, 8: 1079, 9: 1198.8, 10: 1349,
    11: 1499.19, 12: 1599, 13: 1728.5, 14: 1859, 15: 1998.5, 16: 2129, 17: 2268.5, 18: 2399, 19: 2528.5, 20: 2659,
    21: 2798.5, 22: 2929, 23: 3068.5, 24: 3199, 25: 3328.5, 26: 3469, 27: 3598.5, 28: 3729, 29: 3858.5, 30: 3999,
    31: 4138.5, 32: 4269, 33: 4398.5, 34: 4539, 35: 4668.5, 36: 4799, 37: 4938.5, 38: 5069, 39: 5198.5, 40: 5339,
    41: 5458.5, 42: 5599, 43: 5738.5, 44: 5869, 45: 5998.5, 46: 6139, 47: 6268.5, 48: 6399, 49: 6538.5, 50: 6659,
    51: 6808.5, 52: 6939, 53: 7058.5, 54: 7209, 55: 7338.5, 56: 7459, 57: 7598.5, 58: 7739, 59: 7858.5, 60: 7999,
    61: 8138.5, 62: 8269, 63: 8408.5, 64: 8539, 65: 8658.5, 66: 8799, 67: 8938.5, 68: 9059, 69: 9198.5, 70: 9329,
    71: 9478.5, 72: 9599, 73: 9738.5, 74: 9879, 75: 9998.5, 76: 10139, 77: 10278.5, 78: 10409, 79: 10538.5, 80: 10679,
    81: 10798.5, 82: 10939, 83: 11078.5, 84: 11199, 85: 11338.5, 86: 11479, 87: 11598.5, 88: 11739, 89: 11878.5, 90: 11999,
    91: 12148.5, 92: 12279, 93: 12398.5, 94: 12549, 95: 12678.5, 96: 12799, 97: 12948.5, 98: 13079, 99: 13198.5
  }
};

// Format a number as a price string. Whole dollars get no decimals; otherwise show 2.
function formatPrice(n) {
  const isWhole = (n === Math.floor(n));
  return '$' + n.toLocaleString('en-US', {
    minimumFractionDigits: isWhole ? 0 : 2,
    maximumFractionDigits: isWhole ? 0 : 2
  });
}

function getBilling() {
  return document.querySelector('.pricing-toggle-btn.is-active').dataset.billing;
}

function setContactSalesState() {
  document.getElementById('price').textContent = 'Contact Sales';
  document.getElementById('period').textContent = 'for custom pricing';
  document.getElementById('includes').textContent = 'Talk to Steve about volume pricing for larger projects.';
  document.getElementById('savings-note').textContent = 'Reach out for a custom plan that fits your scale.';
}

function updatePricing() {
  const productsVal = document.getElementById('products').value;
  const scenesVal = document.getElementById('scenes').value;
  const billing = getBilling();

  // Contact Sales path: any "10+" selection
  if (productsVal === '10plus' || scenesVal === '10plus') {
    setContactSalesState();
    return;
  }

  const Q = parseInt(productsVal, 10) * parseInt(scenesVal, 10);

  // Defensive: anything Q >= 100 also routes to Contact Sales
  if (Q >= 100 || !PRICE_TABLE.onetime[Q]) {
    setContactSalesState();
    return;
  }

  const onetimePrice = PRICE_TABLE.onetime[Q];
  const monthlyPrice = PRICE_TABLE.monthly[Q];
  const activePrice = (billing === 'monthly') ? monthlyPrice : onetimePrice;

  document.getElementById('price').textContent = formatPrice(activePrice);
  document.getElementById('period').textContent = (billing === 'monthly') ? '/ month' : 'one-time';

  const photos = Q * 10;
  const videos = Q * 3;
  document.getElementById('includes').textContent =
    'Includes ' + photos + ' photos and ' + videos + ' videos.';

  // Dynamic savings note
  const savings = onetimePrice - monthlyPrice;
  const savingsStr = formatPrice(savings);
  const noteEl = document.getElementById('savings-note');
  if (billing === 'monthly') {
    noteEl.textContent = "You're saving " + savingsStr + ' every month vs. one-time. Cancel anytime, no penalty.';
  } else {
    noteEl.textContent = 'Switch to monthly to save ' + savingsStr + ' every month.';
  }
}

// Toggle handlers
document.querySelectorAll('.pricing-toggle-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.pricing-toggle-btn').forEach(function (b) { b.classList.remove('is-active'); });
    btn.classList.add('is-active');
    updatePricing();
  });
});

document.getElementById('products').addEventListener('change', updatePricing);
document.getElementById('scenes').addEventListener('change', updatePricing);

// Point booking CTAs at the booking URL
document.querySelectorAll('[data-book]').forEach(function (el) { el.setAttribute('href', BOOKING_URL); });

// Initialize
updatePricing();
```

### 7. About

```html
<section class="section about" id="about">
  <div class="section-inner">
    <h2 class="section-title">We're three people who built what we wished existed.</h2>
    <div class="about-story">
      <p>We met at a major CPG services company. Ian led marketing. Steve ran sales. Phil managed operations. From three different seats, we saw the same problem: small brands needed great creative, and the existing options weren't working.</p>
      <p>Traditional photo shoots cost $5,000 to $10,000 and took weeks to schedule. DIY AI tools were faster, but the output rarely held up. And the agencies in the middle either ignored small brands entirely or charged them like big ones.</p>
      <p>So we built Visyn Studio. Three people, 35 years of CPG creative between us, and a workflow designed around one belief: a small brand should be able to look as polished as a Fortune 500 one — without paying like one.</p>
      <p>We use AI the way a designer uses Photoshop. It lets us move faster. But the eye, the craft, the quality bar, and the email you get back in two hours? That's still us.</p>
    </div>
    <div class="about-team">
      <div class="team-card">
        <img src="assets/img/team-ian.jpg" alt="Ian Philpot">
        <h3>Ian Philpot</h3>
        <p class="team-role">Chief Marketing Officer</p>
        <p class="team-bio">15+ years in brand and creative. Oversees the quality of every photo and video we deliver.</p>
      </div>
      <div class="team-card">
        <img src="assets/img/team-steve.jpg" alt="Steve [LAST]">
        <h3>Steve [LAST]</h3>
        <p class="team-role">Chief Revenue Officer</p>
        <p class="team-bio">10 years in CPG and product imaging. Talks to every brand before they buy.</p>
      </div>
      <div class="team-card">
        <img src="assets/img/team-phil.jpg" alt="Phil [LAST]">
        <h3>Phil [LAST]</h3>
        <p class="team-role">Chief Operations Officer</p>
        <p class="team-bio">10+ years in CPG operations. Makes sure every order moves from kickoff to delivery without friction.</p>
      </div>
    </div>
  </div>
</section>
```

- Eggshell background. `.about-story` paragraphs: Lora, dark amethyst, `--text-lg`, `--leading-normal`, max-width 42rem, centered.
- `.about-team`: 3-column grid desktop, stacked mobile. Photos: rounded corners (1rem), aspect ratio 4:5, gray placeholder if missing.
- Team `h3`: Lilita One, dark amethyst, `--text-lg`. `.team-role`: Lilita One, terracotta, `--text-base`. `.team-bio`: Lora, dark amethyst, `--text-base`.
- NOTE: "Steve [LAST]" and "Phil [LAST]" are placeholders for their real last names — leave the bracket text in so it's obvious it needs filling.

### 8. Final CTA

```html
<section class="section section--dark final-cta" id="book">
  <div class="section-inner">
    <h2 class="final-cta-headline">Ready to <span class="accent">shoot</span>?</h2>
    <p class="final-cta-subhead">Book a free virtual photo shoot — a $199 value. No credit card. No commitment. Just see what we can do with your brand.</p>
    <a href="#" data-book class="btn btn-primary btn-large">Book Your Free Shoot</a>
  </div>
</section>
```

- Dark amethyst background, eggshell text.
- `.final-cta-headline`: Lilita One, eggshell, `--text-3xl`; "shoot" in terracotta.
- `.final-cta-subhead`: Lora, eggshell at 0.85 opacity, `--text-lg`, max-width 36rem, centered.
- Content centered, generous vertical padding (`--space-7`).
- The `data-book` attribute makes pricing.js set the href to `BOOKING_URL`. Apply `data-book` to ALL booking buttons (nav CTA, hero primary CTA, pricing CTA, this one, footer "Book a free shoot").

### 9. Footer

```html
<footer class="footer" id="contact">
  <div class="section-inner footer-grid">
    <div class="footer-brand">
      <img src="assets/img/logo.png" alt="Visyn Studio">
      <p>A creative production studio for small CPG brands.</p>
    </div>
    <div class="footer-col">
      <h4>Studio</h4>
      <ul>
        <li><a href="#work">Work</a></li>
        <li><a href="#how">How It Works</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#about">About</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Contact</h4>
      <ul>
        <li><a href="mailto:hello@visyn.studio">hello@visyn.studio</a></li>
        <li><a href="#" data-book>Book a free shoot</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Follow</h4>
      <ul>
        <li><a href="#">Instagram</a></li>
        <li><a href="#">LinkedIn</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-fine">
    <p>Made in Chicago for visionaries everywhere — our fellow Visyonaries. &copy; 2026 Visyn Studio.</p>
  </div>
</footer>
```

- Dark amethyst background, eggshell text. 4-column grid desktop, stacked mobile.
- Footer headings: Lilita One, honey bronze, `--text-base`.
- Links: Lora, eggshell at 0.85 opacity, hover to terracotta.
- `.footer-fine`: centered, smaller text, top border in eggshell at 0.2 opacity. The "Visyonaries" line is the subtle community nod — keep it light and in the fine print as written.
- Instagram / LinkedIn hrefs are `#` placeholders until accounts exist.

---

## Sections to add later (commented out at launch)

Build the markup but wrap these in `<!-- -->` so they're ready to enable when content lands:

1. **Testimonials** — after Work, before How It Works. Three quote cards. Enable after pilot customers approve.
2. **Case studies** — after Work. Detailed pilot-customer write-ups. Enable in 1–2 weeks.
3. **FAQ** — after Pricing. Six to eight expandable questions. Optional.

---

## Responsive breakpoints

```css
/* Mobile-first base styles */
@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

**Mobile-specific behaviors:**
- Sticky bottom CTA on mobile: after the hero scrolls past, show a fixed bottom bar with the "Get a Free Shoot" button. Hide it when the `#book` section is in view.
- All grids collapse to a single column under 768px.
- Configurator stays usable; dropdowns are 48px min-height for touch targets; the price stays prominent.
- Test specifically on iPhone 13 and Pixel 7 viewport widths.

---

## SEO and meta

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Visyn Studio — Virtual Photo Shoots for Small CPG Brands</title>
  <meta name="description" content="The photo shoot, reinvented for small brands. Pro-grade product photos and videos delivered in 48 hours. From $499.">
  <meta property="og:title" content="Visyn Studio — Virtual Photo Shoots for Small CPG Brands">
  <meta property="og:description" content="Pro-grade product photos and videos delivered in 48 hours. From $499.">
  <meta property="og:image" content="https://visyn.studio/assets/img/og-image.jpg">
  <meta property="og:url" content="https://visyn.studio">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
</head>
```

OG image: use the hero shot for now (`og-image.jpg` = a 1200×630 crop of `hero-saltbird-kitchen.jpg`). Swap to a custom branded OG image later.

---

## Deployment

1. Push the repo to GitHub (public or private — both work with GitHub Pages on a paid plan).
2. Settings → Pages → Source: deploy from branch `main`, root.
3. Custom domain: enter `visyn.studio`. GitHub creates a `CNAME` file (or use the one in the repo).
4. DNS at the registrar:
   - `A` records to GitHub's IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Or a `CNAME` record for `www` → `<username>.github.io`
5. Enable "Enforce HTTPS" once the cert provisions (usually within an hour).

---

## Future state (post-launch roadmap)

When ready to go multi-page, keep the design system, fonts, and component patterns intact:
- `/` (homepage) — stays mostly as-is, possibly trimmed.
- `/solutions` (overview) + `/solutions/food-beverage`, `/solutions/personal-care`, `/solutions/snacks-pantry` — SEO landing pages with industry-specific copy and case studies.
- `/about` — extended team, story, values.
- `/contact` — embedded Cal.com (or TidyCal) widget, contact form, hello@ email, hours.
- `/work` (optional) — full portfolio gallery once there are 10+ shoots to show.
