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
| `about.html` | `/about` | **no** (`noindex, nofollow`) | Founder story. The only page where founder names appear |
| `404.html` | — | no | Not-found |

Founder names must never appear on the homepage.

---

## 2. Configuration constants

All in `assets/js/site.js`, at the top of the file:

| Constant | Current value | Notes |
|---|---|---|
| `BOOKING_URL` | `https://calendar.app.google/4ZqwkECFsBakrisj9` | Google Calendar appointment page. Every `[data-book]` element resolves to this. Single source of truth |
| `SHOW_BOXED_JOY_STATS` | `true` | Gates the Boxed Joy stat cards in `#results` |

Add a booking CTA by putting `data-book` on the anchor — never hard-code the URL.

---

## 3. Design system

### Color tokens (`:root` in `assets/css/styles.css`)

| Token | Hex | Use |
|---|---|---|
| `--eggshell` | `#F5F2DE` | Main page background |
| `--amethyst` | `#271442` | Hero, dark bands, footer; accent text on light sections |
| `--moss` | `#4D891F` | Primary CTAs on light, stat numbers, step numbers, card headers |
| `--lime-cream` | `#FFFE9B` | Founding 15 background; CTA buttons on amethyst sections |
| `--carbon` | `#222222` | Body text on light sections |
| `--near-white` | `#FCFCFC` | Body text on dark sections |

**Terracotta and Honey Bronze are retired** from the site palette. They remain
only inside the logo artwork, which is used as-is and never recolored.

### Contrast rules — requirements, not suggestions

Measured ratios (verified against WCAG 2.1):

| Pair | Ratio | Rule |
|---|---|---|
| Near White on Moss | **4.17:1** | Large text only. WCAG counts "large" as ≥24px at any weight **or** ≥18.66px at 700+. Moss button labels are Jost **700 at 19px** (`--btn-label`); lowering either the weight or the size breaks AA |
| Moss on Eggshell | **3.79:1** | Large text only. Card headers and the table's Visyn column header are held at **≥24px**. Never use Moss at body size on Eggshell |
| Carbon on Eggshell | 14.12:1 | Body text on light |
| Near White on Amethyst | 16.18:1 | Body text on dark |
| Amethyst on Lime Cream | 15.73:1 | Buttons + headings on the Founding 15 band |
| Amethyst on Eggshell | 14.73:1 | Small accent text on light sections |

Small accent text on light sections uses **Amethyst**, never Moss.
On Amethyst sections, primary buttons are **Lime Cream with Amethyst labels**.

Every interactive element has a visible `:focus-visible` state, and
`prefers-reduced-motion: reduce` disables all animation and smooth scrolling.

### Section color map

| Section | Background | Text |
|---|---|---|
| Nav | Eggshell | Carbon; CTA button Moss |
| Hero | Amethyst | Near White; primary CTA Lime Cream |
| The problem | Eggshell | Carbon |
| The guide | Eggshell | Carbon |
| How it works | Eggshell | Carbon; step numbers in Moss |
| What we handle | Eggshell | Carbon; card headers in Moss |
| Results (Boxed Joy) | Eggshell | Carbon; stat numbers in Moss |
| Founding 15 | Lime Cream | Amethyst headings, Carbon body; CTA Moss |
| Why Visyn (table) | Eggshell | Carbon; Visyn column header in Moss |
| Tools for live sellers | Amethyst | Near White |
| Closing CTA | Amethyst | Near White; CTA Lime Cream |
| Footer | Amethyst | Near White |

Tools → Closing → Footer are three consecutive Amethyst bands. A thin Lime
Cream rule (`<hr class="band-rule">`) separates each so they read as distinct
sections.

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
- One motion moment only: the hero rise on page load. No fade-and-slide on
  scroll for other sections.
- **No AI-generated imagery.** Where a photo belongs, use
  `.placeholder-block` in Amethyst or Moss with a short label. Real footage
  from Boxed Joy Co. replaces these once approved.

---

## 4. Responsive

- Works at **375px** with no horizontal scroll on the page body
  (`overflow-x: clip` on `body`; `clip` rather than `hidden` so the sticky nav
  keeps working).
- The comparison table scrolls horizontally **inside `.table-scroll`** with
  the first column pinned via `position: sticky`.
- Mobile sticky bottom CTA appears once the hero has scrolled out of view and
  hides while `#closing-cta` is on screen. Hidden entirely above 860px.

---

## 5. Open TODOs

- **Founding 15 fee detail**: `<p class="fee-detail">` on the homepage is
  intentionally empty, pending a pricing decision. Do not invent a percentage.
