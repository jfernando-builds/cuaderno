"use client";

import { useState } from "react";

export default function Home() {
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);

  function evaluate() {
    if (answer.trim().length < 20) {
      alert("Escribe una respuesta de al menos 20 caracteres.");
      return;
    }

    setResult({
      skill: "Análisis de Negocio",
      score: 84,
      level: "Intermedio Alto",
      confidence: 0.82,
    status: answer.length < 80 ? "NEEDS HUMAN REVIEW" : "VERIFICADA",
    opportunity: "Analista Junior de Negocios",
match: 86,

    });
  }

  return (
    <main
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: 1000,
        margin: "40px auto",
        padding: 24,
      }}
    >
      <h1 style={{ color: "#3730a3" }}>SkillBridge MX</h1>
      <p>Demuestra tus habilidades. Encuentra oportunidades.</p>

      <hr />

      <h2>Reto: Análisis de Negocio</h2>
      <p>
        Una cafetería quiere aumentar sus ventas en la tarde, pero tiene pocos
        clientes después de las 3pm. ¿Qué analizarías y qué recomendarías?
      </p>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Escribe tu respuesta..."
        maxLength={800}
        style={{
          width: "100%",
          minHeight: 130,
          padding: 12,
          fontSize: 16,
        }}
      />

      <br />
      <br />

      <button
        onClick={evaluate}
        style={{
          padding: "12px 22px",
          background: "#4f46e5",
          color: "white",
          border: 0,
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        Evaluar respuesta
      </button>
<p style={{ fontSize: 13, color: "#666" }}>
  Máximo 800 caracteres. No ingreses datos personales.
</p>
      {result && (
        <section style={{ marginTop: 35 }}>
          <h2>Evaluación de IA</h2>
          <p>
            <strong>Salida de IA simulada para esta demostración.</strong>
          </p>

          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: 20,
            }}
          >
            <h2>Skill Card</h2>
            <h3>{result.skill}</h3>
            <p>Estado: {result.status}</p>
            <p>Puntuación: {result.score}/100</p>
            <p>Nivel: {result.level}</p>
            <p>Confianza IA: {result.confidence}</p>
          </div>

          <div
            style={{
              marginTop: 20,
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: 20,
            }}
          >
            <h2>Oportunidad compatible</h2>
            <h3>Analista Junior de Negocios — Café del Centro</h3>
            <p>
              Internship simulado · Ciudad de México · Modalidad híbrida
            </p>
            <p>
              Tu habilidad demostrada de Análisis de Negocio coincide con esta
              oportunidad.
            </p>
          </div>

          <div
            style={{
              marginTop: 20,
              padding: 15,
              background: "#fff7d6",
              borderRadius: 8,
            }}
          >
            <strong>Tú decides tu camino.</strong> Esta recomendación sirve para
            explorar opciones. La IA no elige tu carrera ni tu futuro.
          </div>
        </section>
      )}
    </main>
  );
}
