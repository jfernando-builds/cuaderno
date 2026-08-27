"use client";

import { useState } from "react";

export default function Home() {
  const [fileName, setFileName] = useState("");
  const [expectedName, setExpectedName] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function handleFileChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      setFileName("");
      return;
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
if (file.size > 10 * 1024 * 1024) {
  setError("Please upload an image smaller than 10 MB.");
  setFileName("");
  return;
}

    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a JPG or PNG image.");
      setFileName("");
      return;
    }

    setError("");
    setFileName(file.name);
  }

  function handleCompare() {
    if (!fileName) {
      setError("Please upload an image first.");
      return;
    }

    if (!expectedName.trim()) {
      setError("Please enter the expected name.");
      return;
    }

    if (expectedName.length > 80) {
      setError("The name must be 80 characters or fewer.");
      return;
    }

    setError("");

    // Simulated AI result for this first build.
    // This will be clearly labeled on screen.
    setResult({
      status: "Inconsistent",
      expected: expectedName,
      found: "Carlos Ramírez",
    });
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f6f7f9",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "620px",
          margin: "0 auto",
          background: "white",
          borderRadius: "18px",
          padding: "32px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ fontSize: "32px", marginBottom: "8px" }}>
          Check before you pay
        </h1>

        <p style={{ marginBottom: "30px", lineHeight: "1.5" }}>
          Compare payment information before sending money.
        </p>

        <div style={{ marginBottom: "26px" }}>
          <h2 style={{ fontSize: "20px" }}>
            1. Upload a screenshot
          </h2>

          <p style={{ lineHeight: "1.5" }}>
            Upload a WhatsApp screenshot or payment image.
          </p>

          <input
            type="file"
            accept="image/png,image/jpeg"
            onChange={handleFileChange}
          />

          {fileName && (
            <p style={{ marginTop: "10px" }}>
              Selected: <strong>{fileName}</strong>
            </p>
          )}
        </div>

        <div style={{ marginBottom: "26px" }}>
          <h2 style={{ fontSize: "20px" }}>
            2. Who are you expecting to pay?
          </h2>

          <input
            type="text"
            placeholder="Name or identifier"
            value={expectedName}
            maxLength={80}
            onChange={(e) => setExpectedName(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #bbb",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {error && (
          <div
            style={{
              background: "#fff3f3",
              border: "1px solid #e0a0a0",
              padding: "14px",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            {error}
          </div>
        )}

        <button
          onClick={handleCompare}
          style={{
            width: "100%",
            padding: "15px",
            border: "none",
            borderRadius: "10px",
            fontSize: "17px",
            cursor: "pointer",
            background: "#111",
            color: "white",
          }}
        >
          Compare information
        </button>

        <p
          style={{
            marginTop: "12px",
            fontSize: "13px",
            color: "#666",
          }}
        >
          AI analysis is simulated in this build.
        </p>

        {result && (
          <div
            style={{
              marginTop: "30px",
              border: "1px solid #d6b2b2",
              background: "#fff7f7",
              borderRadius: "14px",
              padding: "22px",
            }}
          >
            <h2>Information does not match</h2>

            <p>
              This difference may matter before you pay.
              It does not prove fraud.
            </p>

            <hr style={{ margin: "20px 0" }} />

            <p>
              <strong>Expected name:</strong>
              <br />
              {result.expected}
            </p>

            <p>
              <strong>Name found in payment evidence:</strong>
              <br />
              {result.found}
            </p>

            <p style={{ marginTop: "20px" }}>
              This tool only compares the available information.
              You make the final decision.
            </p>

            <button
              onClick={() => {
                setResult(null);
                setFileName("");
                setExpectedName("");
              }}
              style={{
                marginTop: "10px",
                padding: "12px 18px",
                borderRadius: "10px",
                border: "1px solid #333",
                cursor: "pointer",
                background: "white",
              }}
            >
              Check another case
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
