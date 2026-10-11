import assert from "node:assert/strict";
import test from "node:test";
import { calculateEconomics, DEFAULT_INPUTS, validateInputs } from "./pilot-economics";

test("fictional baseline defaults produce transparent MXN unit costs and gaps", () => {
  const result = calculateEconomics(DEFAULT_INPUTS);
  assert.equal(result.totalCost, 360);
  assert.equal(result.costPerCandidate, 30);
  assert.equal(result.costPerEmployer, 120);
  assert.equal(result.budgetGap, 140);
  assert.equal(result.totalWillingnessToPay, 750);
  assert.equal(result.willingnessGap, 390);
});

test("optimistic, baseline, and pessimistic scenarios are deterministic", () => {
  const result = calculateEconomics(DEFAULT_INPUTS);
  assert.deepEqual(result.scenarios.map(({ id, totalCost }) => [id, totalCost]), [
    ["optimistic", 270],
    ["baseline", 360],
    ["pessimistic", 540],
  ]);
});

test("zero-valued budget and willingness are valid and show uncovered cost", () => {
  const result = calculateEconomics({ ...DEFAULT_INPUTS, pilotBudget: 0, willingnessToPayPerEmployer: 0 });
  assert.equal(result.budgetGap, -360);
  assert.equal(result.willingnessGap, -360);
});

test("invalid, fractional-count, negative, and out-of-range values are rejected", () => {
  assert.ok(validateInputs({ ...DEFAULT_INPUTS, candidates: 1.5 }).candidates);
  assert.ok(validateInputs({ ...DEFAULT_INPUTS, reviewMinutes: Number.NaN }).reviewMinutes);
  assert.ok(validateInputs({ ...DEFAULT_INPUTS, reviewerHourlyCost: -1 }).reviewerHourlyCost);
  assert.ok(validateInputs({ ...DEFAULT_INPUTS, employers: 101 }).employers);
  assert.throws(() => calculateEconomics({ ...DEFAULT_INPUTS, candidates: 0 }), RangeError);
});

test("zero employer count cannot produce division by zero", () => {
  assert.ok(validateInputs({ ...DEFAULT_INPUTS, employers: 0 }).employers);
});
