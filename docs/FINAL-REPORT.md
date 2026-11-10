# Abhinav Singh — Portfolio: final report

**Deliverable:** a production Next.js 16 application that serves the complete
ThreeUI **Kage** document — `KageLandingPage` — as the portfolio itself, with the
content of that document rewritten for Abhinav Singh and the supplied portrait
photograph used inside it.

---

## 1. What was implemented

### 1.1 The component, from the registered source

The implementation is not a recreation. The canonical files were fetched,
verified and built into the project:

| Source | How it was obtained | Integrity |
| --- | --- | --- |
| `public/landing-pages/kage.html` | `@designcodeio/threeui@1.2.0` (published package) | **byte-exact**, SHA-256 `c8e06b90…d9f49`, 243,963 bytes — the registered revision |
| `public/landing-pages/secret-pathways-assets/fonts.css` | same package | byte-exact, SHA-256 `985f85a9…dc1b0` |
| `public/landing-pages/secret-pathways-assets/three.min.js` | same package | byte-exact, SHA-256 `8a5f7249…a2271` |
| 14 binary assets (`generated/*.webp`, `foreground/png/*.webp`) | same package | every file matches its registered size and SHA-256 |
| `src/vendor/threeui/shaders/landing-pages/LandingPages.tsx` | registered JSON bundle | verified `4d379461…a9d30a` |
| `…/pageTypography.ts` | registered JSON bundle | verified `809cc657…c44cc` |
| `…/pageRecipes.ts` | registered JSON bundle | verified `c9d9849c…523233` |
| `…/LandingPageFrame.tsx` | registered JSON bundle | verified `61de2cc5…dbaa78` |
| `src/vendor/threeui/threeui.css` | the package stylesheet shipped with those components | build artefact of the same source; the registered `src/shaders/threeui.css` hash (`efe44471…`) is not reproducible from the published package, and is reported here rather than faked |

`LandingPages.tsx` is trimmed to the one page that ships in this project. Its
sibling exports import `?raw` documents that the published package does not
carry, so they cannot compile without shipping twenty more pages. The
`KageLandingPage` function itself is unmodified.

The configured usage is kept verbatim in `src/components/Scene.tsx`:
`headingFont="onest" bodyFont="onest" headingWeight="400" bodyWeight="300"
primaryColor="#e0231c" headingSize={46} bodySize={17}
headingLetterSpacing={-0.012}`.

### 1.2 The document, rewritten for Abhinav

The Kage page is a designed experience; it was adapted, not replaced:

* **Navigation** — About / Work / Practice / Contact, with the authored
  bilingual hover (the Japanese line is now Hindi: इंजीनियर · कर्म · साधना · संवाद).
