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

The browser suite in `tests/browser.mjs` uses Playwright and an installed Chrome browser. Install Playwright in your test environment or expose an existing installation through `NODE_PATH`. Set `PREVIEW_URL` to the server to test, then run `node tests/browser.mjs`. It mocks every contact submission; it never sends the test messages to the live endpoint.

## Content and assets

- Project claims and source links: `src/data/projects.js`.
- Case-study dialogs use native modal dialogs, focus restoration, Escape handling and explicit Tab boundaries.
- Both degrees are presented as education cards. Six compact image/illustration cards preserve PCB, FreeRTOS, CIFAR-10, Zhhoop, Cineplex and Efficycle work under the featured case studies.
- A single contact Spline scene is dynamically imported only when visible on desktop, with pause/resume, offscreen/background pausing, touch opt-in and a reduced-motion still view. Its optional runtime is substantially larger than the main page bundle; it is not part of the initial page load.
- Contact transport requires HTTP and application success and aborts after 12 seconds.
- `public/site` is the only public asset directory. Original legacy assets elsewhere under `public` are not included in the build.
- The reviewed German CV is `public/site/resume-de.pdf`. No English translation is offered.
- Locate-IQ's screenshot shows its public frontend running offline with repository sample records. Its connection label was clarified for the screenshot. No employer database was used.
- Automotive chart values come from the repository's stored synthetic sample, also available as `quality-sample.json`. They are not live factory results.
- Private attachments, source inspection checkouts and local review artifacts belong in ignored `.local-review`, never in public assets.

## Deployment

Keep the existing `anshaj` Vercel project and React/Vite setup. Use a reviewed non-production preview before any production release. The local branch is `codex/portfolio-phase-one`. No production deployment is authorized by a preview request.

## Verification scope

The Phase 1 checks cover desktop/tablet/mobile layouts down to 320 px, a 200% content zoom check, reduced motion, keyboard navigation, filters, dialogs, the CV payload, metadata and mocked contact success/failure/timeout states. These checks do not prove delivery through the live Google Apps Script endpoint.

The 10-project demonstration backlog and CV-engine/LinkedIn changes are separate phases.
