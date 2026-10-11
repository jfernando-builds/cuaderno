"use client";

import { useMemo, useState } from "react";
import {
  calculateEconomics,
  DEFAULT_INPUTS,
  FIELD_LABELS,
  validateInputs,
  type PilotField,
  type PilotInputs,
} from "../lib/pilot-economics";

const moneyFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

function money(value: number): string {
  const sign = value < 0 ? "−" : "";
  return `${sign}$${moneyFormatter.format(Math.abs(value))}`;
}

const currencyFields: { key: PilotField; max: number }[] = [
  { key: "reviewerHourlyCost", max: 10000 },
  { key: "pilotBudget", max: 10000000 },
  { key: "willingnessToPayPerEmployer", max: 1000000 },
];

const fields: { key: PilotField; max: number; step: number | "any"; prefix?: string; suffix?: string }[] = [
  { key: "candidates", max: 1000, step: 1 },
  { key: "employers", max: 100, step: 1 },
  { key: "reviewMinutes", max: 120, step: "any", suffix: "min" },
  ...currencyFields.map(({ key, max }) => ({ key, max, step: 0.01, prefix: "$", suffix: "MXN" })),
];

const scenarioDetails = [
  { id: "optimistic", description: "25% less time" },
  { id: "baseline", description: "Expected review time" },
  { id: "pessimistic", description: "50% more time" },
] as const;

function Field({
  field,
  value,
  error,
  onChange,
}: {
  field: (typeof fields)[number];
  value: number;
  error?: string;
  onChange: (key: PilotField, value: string) => void;
}) {
  const id = `input-${field.key}`;
  const errorId = `${id}-error`;
  return (
    <div className="field">
      <label className="field-label" htmlFor={id}>
        <span>{FIELD_LABELS[field.key]}</span>
      </label>
      <div className="field-control">
        {field.prefix && <span className="field-prefix" aria-hidden="true">{field.prefix}</span>}
        <input
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          inputMode="decimal"
          type="number"
          min={field.key === "pilotBudget" || field.key === "willingnessToPayPerEmployer" ? 0 : field.key === "reviewerHourlyCost" ? 1 : 1}
          max={field.max}
          step={field.step}
          value={Number.isFinite(value) ? value : ""}
          onChange={(event) => onChange(field.key, event.currentTarget.value)}
        />
        {field.suffix && <span className="field-suffix" aria-hidden="true">{field.suffix}</span>}
      </div>
      {error ? <p className="field-error" id={errorId}>{error}</p> : null}
    </div>
  );
}

