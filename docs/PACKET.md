# WEEK 2 — BUSINESS BENDING PACKET

## 1. Problem in My Words

Many people in Mexico have real economic activity that is poorly represented by traditional credit records. The problem is not simply a lack of data. People may already have receipts, transaction records, supplier documents, or other evidence, but this information can be fragmented and difficult to present clearly.

My product will organize this evidence without turning it into a credit score or a hidden judgment about the person.

## 2. Exact User

The user is an applicant in Mexico whose economic activity is not well represented by traditional credit records and who has evidence of that activity that needs to be organized and made understandable.

The applicant stays in control: they can see the evidence, its source, what is shared, and they can correct or contest information.

## 3. Success Definition

Before the module closes, a user can provide a sample economic document, have the system extract and organize information from it, see where each extracted fact came from, identify uncertain information, correct the extracted information, and create a clear evidence package.

The prototype succeeds only if it does this without calculating a credit score, trust score, probability of default, credit eligibility, or approval recommendation.

## 4. Image-Generated Mockup
![Evidence Organizer Mockup](mockup.png.jpeg)
## 5. Feature Flow

´´´⁠mermaid
flowchart TD
    A[User uploads evidence] --> B[System validates input]
    B --> C[AI extracts information]
    C --> D[System shows extracted facts and sources]
    D --> E[User reviews evidence]
    E --> F{Is the information correct?}
    F -- No --> G[User corrects information]
    G --> E
    F -- Yes --> H[Create Evidence Package]
    H --> I{Material uncertainty?}
    I -- Yes --> J[Send to human review]
    I -- No --> K[Evidence Package ready]
´´´

## 6. Swimlane
 ⁠flowchart LR
    subgraph USER[User]
        U1[Upload evidence]
        U2[Review extracted facts]
        U3[Correct information]
        U4[Create Evidence Package]
    end

    subgraph SYSTEM[System]
        S1[Validate input]
        S2[Show facts and sources]
        S3[Prepare package]
    end

    subgraph AI[AI]
        A1[Extract information]
        A2[Flag uncertainty]
    end

    subgraph REVIEWER[Human Reviewer]
        R1[Review uncertain evidence]
    end

    U1 --> S1
    S1 --> A1
    A1 --> A2
    A2 --> S2
    S2 --> U2
    U2 --> U3
    U3 --> S2
    U2 --> U4
    U4 --> S3
    S3 --> R1

    ## 7. Benchmark

The best existing solutions I found are Plaid, Nova Credit Cash Atlas, and Experian Boost. They already use financial or consumer-permissioned data to make information that traditional credit records may miss more useful.

Mine differs by focusing on applicant-controlled evidence for the Mexican context. Instead of creating another score, it organizes fragmented evidence, keeps the source of each fact visible, flags uncertainty, and allows the applicant to correct and control what is shared.

## 8. Long View

If this slice works, in three years the product could become an applicant-controlled evidence infrastructure for people whose economic activity is poorly represented by traditional credit records. Users could organize different types of economic evidence, understand where every fact comes from, correct mistakes, and control what they share. Institutions could review clearer evidence without turning fragmented personal data into an opaque trust score.

## 9. Scope Cut

This week I am NOT building:

•⁠  ⁠A credit score or trust score.
•⁠  ⁠A credit approval or rejection recommendation.
•⁠  ⁠A probability of default model.
•⁠  ⁠Automatic authenticity verification.
•⁠  ⁠Bank integrations.
•⁠  ⁠A complete lending platform.
•⁠  ⁠Social graph, family, contacts, messages, or relationship analysis.
•⁠  ⁠Postal code or neighborhood-based trust judgments.
•⁠  ⁠Fully automated decisions when material uncertainty exists.

## 10. Architecture + Stack

| Component | Tool | Purpose |
| --- | --- | --- |
| Frontend | Next.js | Build the user interface |
| Hosting | Vercel | Deploy the live prototype |
| Database | Supabase | Store structured evidence |
| Authentication | Supabase Auth | Protect user data |
| AI | LLM | Extract and organize information |
| Repository | GitHub | Version control and commit history |
| Development | VS Code | Build and edit the project |

## 11. Test Plan

 1.⁠ ⁠Upload a valid sample evidence file and confirm the system accepts it.
 2.⁠ ⁠Confirm the AI extracts structured information from the sample evidence.
 3.⁠ ⁠Confirm every extracted fact shows its source.
 4.⁠ ⁠Correct an extracted fact and confirm the correction is saved.
 5.⁠ ⁠Confirm uncertain information is clearly flagged.
 6.⁠ ⁠Confirm material uncertainty is sent to human review instead of being automatically decided.
 7.⁠ ⁠Create an Evidence Package and confirm it contains the reviewed information.
 8.⁠ ⁠Confirm the product never displays a credit score, trust score, probability of default, eligibility decision, or approval recommendation.
 9.⁠ ⁠Test invalid input and confirm the form rejects it safely.
10.⁠ ⁠Confirm user data cannot be accessed by another user.

