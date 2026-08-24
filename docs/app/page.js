"use client";

import { useState } from "react";

export default function Home() {
  const [fileName, setFileName] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  const [evidence, setEvidence] = useState({
    amount: "70.00 MXN",
    date: "15/05/2024",
    merchant: "Café Buen Día",
    paymentMethod: "Tarjeta",
    reference: "00012345",
  });

  function handleFileChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      setFileName("");
      return;
    }

    setFileName(file.name);
    setAnalyzed(false);
  }

  function handleAnalyze() {
    if (!fileName) {
      alert("Please choose a sample evidence file first.");
      return;
    }

    setAnalyzed(true);
  }

  function updateEvidence(field, value) {
    setEvidence((current) => ({
      ...current,
      [field]: value,
    }));
  }

  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Evidence Organizer</h1>

      <p>
        Turn fragmented economic evidence into a clear, reviewable Evidence
        Package.
      </p>

      <div
        style={{
          padding: "14px",
          background: "#f3f6fb",
          borderRadius: "8px",
          marginBottom: "30px",
        }}
      >
        <strong>Important:</strong> This tool organizes evidence. It does not
        calculate a credit score, determine eligibility, or recommend approval.
      </div>

      <h2>1. Upload Evidence</h2>

      <input
  type="file"
  accept=".pdf,image/png,image/jpeg"
onChange={handleFileChange}

/>

      {fileName && (
        <p>
          Selected file: <strong>{fileName}</strong>
        </p>
      )}

      <button
        onClick={handleAnalyze}
        style={{
          display: "block",
          marginTop: "20px",
          padding: "10px 18px",
          cursor: "pointer",
        }}
      >
        Analyze Evidence
      </button>

      {analyzed && (
        <section style={{ marginTop: "40px" }}>
          <h2>2. Extracted Evidence</h2>

          <p>
            <strong>Simulated AI output:</strong> The fields below are demo
            extraction results. Extraction does not prove authenticity.
          </p>

          <div style={{ display: "grid", gap: "16px" }}>
            <label>
              Amount
              <input
                value={evidence.amount}
                onChange={(e) => updateEvidence("amount", e.target.value)}
                style={{ display: "block", width: "100%", padding: "8px" }}
              />
              <small>Source: receipt total</small>
            </label>

            <label>
              Date
              <input
                value={evidence.date}
                onChange={(e) => updateEvidence("date", e.target.value)}
                style={{ display: "block", width: "100%", padding: "8px" }}
              />
              <small>Source: receipt date line</small>
            </label>

            <label>
              Merchant
              <input
                value={evidence.merchant}
                onChange={(e) => updateEvidence("merchant", e.target.value)}
                style={{ display: "block", width: "100%", padding: "8px" }}
              />
              <small>Source: receipt header</small>
            </label>

            <label>
              Payment Method
              <input
                value={evidence.paymentMethod}
                onChange={(e) =>
                  updateEvidence("paymentMethod", e.target.value)
                }
                style={{ display: "block", width: "100%", padding: "8px" }}
              />
              <small>Source: payment-method line</small>
            </label>

            <label>
              Reference
              <input
                value={evidence.reference}
                onChange={(e) => updateEvidence("reference", e.target.value)}
                style={{ display: "block", width: "100%", padding: "8px" }}
              />
              <small>
                Source: ticket reference · Status: <strong>Uncertain</strong>
              </small>
            </label>
          </div>

          <div style={{ marginTop: "30px" }}>
            <h2>3. Create Evidence Package</h2>

            <button
              onClick={() =>
                alert(
                  "Evidence Package created for human review. No credit decision was made."
                )
              }
              style={{
                padding: "12px 18px",
                cursor: "pointer",
              }}
            >
              Create Evidence Package
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
