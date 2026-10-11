export interface PilotInputs {
  candidates: number;
  employers: number;
  reviewMinutes: number;
  reviewerHourlyCost: number;
  pilotBudget: number;
  willingnessToPayPerEmployer: number;
}

export type PilotField = keyof PilotInputs;
export type ValidationErrors = Partial<Record<PilotField, string>>;

export interface Scenario {
  id: "optimistic" | "baseline" | "pessimistic";
  label: string;
  factor: number;
  reviewMinutes: number;
  totalCost: number;
  costPerCandidate: number;
  costPerEmployer: number;
  budgetGap: number;
  willingnessGap: number;
}

export interface PilotEconomics {
  totalCost: number;
  costPerCandidate: number;
  costPerEmployer: number;
  budgetGap: number;
  totalWillingnessToPay: number;
  willingnessGap: number;
  scenarios: Scenario[];
}

export const DEFAULT_INPUTS: PilotInputs = {
  candidates: 12,
  employers: 3,
  reviewMinutes: 10,
  reviewerHourlyCost: 180,
  pilotBudget: 500,
  willingnessToPayPerEmployer: 250,
};

const LIMITS: Record<PilotField, { min: number; max: number; integer?: boolean }> = {
  candidates: { min: 1, max: 1000, integer: true },
  employers: { min: 1, max: 100, integer: true },
  reviewMinutes: { min: 1, max: 120 },
  reviewerHourlyCost: { min: 1, max: 10000 },
  pilotBudget: { min: 0, max: 10000000 },
  willingnessToPayPerEmployer: { min: 0, max: 1000000 },
};

export const FIELD_LABELS: Record<PilotField, string> = {
  candidates: "Number of candidates",
  employers: "Number of employers",
  reviewMinutes: "Review minutes per candidate",
  reviewerHourlyCost: "Reviewer hourly cost",
  pilotBudget: "Total pilot budget",
  willingnessToPayPerEmployer: "Willingness to pay per employer",
};

export function validateInputs(inputs: PilotInputs): ValidationErrors {
  const errors: ValidationErrors = {};
  for (const field of Object.keys(LIMITS) as PilotField[]) {
    const value = inputs[field];
    const { min, max, integer } = LIMITS[field];
    if (!Number.isFinite(value)) {
      errors[field] = "Enter a valid number.";
    } else if (integer && !Number.isInteger(value)) {
      errors[field] = "Enter a whole number.";
    } else if (value < min || value > max) {
      errors[field] = `Enter a value from ${min.toLocaleString("en-US")} to ${max.toLocaleString("en-US")}.`;
    }
  }
  return errors;
}

function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function makeScenario(inputs: PilotInputs, id: Scenario["id"], label: string, factor: number): Scenario {
  const reviewMinutes = inputs.reviewMinutes * factor;
  const totalCost = roundMoney(inputs.candidates * (reviewMinutes / 60) * inputs.reviewerHourlyCost);
  const totalWillingnessToPay = inputs.employers * inputs.willingnessToPayPerEmployer;
  return {
    id,
    label,
    factor,
    reviewMinutes,
    totalCost,
    costPerCandidate: roundMoney(totalCost / inputs.candidates),
    costPerEmployer: roundMoney(totalCost / inputs.employers),
    budgetGap: roundMoney(inputs.pilotBudget - totalCost),
    willingnessGap: roundMoney(totalWillingnessToPay - totalCost),
  };
}

export function calculateEconomics(inputs: PilotInputs): PilotEconomics {
  const errors = validateInputs(inputs);
  if (Object.keys(errors).length > 0) {
    throw new RangeError("Cannot calculate pilot economics with invalid inputs.");
  }

  const baseline = makeScenario(inputs, "baseline", "Baseline", 1);
  const optimistic = makeScenario(inputs, "optimistic", "Optimistic", 0.75);
  const pessimistic = makeScenario(inputs, "pessimistic", "Pessimistic", 1.5);
  const totalWillingnessToPay = roundMoney(inputs.employers * inputs.willingnessToPayPerEmployer);

  return {
    totalCost: baseline.totalCost,
    costPerCandidate: baseline.costPerCandidate,
    costPerEmployer: baseline.costPerEmployer,
    budgetGap: baseline.budgetGap,
    totalWillingnessToPay,
    willingnessGap: baseline.willingnessGap,
    scenarios: [optimistic, baseline, pessimistic],
  };
}