* **Hero** — the authored "hidden gate" composition, headline replaced with
  *Building intelligent experiences. Engineering what's next.*, plus the
  introduction, the two calls to action (*Explore my work*, *Let's connect*),
  the four-chapter index, the live preview window and the scroll cue.
* **The wordmark** — `ABHINAV` is now cut from the same Wordmark face and set to
  the frame width, with the same rise reveal per glyph.
* **Chapter I · The Sanmon (About)** — the supplied portrait in a 4:5 frame
  inside the reading column, the three supplied paragraphs, the academic
  record (2025–29 · 81.8% · 78% · two projects in public), interests and the
  link through to the work. The camera for this chapter was pulled forward so
  the gate frames the portrait rather than dwarfing it.
* **Chapter II · Selected Work** — the three live "window" cards were kept and
  relabelled as Vednix AI (Live), Second Thought (In build) and The Craft
  (Stack). Beneath them, two full project dossiers with status badges, feature
  lists, stacks and links.
* **Chapter III · The Practice** — the authored atlas of five plates now carries
  the real stack (languages, interface, core & data, intelligence, tools), then
  four editorial blocks: Experience, Education, Certifications, Development
  journey.
* **Chapter IV · Afterlight (Contact)** — the closing headline, the address, the
  three channels, and a working mail-composing form.
* **Footer** — the colophon, rewritten.

### 1.3 The photograph

`public/portrait/abhinav-portrait.webp` — the black-tee low-key portrait, cropped
4:5 from the original upload (900 × 1125, 51 KB), used at 1:1 composition with
no generated replacement. It is the first thing the About chapter shows, and it
is what the hero's preview window opens toward. The white-shirt photograph was
not used.

---

## 2. Technology

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | **Next.js 16.4.3** (App Router) | the brief asked for SEO, OG metadata and a production build; the app is four small files |
| UI | **React 19.3.1** | required by the component's peer range (`>=18 <20`) |
| Language | **TypeScript 5**, `strict` | typed props through the component boundary |
| Scene | **Three.js r128 runtime shipped inside `three.min.js`** + the authored WebGL world | untouched; the scene is generated at runtime by the document |
| Styles | the document's own 52 KB stylesheet + `threeui.css` | byte-authored, not re-implemented |
| Fonts | Onest, Noto JP and the Wordmark subset, **self-hosted** | the package ships them as base64 data URIs; they were extracted to `.woff2` files so `fonts.css` is readable and cacheable |

No ThreeUI runtime dependency is installed: the component source and the
document are vendored, which is what keeps the page byte-exact and the build
themable.

---

## 3. What is functional (tested in a real browser)

Verified with Playwright against the production build (`next start`), in
Chromium with software WebGL:

* the framed document loads, runs its own preloader to 100 % and boots its
  WebGL world; **no console errors, no page errors, no failed requests**;
* scroll-driven camera travel across all six chapter anchors; the near-plane
  foreground stages lift, blur and retire as chapters change;
* the preloader, the nav (scroll-hide, active link, mobile sheet), the right
  rail, the hero exit sequence, the reveal observer, the live project windows,
  the cloth/glow card treatment and the cursor;
* **navigation:** in-frame nav links, hero chips, rail dots and the closing
  "back to the gate" all scroll to the intended chapter (fixed a name collision
  where a `#top` link swallowed the first chapter);
* **the contact form** composes a `mailto:` with subject and body from its own
  fields, states out loud that there is no backend, and reports its state in an
  `aria-live` region;
* **layouts checked at 1440×900, 1280×800, 1024×700, 834×1112 and 390×844.**
  The responsive rules are additive: the phone gets a single-column hero, a
  labelled index with one-line rows, stacked plates for the three cards, and a
  no-wrap email address; the tablet gets even plates instead of the mosaic;
* **reduced motion** is honoured by the scene (`prefers-reduced-motion`), and the
  page stays readable when the renderer is unavailable (`no-webgl` fallback);
* `next build` completes clean: type-checked, statically prerendered, no
  warnings beyond one lockfile note that does not affect output.

### Layout decisions worth naming

The registered document ships *two* compositions for every section, selected by
`data-layout-*` attributes on `<body>` (the "B set"). The defaults chosen here
keep the authored gallery mosaic, curriculum atlas and manifesto footer, and
drop the story and closing B variants — their three-column and vertical-title
shapes were drawn for a two-paragraph story and a one-word title, and turn a
long-form About and a full-sentence closing into unreadable columns. The B
stylesheet blocks for those two sets were removed rather than left as dead CSS.

---

## 4. What still needs to be supplied

| Item | Where |
| --- | --- |
| **Freelance clients** — names, scope, duration, outcomes | `#lessons`, the `cv-item--open` block; currently says so explicitly |
| **Internship detail** — the CodeAlpha internship is shown only because its own public repository records it; dates beyond "2026", a manager, or a second internship would need adding | `#lessons`, first `cv-item` |
| **Certification verification URLs / IDs** | `#lessons`, `.cert-grid` — none were invented |
| **A production domain** | `app/layout.tsx` (`SITE`), `src/lib/person.ts` — currently `https://abhinavsingh.dev`, used for canonical + OG URLs |
| **A deployment target** | Vercel is assumed (see §6); the `vednix.vercel.app` link is live and verified (HTTP 200) |

Availability is stated as *open to internships, freelance work and
conversations* — no employment claim is made.

---

## 5. Run locally

```bash
cd portfolio
npm install
npm run dev            # http://localhost:3000
```

Other scripts:

```bash
npm run typecheck      # tsc --noEmit
npm run build          # production build
npm run start          # serve the build on :3000
```

---

## 6. Build & deploy

```bash
npm run build && npm run start
```

**Vercel (recommended):** import the repository, framework preset *Next.js*,
build `npm run build`, output default. Two notes:

1. set the project root to `portfolio/` if the repo holds more than this app;
2. replace `SITE` in `app/layout.tsx` with the real domain before the first
   deploy so canonical and OG URLs are correct.

**Any Node host:** `npm ci && npm run build && npm run start -- -p 3000`. The
page is fully static; only the server bundle is needed.

Cache policy is set in `next.config.ts`: the framed document revalidates, the
asset tree and the portrait are immutable for a year.

---

## 7. Accessibility & SEO

* one `<h1>`, ordered `<h2>`/`<h3>` per chapter;
* every image has an `alt` (decorative cut-outs are `aria-hidden` and `alt=""`);
* the document's own keyboard handling, focusable nav, rail buttons with
  `aria-label`s, `aria-expanded` on the menu, Escape closes it;
* reduced-motion path, and a no-WebGL fallback that keeps the page readable;
* `Person` JSON-LD, canonical URL, Open Graph and Twitter cards, a
  purpose-made 1200×630 `og.jpg` rendered from the live scene.

---

## 8. File map

```
portfolio/
  app/
    layout.tsx            metadata, JSON-LD mount, global css
    page.tsx              the single route
    globals.css           full-viewport frame host
  src/
    components/Scene.tsx          the configured <KageLandingPage />
    components/StructuredData.tsx
    lib/person.ts                 single source of the personal facts
    vendor/threeui/threeui.css
    vendor/threeui/shaders/landing-pages/
      LandingPages.tsx            KageLandingPage (registered source)
      LandingPageFrame.tsx        registered
      pageTypography.ts           registered
      pageRecipes.ts              registered
  public/
    landing-pages/kage.html                     the authored document, adapted
    landing-pages/secret-pathways-assets/       fonts, three.min.js, assets, portraits
    portrait/abhinav-portrait.webp              your photograph
    og.jpg, icon.svg
  docs/FINAL-REPORT.md
```

The one file to edit for copy is `public/landing-pages/kage.html`; the one file
to edit for SEO facts is `app/layout.tsx` and `src/lib/person.ts`.

---

## 9. Revision — temple retired, portrait and technical ground

Requested after the first delivery: remove the temple imagery, put the
portrait in the first screen with motion, and replace every other temple
surface with work/resume-related imagery.

**What changed**

* **The generated 3-D world is not built.** `JOBS` (the scene's build list) is
  empty, so `initGL`, the temple, torii, lanterns, moon, maples, haze and
  embers never run. The document's own scroll, reveal, cloth-card, rail and
  masking systems are untouched and still drive the page.
* **The renderer library is no longer shipped** — `three.min.js` (608 KB) is
  deleted and replaced by a small inert stand-in that keeps the document's
  type references resolvable. Nothing calls into it.
* **Temple assets deleted**: all 4 `generated/*.webp` plates, all 10
  `foreground/png/*.webp` cut-outs. That is 3.1 MB removed from `public/`.
* **The foreground cut-out stages** (5 `.fg` blocks, the near-plane temple
  overlays) are removed from the markup.
* **Hero is now the portrait**: `public/tech/hero-wide.webp` is a pre-composite
  of the black-tee photograph onto the page's own `#05070a`, left edge
  feathered, so it sits in the frame instead of being cropped into it. It
  drifts with a 34 s scale-and-translate (`heroDrift`), under a CSS grade that
  keeps the type legible. A tall crop (`hero-tall.webp`) takes over under
  820 px.
* **Every section below the hero** carries `public/tech/bg-grid.webp`, a
  near-invisible ruled field at 4–7 % — it reads as paper, not as neon.
* **The three work cards** now show purpose-made line-art plates:
  `card-vednix` (a multi-panel inference workspace), `card-secondthought` (a
  branching decision tree), `card-craft` (an exploded layer stack).
* **The two project dossiers** now show `proj-vednix` (eleven providers
  radiating from one core) and `proj-secondthought` (scattered fragments
  resolved into clean parallel lines).
* The floating hero preview window was retired — with the portrait already
  filling the frame, a second copy of the same face read as a mistake.

**Verified after the change** (production build, 1440×900 and 390×844): no
console errors, no failed requests, no broken images, no horizontal overflow,
one `<h1>`, all images have alt text, form and three `mailto:` links intact.
`public/` dropped from 3.8 MB to roughly 700 KB.

**To restore the temple**, restore `kage.html` from `kage.backup.html` and put
back the deleted asset folders; the original document is otherwise unchanged.

---

## 10. Revision — the opening screen is the portrait and the name

Requested after the previous revision: strip the first screen back to the
photograph, the name and the word *portfolio*. No headline, no introduction, no
call-to-action buttons, no chapter index.

**What changed**

* The whole hero block was replaced. What remains is the portrait plate, a
  single `<h1>` reading **Abhinav Singh** with *portfolio* beneath it, and a
  small scroll cue. The eyebrow, the three-line headline, the paragraph, both
  buttons and the four-chip chapter index are gone.
* The lockup sits in the calm left field of the photograph, its right inset
  sized so the name can never cross the face.
* **Motion is continuous on both layers.** The plate runs a 34-second
  scale-and-translate drift that never stops; the lockup lifts and fades across
  the first 40 % of the hero exit as the page is scrolled, so the name is gone
  before the next chapter's heading arrives.
* The hero now clips its own box (`overflow:hidden`) — without it the drift ran
  the photograph down over the About chapter.
* The lockup is centred by its box rather than by a transform, because the
  exit sequence writes its own inline `transform`; the two would otherwise
  fight and the name would jump to the top of the frame on first scroll.

**Verified** at 1440×900 and 390×844: the plate's computed transform changes
continuously (sampled across 5 s), the lockup reaches opacity 0 by 420 px of
scroll, no console errors, no failed requests, no horizontal overflow, one
`<h1>`, no overflow of the plate into neighbouring chapters.

---

## 11. Revision — the point sculpture, and the real project brands

### The opening frame is now a sculpture

The hero is a portrait made of points, sampled from two generated clay busts —
a straight-on front view and an exact 90-degree profile, both featureless,
same scale, on white. The two views are reduced to a 72 × 46 luminance grid
(13 KB of data, inline in the document) and drawn as circles on a single 2-D
canvas. There is no WebGL and no library involved.

**The scroll is one budget with three beats**, measured against a hero that is
now 150 svh tall:

| scroll | what happens |
| --- | --- |
| 0 → 58 % | the sculpture turns from the front view to the profile, the dots scattering slightly through the turn |
| 46 → 72 % | the photograph resolves up through the dots and the points shrink away |
| to the About chapter | the whole stage fades out against `#gate`'s own offset, so the portrait is gone before the next copy arrives |

The sculpture also breathes continuously when not being scrolled (a slow bob,
a lateral sway, a per-point shimmer), so the frame is never static.

### Both projects now carry their own mark

Fetched from the projects themselves, not drawn:

* `public/logos/vednix.svg` — the **neural V** mark, taken from
  `vednix.vercel.app/icon.svg`.
* `public/logos/second-thought.svg` — the **S** mark, taken from
  `second-thought/site/mark.svg` in the repository.

Both are wired into the three work cards and into their dossiers.

### Dossier copy rewritten from the live product pages

The Vednix and Second Thought dossiers now describe what those projects
actually say about themselves — Vednix's provider-powered workspace, LangGraph
research crew, hi-IN voice, FTS5 + BM25 knowledge base and file/vision intake;
Second Thought's Send interception, ~120 ms on-device decision, pass-through
rule, five-or-six questions and local-first guarantees. The "View live project"
button still points at the deployed Vednix workspace.

**Deliberately not used:** Second Thought's `site/img/*` photographs. They are
stock photographs of a different person, and using them on this portfolio would
have presented a stranger's face as the project's author or user.

### Verified

Desktop 1440×900 and mobile 390×844, production build: all four brand marks
load, one `<h1>`, six chapter anchors, no horizontal overflow, the dot-data
block parses, no console errors and no failed requests.

**Still outstanding:** the brief asked for a 1920×1080 studio portrait standing
square to the camera on plain black, and for clay busts sculpted from *that*
photograph. None of those three source files were supplied, so the sculpture is
built from the existing black-tee portrait and clay busts generated to the same
spec. Drop `photo.png`, `clay-front.png` and `clay-side.png` into the workspace
and the grids can be re-sampled from them in one pass.
