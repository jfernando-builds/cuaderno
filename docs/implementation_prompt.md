# First-Proof Pilot Economics — Implementation Plan

## Implementation stages

1. **Packet before code:** document target user, workflow, economics, guardrails, mockup, tests, and evidence boundaries in `PACKET.md`.
2. **Typed calculation core:** implement pure TypeScript input bounds, deterministic cost formulas, three review-time scenarios, and tested fictional defaults.
3. **Responsive dashboard:** build editable controls, baseline cost/gap summary, feasibility states, scenario comparison, proposed stop rules, and explicitly simulated explanation.
4. **Mechanical and persona testing:** run production build and interaction checks, exercise invalid input and edge cases, walk the UI as a skeptical time-constrained owner, log an actual observed bug, and fix the most serious usability issue.
5. **Release:** commit scoped changes without overwriting existing work, push the existing repository, deploy v1, apply and verify a documented fix, then deploy v2 if deployment access is available. Record actual URLs and outcomes only.
6. **Deliverables:** update decisions/persona documentation, generate PDFs from final real documents and available transcript only when tools/data permit, and give a concise three-minute demo plus 30-second reflection recording guide.

## Acceptance criteria

- Existing Next.js project and user work remain intact; no new repo is created.
- Next.js, TypeScript, Tailwind CSS; professional, responsive English SaaS interface.
- Defaults: 12 candidates and 3 employers; review minutes and hourly MXN rate, total budget, and per-employer willingness to pay are editable.
- Deterministic calculation: total cost = candidates × minutes / 60 × hourly cost; unit costs divide by candidates/employers; budget gap = budget − total cost; willingness gap = employers × per-employer willingness − total cost.
- Optimistic, baseline, pessimistic scenarios use disclosed review-time assumptions; feasibility indicators separate budget coverage and willingness-to-pay coverage.
- Inputs have sensible bounds and accessible validation; invalid results, NaN, and Infinity are never displayed.
- AI explanation is either provided by a protected server integration or clearly labeled simulated; no secrets in source, browser, or Git.
- Fictional data only; no personal data persistence without authentication and Row Level Security.
- No CV builder, job board, candidate fees, universal employability score, automatic ranking/rejection, or unpaid productive client work.
- Every future proof requires bounded task, rubric, AI disclosure, live revision/explanation, and named human reviewer; candidate sees/corrects/exports results first and authorizes sharing; unsuccessful attempts remain private.
- Stop rules are proposed and explicitly not validated: fewer than 2/3 employers willing to pay again, median review >10 min, no useful additional hiring evidence.
- Build passes; actual bug and persona findings are documented without fabricated screenshots or outcomes.
- At least five meaningful commits and two verified deployments only if GitHub/Vercel access permits; otherwise report blockers honestly.

## Commit plan

1. `docs: add First-Proof packet before code` — packet and original SVG mockup.
2. `feat: add typed pilot economics model` — domain types, validation, scenario logic, fictional defaults, tests.
3. `feat: build responsive First-Proof dashboard` — accessible controls, KPI cards, scenario visualization, guardrails.
4. `docs: record decisions and persona walkthrough` — decisions, actual persona observations, observed bug.
5. `fix: resolve verified usability or calculation bug` — targeted fix and regression test.
6. `docs: record release evidence` — only real commit/deploy URLs, tests, and transcript-derived deliverables.

Commit only intended files. Preserve unrelated existing changes. Do not claim any commit, push, test, generated image, PDF, or deployment that did not actually occur.

---

# Archived prior implementation prompt
