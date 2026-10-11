# First-Proof Release Evidence

## Source and final URL

- GitHub repository: https://github.com/jfernando-builds/cuaderno
- Pushed branch: `main`
- Final production alias: https://cuaderno-taupe.vercel.app
- Vercel project: `cuaderno`
- Final production response: unauthenticated `curl -I` returned HTTP 200; the page was also opened in the browser and its controls exercised.

## Deployment sequence

1. **V1:** `https://cuaderno-4ntoq8kd9-jfernando-builds-projects.vercel.app` (production alias: `https://cuaderno-taupe.vercel.app`). The public UI loaded, rendered its baseline $360 MXN estimate, and showed an over-budget state when the fictional budget was changed to $300.
2. **V2:** `https://cuaderno-5uffjyhqz-jfernando-builds-projects.vercel.app` (same production alias). Released after the public test found that decimal budget values calculated but HTML `step=1` marked them natively invalid. V2 uses centavo precision for MXN inputs and fractional review minutes, and was checked on the public alias.
3. **Security patch:** `https://cuaderno-ro8g80eu2-jfernando-builds-projects.vercel.app` (same production alias). After `npm audit fix`, the app was upgraded to Next.js 16.4.0, the production dependency audit reported 0 vulnerabilities, all six tests and the production build passed, and the alias returned HTTP 200.

An additional CLI invocation from the nested `docs/` folder deployed to the separately linked existing `cuaderno-week6` Vercel project (`https://cuaderno-week6.vercel.app`). That is not the First-Proof deliverable URL; the correct app was separately deployed to `cuaderno` as V2 above.

## Verified checks

- `npm test`: 6 passing deterministic calculation/regression tests.
- `npm run typecheck`: passed.
- `npm run build`: passed; static routes `/`, `/week5`, and `/week6` generated.
- Public HTTP smoke: `curl -I https://cuaderno-taupe.vercel.app` returned HTTP/2 200.
- Public UI: 12 candidates, 3 employers, 10 minutes/candidate, $180 MXN/hour resulted in $360 total, $30 per candidate, $120 per employer, $140 budget remaining, and $390 willingness-to-pay surplus.
- Public UI at 320 px width: no horizontal overflow.
- Regression before fix: $500.50 budget was accepted by the calculation but `validity.stepMismatch` was true.
- V2 regression after fix: $500.50 budget and 7.5 review minutes both had `validity.stepMismatch === false`; estimate recalculated.
- Mobile validation: fractional employer count 1.5 displays the whole-number error, suppresses invalid estimates, and reset restores defaults.
- Secret and personal-data boundary: no AI key, candidate record, API, or persistence added; explanation is explicitly simulated.

## Commit sequence

- `a3a1452` — `docs: add First-Proof economics packet before code`
- `f56d110` — `feat: add typed pilot economics model`
- `cf3ab38` — `feat: build responsive First-Proof economics dashboard`
- `237ad92` — `docs: record production persona and decisions`
- `3e1d581` — `fix: align native numeric steps with valid precision`
- `7bc7815` — `fix: update vulnerable transitive dependencies`

All six First-Proof feature, persona, bug-fix, and security commits were pushed to `origin/main`; earlier local commits already ahead of the remote were also pushed. Uncommitted pre-existing Week 5/Week 6 workspace files remain uncommitted and were not added by this release.

## Assignment files

- PDFs were generated from the real Markdown packet, persona walkthrough, and session record: `PACKET_JoseFernando.pdf`, `PERSONA_JoseFernando.pdf`, and `BUILDCHAT_JoseFernando.pdf`.
- `BUILDCHAT_JoseFernando.pdf` is transparently labeled a session record, not a verbatim transcript, because the only available debug log has a session-start event and no serialized chat turns.
- Recording instructions for the requested three-minute walkthrough and 30-second reflection are in `DEMO.md`. The MP4 has not been recorded or generated.
