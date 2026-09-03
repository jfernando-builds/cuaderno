# PACKET — SkillBridge MX

## 1. Problem in My Words

Many Mexican university students learn useful skills but have difficulty proving those skills to employers. A degree or CV shows what a student studied, but not always what the student can actually do.

SkillBridge MX helps students demonstrate a skill through a short practical challenge and connects that evidence to internship opportunities.

## 2. Exact User

A Mexican university student looking for a first internship or entry-level opportunity who has limited professional experience but has useful skills that are difficult to demonstrate on a traditional CV.

## 3. Success Definition

Before the module closes, a student can complete one short skill challenge, receive a structured AI-assisted assessment, see a Skill Card with the result, and view a simulated internship matched to the demonstrated skill.

## 4. Image-Generated Mockup

The mockup shows a simple student dashboard with:

•⁠  ⁠Student profile
•⁠  ⁠Business Analysis challenge
•⁠  ⁠Skill assessment
•⁠  ⁠Verified Skill Card
•⁠  ⁠Internship match
•⁠  ⁠Clear human-review warning when AI confidence is low

The interface is Spanish-first, simple, and designed for university students.

## 5. Feature Flow

⁠ mermaid
flowchart TD
    A[Student opens SkillBridge MX] --> B[Completes short skill challenge]
    B --> C[AI evaluates response]
    C --> D{Confidence sufficient?}
    D -->|Yes| E[Create Verified Skill Card]
    D -->|No| F[Needs Human Review]
    E --> G[Match skill with internship]
    F --> H[No automatic verification]
    G --> I[Student chooses whether to explore opportunity]
 ⁠

## 6. Actor Flow

⁠ mermaid
sequenceDiagram
    participant Student
    participant System
    participant AI
    participant Human

    Student->>System: Completes skill challenge
    System->>AI: Sends answer and assessment criteria
    AI->>System: Returns structured assessment

    alt High confidence
        System->>Student: Shows Skill Card
        System->>Student: Shows matching opportunity
    else Low confidence
        System->>Human: Flags result for review
        System->>Student: Shows Needs Human Review
    end

    Student->>System: Chooses whether to explore opportunity
 ⁠

## 7. Benchmark

The best existing solution on Earth for this is Forage, which lets students practice employer-designed job tasks and demonstrate career interest.

SkillBridge MX differs by turning a short skill assessment into a structured skill profile that can be matched directly with internships for Mexican university students.

## 8. Three-Year Long View

In three years, SkillBridge MX could become a skills-to-opportunity platform used by Mexican universities and employers. Students could build verified profiles from multiple practical assessments while employers define skills they actually need. The platform would help students discover opportunities without allowing AI to decide their educational or professional future.

## 9. Scope Cut

This week I am NOT building:

•⁠  ⁠A complete hiring platform
•⁠  ⁠A generic AI tutor
•⁠  ⁠Multiple assessments
•⁠  ⁠Real employer integrations
•⁠  ⁠Automatic hiring decisions
•⁠  ⁠A complex recommendation algorithm
•⁠  ⁠Permanent AI certification without human review

The working slice tests only one complete path from skill challenge to opportunity.

## 10. Architecture + Stack

| Component       | Tool                                     |
| --------------- | ---------------------------------------- |
| Frontend        | Next.js                                  |
| Hosting         | Vercel                                   |
| Structured data | JSON / Supabase                          |
| AI assessment   | LLM                                      |
| Repository      | GitHub                                   |
| Authentication  | Supabase Auth if personal data is stored |

The AI assessment returns structured fields including skill, score, level, confidence, and verification status.

## 11. Security Floor

No API keys will be stored in the repository.

Any API keys will use Vercel environment variables.

No real personal information will appear in the demo.

All demo students and employers will be fictional.

User inputs will have length and type validation.

If personal user information is stored, authentication and Supabase Row Level Security will be enabled.

Low-confidence AI assessments will not automatically become verified skills.

## 12. Blueprint Conditions

The product connects demonstrated skills to opportunities instead of simply explaining educational content.

AI does not independently make high-stakes decisions.

Low-confidence assessments require human review.

Missing information is not interpreted as low ability.

The system recommends opportunities but the student decides whether to pursue them.

## 13. Test Plan

### Test 1 — Normal assessment

Submit a valid response.

Expected result: the system generates a structured skill assessment and Skill Card.

### Test 2 — Empty response

Submit the challenge without an answer.

Expected result: the system blocks submission and asks the user to enter a response.

### Test 3 — Low-confidence assessment

Trigger a simulated uncertain result.

Expected result: the system displays “Needs Human Review” instead of automatically verifying the skill.

### Test 4 — Opportunity match

Complete a successful assessment.

Expected result: at least one simulated internship appears based on the demonstrated skill.

### Test 5 — Shadow Clause

Review the opportunity recommendation.

Expected result: the interface makes clear that the student chooses whether to explore the opportunity and the AI does not choose a career for the student.
![SkillBridge MX Mockup](mockup_week4.jpg)