export default function Home() {
  const [inputs, setInputs] = useState<PilotInputs>(DEFAULT_INPUTS);
  const [emptyFields, setEmptyFields] = useState<Partial<Record<PilotField, boolean>>>({});

  const errors = useMemo(() => validateInputs(inputs), [inputs]);
  const economics = useMemo(() => {
    if (Object.keys(errors).length > 0) return null;
    return calculateEconomics(inputs);
  }, [errors, inputs]);
  const visibleErrors = { ...errors };
  for (const key of Object.keys(emptyFields) as PilotField[]) {
    if (emptyFields[key]) visibleErrors[key] = "Enter a number to continue.";
  }

  function changeInput(key: PilotField, rawValue: string) {
    if (rawValue.trim() === "") {
      setEmptyFields((current) => ({ ...current, [key]: true }));
      setInputs((current) => ({ ...current, [key]: Number.NaN }));
      return;
    }
    const value = Number(rawValue);
    setEmptyFields((current) => ({ ...current, [key]: false }));
    setInputs((current) => ({ ...current, [key]: value }));
  }

  function resetInputs() {
    setInputs(DEFAULT_INPUTS);
    setEmptyFields({});
  }

  return (
    <>
      <header className="topbar">
        <a className="brand" href="#main" aria-label="First-Proof Pilot Economics home">
          <span className="brand-mark" aria-hidden="true">
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none"><path d="m5 12 4.2 4.2L19.5 6.8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 2.7 21 6v5.5c0 5.1-3.6 8.4-9 10.5-5.4-2.1-9-5.4-9-10.5V6l9-3.3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
          </span>
          <span><span className="brand-name">First-Proof</span><span className="brand-subtitle">PILOT ECONOMICS</span></span>
        </a>
        <div className="topbar-note"><span className="status-dot" />No sign-in · No data saved</div>
      </header>

      <main id="main" className="page-shell">
        <div className="page-heading">
          <div>
            <p className="eyebrow">EMPLOYER PILOT · MEXICO</p>
            <h1>Can this pilot fit your budget?</h1>
            <p className="page-description">Estimate the human review time and compare it with what employers can spend.</p>
          </div>
          <span className="fictional-pill"><span />Fictional demo data</span>
        </div>

        <aside className="guardrail-banner" aria-label="Important pilot limitations">
          <span className="guardrail-icon" aria-hidden="true">i</span>
          <p><strong>Costs are not hiring evidence.</strong> This estimate helps plan reviewer time only. It never scores, ranks, or rejects candidates; a named human reviewer must assess every proof.</p>
        </aside>

        <div className="dashboard-grid">
          <section className="card assumptions-card" aria-labelledby="assumptions-title">
            <div className="card-heading">
              <div><h2 id="assumptions-title">Pilot assumptions</h2><p>Edit the numbers to update the estimate.</p></div>
              <button className="reset-button" type="button" onClick={resetInputs}>Reset demo</button>
            </div>
            <div className="input-grid">
              {fields.map((field) => <Field key={field.key} field={field} value={inputs[field.key]} error={visibleErrors[field.key]} onChange={changeInput} />)}
            </div>
            <p className="assumptions-note">Fictional planning values only. No candidate or employer details are collected.</p>
          </section>

          <section className="card estimate-card" aria-labelledby="estimate-title" aria-live="polite">
            <div className="estimate-head">
              <h2 id="estimate-title">Baseline estimate</h2>
              <span className={`feasibility-pill ${economics?.budgetGap !== undefined && economics.budgetGap >= 0 ? "good" : "warn"}`}>
                {economics ? (economics.budgetGap >= 0 ? "WITHIN PILOT BUDGET" : "OVER PILOT BUDGET") : "CHECK INPUTS"}
              </span>
            </div>
            {economics ? (
              <>
                <div className="hero-total"><p className="metric-caption">TOTAL HUMAN REVIEW COST</p><p className="hero-number">{money(economics.totalCost)}<small>MXN</small></p></div>
                <ul className="metric-list">
                  <li className="metric-row"><span>Review cost per candidate</span><strong>{money(economics.costPerCandidate)} MXN</strong></li>
                  <li className="metric-row"><span>Average cost per employer</span><strong>{money(economics.costPerEmployer)} MXN</strong></li>
                  <li className="metric-row"><span>{economics.budgetGap >= 0 ? "Budget remaining" : "Over budget by"}</span><strong className={economics.budgetGap >= 0 ? "positive" : "negative"}>{money(Math.abs(economics.budgetGap))} MXN</strong></li>
                  <li className="metric-row"><span>{economics.willingnessGap >= 0 ? "Willingness-to-pay surplus" : "Willingness-to-pay shortfall"}</span><strong className={economics.willingnessGap >= 0 ? "positive" : "negative"}>{money(Math.abs(economics.willingnessGap))} MXN</strong></li>
                </ul>
                <div className="secondary-indicator">
                  <div className="indicator-box"><span>Budget coverage</span><strong>{economics.budgetGap >= 0 ? "Budget covers estimated cost" : "Budget does not cover cost"}</strong></div>
                  <div className="indicator-box"><span>Employer willingness</span><strong>{economics.willingnessGap >= 0 ? "Total stated amount covers cost" : "Total stated amount is below cost"}</strong></div>
                </div>
              </>
            ) : <div className="invalid-state" role="status">Fix the highlighted inputs to see a reliable estimate. Invalid values are not calculated.</div>}
            <p className="estimate-footnote">Positive gaps indicate modeled coverage, not validated demand or proof of hiring value.</p>
          </section>
        </div>

        <section className="scenario-section" aria-labelledby="scenarios-title">
          <div className="section-heading"><div><h2 id="scenarios-title">Review-time scenarios</h2><p>Scenario multipliers are planning assumptions, not observed results.</p></div><span className="scenario-equation">Cost = candidates × review minutes ÷ 60 × hourly rate</span></div>
          {economics ? <div className="scenario-grid">
            {economics.scenarios.map((scenario) => {
              const details = scenarioDetails.find((item) => item.id === scenario.id)!;
              return <article className={`scenario-card ${scenario.id === "baseline" ? "active" : ""}`} key={scenario.id}>
                <div className="scenario-top"><h3>{scenario.label}</h3><span className="scenario-factor">{scenario.factor.toLocaleString("en-US", { style: "percent", maximumFractionDigits: 0 })} time</span></div>
                <p className="scenario-total">{money(scenario.totalCost)} <span>MXN</span></p>
                <p className="scenario-description">{details.description}</p>
                <div className="scenario-detail"><span>{scenario.reviewMinutes.toLocaleString("en-US", { maximumFractionDigits: 1 })} min / candidate</span><span>{money(scenario.costPerCandidate)} / candidate</span></div>
              </article>;
            })}
          </div> : <div className="scenario-empty">Valid assumptions will appear here.</div>}
        </section>

        <section className="stop-card" aria-labelledby="stop-title">
          <div className="stop-heading"><span className="stop-icon" aria-hidden="true">!</span><h2 id="stop-title">Proposed pilot stop rules</h2><span className="proposed-tag">Proposed · Not validated</span></div>
          <ul className="stop-list">
            <li>Fewer than 2 of 3 employers willing to pay again</li>
            <li>Median human review time greater than 10 minutes</li>
            <li>No useful additional hiring evidence</li>
          </ul>
        </section>

        <section className="explanation-card" aria-label="Explanation and safeguards">
          <article className="explanation-panel"><span className="explanation-label"><span />Simulated AI explanation</span><h3>{economics ? (economics.budgetGap >= 0 ? "The estimated review cost fits the modeled pilot budget." : "The estimated review cost exceeds the modeled pilot budget.") : "An estimate will appear when all inputs are valid."}</h3><p>{economics ? `Reviewing ${inputs.candidates} fictional candidates takes about ${(inputs.candidates * inputs.reviewMinutes / 60).toLocaleString("en-US", { maximumFractionDigits: 1 })} reviewer hours at the entered hourly rate. This is a deterministic demo explanation, not output from a connected AI service.` : "Correct the fields above. No invalid data is used in this explanation."}</p></article>
          <article className="explanation-panel"><span className="explanation-label"><span />Human review is mandatory</span><h3>People—not this calculator—review every proof.</h3><p>Each future task needs a bounded brief, disclosed rubric and AI use, live revision or explanation, and a named reviewer. Candidates see results first, can correct and export evidence, and control sharing; unsuccessful attempts remain private.</p></article>
        </section>

        <p className="footer-note">No personal data is stored. No candidate fees. Any real productive work requires agreed compensation, supervision, clear scope, acceptance rules, and applicable labor protections.</p>
      </main>
    </>
  );
}
