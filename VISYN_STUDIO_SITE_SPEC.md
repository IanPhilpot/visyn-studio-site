# Visyn Studio — Site v2 Spec (TikTok Live & Shop Accelerator)

The live site at **visyn.studio**. Plain HTML/CSS/JS, no framework, deployed
via GitHub Pages from `main` at the repo root. The `CNAME` file must stay.

> **v1 (photo shoot positioning) is retired.** Its history lives in this repo
> behind the `v1-photo-shoots` tag and in the `visyn-studio-v1-archive` mirror.
> Nothing from that positioning should return to the served site.

---

## 1. Pages

| File | Route | Indexed | Purpose |
|---|---|---|---|
| `index.html` | `/` | yes | Homepage — the whole pitch |
| `services.html` | `/services` | yes | What we handle, in more depth |
| `contact.html` | `/contact` | yes | Booking + email |
| `privacy.html` | `/privacy` | yes | Privacy policy: Google Analytics, Google Fonts, Google Calendar booking, GitHub Pages hosting. Linked from every footer. **Update it whenever a new third-party service is added to the site** |
| `about.html` | `/about` | **no** (`noindex, nofollow`) | Founder story. The only page where founder names appear |
| `404.html` | — | no | Not-found |

Founder names and photos must never appear on the homepage.

---

## 2. Configuration constants

All in `assets/js/site.js`, at the top of the file:

| Constant | Current value | Notes |
|---|---|---|
| `BOOKING_URL` | `https://calendar.app.google/4ZqwkECFsBakrisj9` | Google Calendar appointment page. Every `[data-book]` element resolves to this. Single source of truth |
| `SHOW_BOXED_JOY_STATS` | `true` | Gates the Boxed Joy figures in `#results` |

Add a booking CTA by putting `data-book` on the anchor — never hard-code the URL.

---

## 3. Design system

### Color tokens (`:root` in `assets/css/styles.css`)

| Token | Hex | Use |
|---|---|---|
| `--eggshell` | `#F5F2DE` | Main page background |
| `--amethyst` | `#271442` | Hero, dark bands, footer; accent text on light sections |
| `--moss` | `#4D891F` | Primary CTAs on light, stat numbers, step numbers, card headers |
| `--lime-cream` | `#FFFE9B` | Founding 5 background; CTA buttons on amethyst sections; Results figures |
| `--carbon` | `#222222` | Body text on light sections |
| `--near-white` | `#FCFCFC` | Body text on dark sections |

**Prism colours** (`--prism-*`), sampled from the logo's V: greens `#4E781B`,
`#3C591E`, `#313C1D`, `#688857`; purples `#653B7B`, `#3E2154`, `#221131`;
lime `#FFFF94`; cream `#EFE6B9`. **Decorative only, never text**: hero
spotlights, the faceted icon badges, marquee bulbs, diamond separators.

**Terracotta and Honey Bronze are fully retired.** They were previously kept
alive by the old wordmark; with the green logo in place they no longer appear
anywhere on the site.

### Logo

SVG lockups in `assets/img/logo/`: the faceted prism **V** plus the
**ISYN STUDIO** wordmark. All share one canvas (1871.92 x 314.1), so they are
drop-in interchangeable.

| File | Wordmark | Used on | Source |
|---|---|---|---|
| `visyn-studio-logo.svg` | Amethyst `#271442` | Nav (Eggshell) | **Derived** — supplied dark-bg file with only the wordmark fill changed to Amethyst. Replace with an official light-background file if one is produced |
| `visyn-studio-logo-dark-bg.svg` | White | Footer and OG image (Amethyst) | Supplied, unmodified |
| `visyn-studio-logo-mono-white.svg` | White, flat V | Not used yet — for photos or busy backgrounds | Supplied, unmodified |

Supplied files carry a C2PA content credential and are kept byte-for-byte.
The derived file has it stripped, because the credential hashes the original
bytes and would no longer verify.

Display widths are tokens (`--logo-w: 220px`, `--logo-w-small: 176px`). The V
is nearly twice the height of the wordmark, so the lockup needs more width
than a plain wordmark to keep the letters legible.

### Contrast rules — requirements, not suggestions

Measured ratios (verified against WCAG 2.1):

| Pair | Ratio | Rule |
|---|---|---|
| Near White on Moss | **4.17:1** | Large text only. WCAG counts "large" as ≥24px at any weight **or** ≥18.66px at 700+. Moss button labels are Jost **700 at 19px** (`--btn-label`); lowering either the weight or the size breaks AA |
| Moss on Eggshell | **3.79:1** | Large text only: step numbers, the 35+ figure, Services card headers, all **≥24px**. Never use Moss at body size on Eggshell. The test suite checks every Moss-coloured text node on every page |
| Carbon on Eggshell | 14.12:1 | Body text on light |
| Near White on Amethyst | 16.18:1 | Body text on dark |
| Amethyst on Lime Cream | 15.73:1 | Buttons + headings on the Founding 5 band and the services strip |
| Lime Cream on Amethyst | 15.73:1 | Results figures |
| Near White on Moss Deep | 5.86:1 | The Tools bento tile |
| Hero text over spotlights | ≥5.5:1 worst case | Measured by sampling rendered pixels behind every hero text line at nine points in the sweep cycle, at 375, 900 and 1280px. Re-run that check after changing beam colours, alphas or the phone prism opacity |
| Amethyst on Eggshell | 14.73:1 | Small accent text on light sections |

Small accent text on light sections uses **Amethyst**, never Moss.
On Amethyst sections, primary buttons are **Lime Cream with Amethyst labels**.

