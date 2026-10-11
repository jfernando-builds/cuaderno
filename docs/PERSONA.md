# Persona Walkthrough — First-Proof Pilot Economics

**Persona used:** Simulated Mexican small-business owner; not an interviewed participant.  
**Test mode:** Local and public Vercel browser walkthroughs of the actual interface at 390 × 844 and 320 px mobile widths, using fictional demo values. No screenshot is represented as user research.

## Persona

Lucía runs a small neighborhood bakery in Mexico and is considering a small hiring pilot. She is skeptical that technology will make hiring decisions fairly, has little time between customers, and wants a plain answer to: “Will the review work fit our budget?” She does not want to upload candidate details or let software rank people.

## Walkthrough and observed checks

1. **Understand the page:** The title asks whether the pilot fits the budget. The demo-data pill, “No sign-in · No data saved” header, and guardrail that costs are not hiring evidence make the scope and privacy boundary visible.
2. **Read the starting estimate:** With 12 candidates, 3 employers, 10 review minutes, and $180 MXN/hour, the interface showed $360 MXN total, $30 per candidate, $120 average per employer, and a $140 budget remainder against $500. The willingness-to-pay example was $250 per employer; aggregate fictional willingness was $750.
3. **Try a constrained budget:** Changing total budget to $300 correctly changed the status to “OVER PILOT BUDGET” and the gap to a $60 overage. Before the copy fix, the UI displayed a negative “Budget remaining” amount, which took an extra interpretation step for a time-pressed owner. It now says “Over budget by $60 MXN.”
4. **Check the range and recovery:** Entering 1.5 candidates displayed “Enter a whole number” and withheld the estimate instead of calculating invalid values. “Reset demo” restored 12 candidates and the $360 estimate.
5. **Check mobile fit:** At 390 px wide, the rendered document had no horizontal overflow. The form, estimate, scenarios, stop rules, and safeguards remained present in the accessible page snapshot.
6. **Understand uncertainty:** The scenario cards identify 25% less time, baseline, and 50% more time as planning assumptions. The three stop rules are explicitly marked proposed/not validated. The explanation states that it is simulated and not connected AI.
7. **Public release validation:** The public Vercel version loaded successfully with HTTP 200. At 320 px there was no horizontal overflow. Changing the budget to $300 MXN displayed “OVER PILOT BUDGET” and “Over budget by $60 MXN.”

## Observed usability issue and fix

**Actual release-blocking bug:** The first live browser screenshot rendered default browser fonts and unstyled form controls. The root layout had no import for the new global stylesheet, so the app lacked its intended responsive SaaS presentation. This was discovered during the real local persona walkthrough and reproduced by observing the browser screenshot; the root layout now imports the stylesheet. After reloading, the dashboard rendered with the intended cards, spacing, controls, colors, and responsive layout.

**Additional clarity improvement:** Negative budget and willingness-to-pay gaps were initially displayed as unexplained signed currency values. After the $300 budget experiment showed “Budget remaining −$60 MXN,” the labels were changed to explicit “Over budget by $60 MXN” and “Willingness-to-pay shortfall $…”. This removes mental arithmetic for a busy, skeptical owner.

**Actual version-one regression found in the public UI:** Entering a fractional but permitted budget of $500.50 recalculated the estimate correctly, but the browser reported `stepMismatch` because the field declared `step=1`. This discrepancy could make valid MXN centavo input appear invalid to browser assistance or later form validation. Version two changes financial fields to centavo precision (`step=0.01`) and review minutes to `step="any"`, matching the domain validator; head counts remain whole-number-only.

## Outcome and limitations

The simulated persona could identify the baseline cost and determine whether the entered budget covered it without encountering candidate data fields or an automated hiring decision. Mechanical browser checks verified displayed states, native input constraints, and mobile overflow only; they do not establish usability with actual business owners, hiring value, willingness to pay, or validated stop thresholds. No human user was interviewed.
