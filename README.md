# Anshaj Malhotra — Engineering Portfolio

React + Vite portfolio for IoT, embedded systems and industrial applications, with a focus on Werkstudent and Master's thesis opportunities around Karlsruhe.

## Develop and verify

```sh
npm ci
npm run dev
npm run lint
npm test
npm run build
npm run preview
```

The browser suite in `tests/browser.mjs` uses Playwright and an installed Chrome browser. Set `PREVIEW_URL` to the server to test, then run `node tests/browser.mjs`. Automated checks never send email.

## Content and assets

- Project claims and source links: `src/data/projects.js`.
- Case studies have shareable `#project/locate`, `#project/rtls` and `#project/quality` links, with native modal dialogs, focus restoration, Escape handling and Tab boundaries.
- Three featured projects precede professional experience; six additional project cards follow it. Education and language details are in About.
- The v2 design uses an off-white editorial layout, charcoal text and cobalt accents. A single stylesheet defines shared colors, spacing and responsive layouts; case-study demos share those tokens. Manrope is bundled locally, and the old circuit backdrop is retired.
- Contact posts URL-encoded name, email and message fields to the owner's public Google Apps Script web app. Success is shown only after its JSON acknowledgment; a 15-second timeout and failures retain the message and offer an email-draft fallback. The destination spreadsheet remains private. `google-apps-script/Code.gs` contains the bound sheet handler with input validation and formula-injection protection.
- `public/site` is the only public asset directory. Original legacy assets elsewhere under `public` are not included in the build.
- German and English CVs are `public/site/resume-de.pdf` and `public/site/resume-en.pdf`. The English version translates the German source without adding dates or achievements.
- Locate-IQ is presented only as an employer-work case study with an offline sample interface. No source link, employer code or employer database is published.
- Automotive chart values come from the repository's stored synthetic sample, also available as `quality-sample.json`. The interactive explorer filters sample periods and compares defect rates with a visitor-selected review threshold; it does not change source measurements or represent a factory system.
- Private attachments, source inspection checkouts and local review artifacts belong in ignored `.local-review`, never in public assets.

## Deployment

Keep the existing `anshaj` Vercel project and React/Vite setup. Use a reviewed non-production preview before any production release. The local branch is `codex/portfolio-phase-one`. No production deployment is authorized by a preview request.

## Verification scope

Checks cover desktop/tablet/mobile layouts down to 320 px, reduced motion, navigation, shareable case studies, interactive sample calculations, both CV payloads, contact transport and fallback encoding, mocked browser submission states, and sheet-handler validation. Automated suites do not write to the live spreadsheet. Real integration checks use clearly labelled owner-requested test entries.

The 10-project demonstration backlog and CV-engine/LinkedIn changes are separate phases.