Every interactive element has a visible `:focus-visible` state, and
`prefers-reduced-motion: reduce` disables all animation and smooth scrolling.

### Section color map

Homepage, in order:

| Section | Background | Treatment |
|---|---|---|
| Nav | Eggshell | Moss Deep links; CTA button Moss |
| Hero `#top` | Amethyst | Near White; primary CTA Lime Cream. Prism V on the right (behind the copy at 30% on phones); four spotlights in prism colours sweep up from the bottom edge |
| Services strip | Lime Cream | Amethyst text scrolling between two Amethyst rails of chasing marquee bulbs. Holds the pause button |
| The problem | Eggshell | Prose beside an illustrative chart (labelled “Illustration, not real data.”). The chart draws itself on first view; a two-button toggle switches lines |
| The guide | Eggshell | “35+” in Moss, three promise chips. No founder names or photos |
| How it works `#how-it-works` | Eggshell | Step numbers in Moss |
| Results `#results` | Amethyst | Boxed Joy figures in Lime Cream, counting up once on screen |
| What we handle + Tools | Eggshell | Bento grid: TikTok Live & Shop (Lime Cream, broadcast rings), Ads (Amethyst), Email & SMS (Eggshell), Amazon (Near White), Tools `#tools` (Moss Deep). Icons on faceted prism badges |
| Founding 5 `#founding-5` | Lime Cream | Amethyst headings, Carbon body; a ticket with five numbered seats and the Moss CTA |
| Why Visyn | Eggshell | Real `<table>`; the Visyn column is raised on a Lime Cream card with check marks |
| Closing CTA `#closing-cta` | Amethyst | Near White; CTA Lime Cream |
| Footer | Amethyst | Near White |

Closing → Footer are consecutive Amethyst bands, separated by a thin Lime
Cream rule (`<hr class="band-rule">`).

### Typography

Google Fonts, loaded on every page:

- **Jost** — headings and button labels, at **weight 700**. Jost's 400 is
  light, unlike the single heavy weight Lilita One shipped, so the 700 is
  load-bearing for both look and contrast.
- **Lora** — body copy

Body copy is capped at `--measure` (68ch, under the ~75-character target) with
`line-height: 1.65`.

### Guardrails

- Numbered markers appear **only** in "How it works" — it is a real sequence.
  The "What we handle" cards are not numbered.
- The hero eyebrow is the **only** eyebrow label on the site.
- **No all-caps labels anywhere.** Headings are sentence case.
- Motion (Ian asked for it, superseding the original “one motion moment”):
  - **Looping:** hero spotlights, prism glint, services strip text, marquee
    bulbs, the live icon and its broadcast rings. Every looping animation
    stops with the round pause button in the services strip (WCAG 2.2.2).
    The choice is remembered in `localStorage`.
  - **Once:** hero copy rise on load; the chart draw; count-up figures
    (35+ and the Boxed Joy results, each with an `sr-only` twin holding the
    final value); the seats lighting up.
  - `prefers-reduced-motion: reduce` turns all of it off. Everything shows
    in its finished state and the pause button is hidden.
  - Still **no generic fade-and-slide on scroll** for sections.
- Seat numbers on the Founding 5 ticket are seat labels, not sequence markers.
- **No AI-generated imagery.** Where a photo belongs, use
  `.placeholder-block` in Amethyst or Moss with a short label. Real footage
  from Boxed Joy Co. replaces these once approved.

---

## 4. Responsive

- Works at **375px** with no horizontal scroll on the page body
  (`overflow-x: clip` on `body`; `clip` rather than `hidden` so the sticky nav
  keeps working).
- The comparison table scrolls horizontally **inside `.table-scroll`** with
  the first column pinned via `position: sticky`. The raised Visyn card is
  positioned by the fixed column widths (`table-layout: fixed`, 25/27/24/24%);
  change those together.
- The Tools tile is the target of every page's “Tools” nav link (`/#tools`).
  `site.js` re-aligns page anchors while fonts swap in so the target clears
  the sticky nav.
- Mobile sticky bottom CTA appears once the hero has scrolled out of view and
  hides while `#closing-cta` is on screen. Hidden entirely above 860px.

---

## 4b. Boxed Joy stat cards — how the figures were derived

Source: Boxed Joy Co.'s own Shopify order export, 1 May – 31 Aug 2026
(1,128 line-item rows / 752 orders, all USD).

**Method**

- The export has one row per *line item*. Order-level rows are those carrying
  a `Total`; continuation rows were excluded so orders are not double-counted.
- Period split on `Created at`: **before** = May + Jun, **after** = Jul + Aug.
- 4 cancelled orders excluded. Refunds netted off (`Total` − `Refunded Amount`);
  22 orders carried refunds totalling $228.71.
- Revenue basis is order `Total` (includes shipping and tax), matching what
  the store's own Shopify reporting shows.

**Published figures**

| Card | Before | After | Change |
|---|---|---|---|
| revenue | $5,217.64 | $20,730.34 | **+297%** |
| new customers (distinct emails) | 106 | 307 | **+190%** |
| orders | 136 | 612 | **+350%** |

**Not published, and why.** Average order value *fell* over the same period,
from $38.36 to $33.87 (**−11.7%**). The direction holds on the median
(−11.9%) and excluding shipping and tax (−12.3%), so it is real rather than a
rounding artefact — a wave of smaller first-time orders pulled the average
down while total revenue tripled. It was replaced with new customers rather
than published as an increase.

## 5. Open TODOs

- **Founding 5 fee detail**: `<p class="fee-detail">` on the homepage is
  intentionally empty, pending a pricing decision. Do not invent a percentage.
