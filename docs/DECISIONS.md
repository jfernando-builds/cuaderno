# First-Proof Pilot Economics — Decisions

## Product and implementation decisions

1. **Preserve the existing workspace.** Implement the pilot dashboard at the existing Next.js app root under `docs/`; retain other existing routes and work.
2. **Keep the calculation core deterministic.** Use a pure TypeScript module with bounded inputs and an independently testable economics function. Do not have AI calculate or adjust values.
3. **Separate employer affordability dimensions.** Report pilot-budget gap and aggregate stated willingness-to-pay gap independently. Display unit cost per candidate and average cost per employer; neither is a hiring outcome.
4. **Use scenario multipliers, not fabricated observations.** Optimistic review time is 0.75×, baseline 1×, and pessimistic 1.5×. These are explicit planning assumptions, not empirical confidence intervals or findings.
5. **Label the explanation honestly.** No AI provider is configured. The current explanation is deterministic copy explicitly labeled “Simulated AI explanation”; no secret, API call, or candidate evidence is involved.
6. **Keep the demo stateless.** Inputs remain in the page's in-memory React state, with fictional defaults and no candidate/employer records, database, or persistence.
7. **Keep feasibility narrow.** “Within/over pilot budget” and the employer willingness indicator measure only the entered arithmetic. Neither claims that the pilot is good, fair, predictive, or worth doing.
8. **Human judgment remains mandatory.** Every future proof needs a bounded task, rubric, AI disclosure, live revision/explanation, and named human reviewer. No score, candidate rank, or automated rejection is part of this tool.
9. **Disclose the first live UI defect.** During browser walkthrough, missing global CSS import caused unstyled rendering. Importing the global stylesheet fixed the observed defect. Negative currency gap labels were also made explicit for quick comprehension.
10. **Deployment and evidence require actual access.** The preconfigured repository points at the existing Vercel project. Only successful push/deployment responses and public smoke checks will be reported as completed.
11. **Match browser and domain validation.** Production persona testing showed that the browser's integer `step=1` rejected fractional centavo inputs even though deterministic calculations accepted them. Financial fields now use 0.01 increments and minutes allow fractional values; candidate/employer counts remain integers.

## Verified calculation definitions

- Total review cost = candidates × review minutes ÷ 60 × reviewer hourly cost.
- Cost per candidate = total review cost ÷ candidate count.
- Average cost per employer = total review cost ÷ employer count.
- Budget remaining = pilot budget − total review cost.
- Aggregate willingness to pay = employer count × stated willingness per employer.
- Willingness-to-pay gap = aggregate willingness to pay − total review cost.

Gaps at or above zero indicate arithmetic coverage only. Defaults are synthetic: 12 candidates, 3 employers, 10 minutes each, $180 MXN/hour, $500 MXN pilot budget, and $250 MXN stated willingness per employer.

## Security and Blueprint boundary

No secret is shipped, no personal information is requested or stored, and no candidate fee or unpaid productive task is modeled. Private submissions require candidate permission for employer reuse. Candidates must receive results first, correct errors, export evidence, and choose each sharing action; unsuccessful attempts remain private. Any actual productive client work requires agreed compensation, supervision, scope, acceptance rules, and applicable labor protections. Proposed stop thresholds (<2 of 3 willing to pay again; median review >10 minutes; no useful additional evidence) are not validated findings.
