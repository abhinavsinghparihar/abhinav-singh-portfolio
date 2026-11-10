# Abhinav Singh — portfolio

The ThreeUI **Kage** experience, rebuilt as a personal portfolio: a live Three.js
night temple that carries the work, the stack and the person.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production
npm run start
```

* **The component:** `src/components/Scene.tsx` renders `<KageLandingPage />` with
  the configured typography props, inside a full-viewport `.shader-frame`.
* **The page itself:** `public/landing-pages/kage.html` — the authored Kage
  document, adapted (hero, About with the portrait, project dossiers, the
  practice atlas, contact form, footer) and served byte-for-byte inside a
  sandboxed frame by `LandingPageFrame`.
* **Your photograph:** `public/portrait/abhinav-portrait.webp`.
* **Facts in one place:** `src/lib/person.ts` (links, education, JSON-LD) and
  `app/layout.tsx` (metadata, OG image).
* **Still to fill in:** the freelance clients block and certification URLs —
  see `docs/FINAL-REPORT.md` §4.

Full notes, verification results and deployment steps: [`docs/FINAL-REPORT.md`](docs/FINAL-REPORT.md).
