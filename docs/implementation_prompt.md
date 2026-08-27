# WEEK 3 — IMPLEMENTATION PROMPT

Build a small, testable web app for a pre-payment counterparty consistency workflow for small Mexican businesses that transact through WhatsApp.

The app must follow the Week 3 packet and preserve uncertainty at all times.

## Core User

María, 54 years old, informal food seller in Mexico.

She mainly uses WhatsApp, reads slowly, is uncomfortable with complex apps, and distrusts automated financial decisions.

## Main Goal

Before making a payment, María should be able to:

 1.⁠ ⁠Upload one screenshot or image related to a proposed payment.
 2.⁠ ⁠Enter the name or identifier of the person she expects to pay.
 3.⁠ ⁠Receive a bounded result:
   - Consistent
   - Inconsistent
   - Insufficient
 4.⁠ ⁠See exactly what information was compared.
 5.⁠ ⁠Decide what to do next.

The app must NEVER say that a person is safe, trusted, fraudulent, verified, or suspicious.

## Required Features

### Feature 1 — Upload Evidence
•⁠  ⁠Accept image files only.
•⁠  ⁠Validate file type.
•⁠  ⁠Reject invalid files.
•⁠  ⁠Show a simple preview.

### Feature 2 — Expected Counterparty
•⁠  ⁠One text input.
•⁠  ⁠Maximum length of 80 characters.
•⁠  ⁠Reject empty input.

### Feature 3 — Vision Analysis
•⁠  ⁠Use a vision-capable model to extract visible information from the uploaded image.
•⁠  ⁠Extract only information actually visible in the screenshot.
•⁠  ⁠Do not invent missing information.

### Feature 4 — Comparison
Compare:
•⁠  ⁠User-entered expected name or identifier.
•⁠  ⁠Information extracted from the image.

Return exactly one status:
•⁠  ⁠Consistent
•⁠  ⁠Inconsistent
•⁠  ⁠Insufficient

### Feature 5 — Bounded Explanation

For Consistent:
Explain what matches, but state that the match does not prove the person is safe or trustworthy.

For Inconsistent:
Show the specific difference and state that the difference does not prove fraud.

For Insufficient:
Explain what information is missing and state that missing information does not make the person suspicious.

### Feature 6 — Next Action

Show simple options such as:
•⁠  ⁠Check another way
•⁠  ⁠Upload another image
•⁠  ⁠Continue anyway

Do not automatically block or approve any payment.

## UI Requirements

Keep the interface very simple.

Main title:
“Check before you pay”

Suggested flow:

 1.⁠ ⁠Upload screenshot
 2.⁠ ⁠Enter expected name
 3.⁠ ⁠Compare information
 4.⁠ ⁠Read result
 5.⁠ ⁠Choose next action

Use large buttons, short text, and clear labels.

## Security Requirements

•⁠  ⁠No API keys in source code.
•⁠  ⁠Use environment variables.
•⁠  ⁠Do not permanently store uploaded images.
•⁠  ⁠Do not use real personal data in demo content.
•⁠  ⁠Validate all form inputs.
•⁠  ⁠Clearly label simulated AI output if any AI result is simulated.

## Acceptance Criteria

The build is acceptable when:

 1.⁠ ⁠The app loads at a public URL.
 2.⁠ ⁠An image can be uploaded.
 3.⁠ ⁠Invalid input is rejected.
 4.⁠ ⁠A name can be entered.
 5.⁠ ⁠The system returns Consistent, Inconsistent, or Insufficient.
 6.⁠ ⁠The explanation shows what was compared.
 7.⁠ ⁠The app never gives a trust score or fraud judgment.
 8.⁠ ⁠No secret is exposed in GitHub.
 9.⁠ ⁠The interface can be used without instructions.
10.⁠ ⁠The app works on desktop and mobile widths.

## Commit Plan

Commit 1:
Packet before code.

Commit 2:
Create basic Week 3 interface.

Commit 3:
Add image upload and input validation.

Commit 4:
Add comparison logic and bounded result states.

Commit 5:
Fix test bug and improve usability after persona test.

Use at least two Vercel deploys during the process.

## Build Priority

Keep the product small.

Do not add:
•⁠  ⁠Authentication unless personal data is stored.
•⁠  ⁠Database unless necessary.
•⁠  ⁠WhatsApp API integration.
•⁠  ⁠Payment processing.
•⁠  ⁠Fraud scoring.
•⁠  ⁠Deepfake detection.
•⁠  ⁠Government or bank verification.

The goal is to test the minimum viable workflow, not to build a complete verification platform.
