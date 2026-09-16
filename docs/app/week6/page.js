"use client";

import { useState } from "react";

export default function Week6() {
  const [started, setStarted] = useState(false);

  return (
    <main className="rehearsal-shell">
      {!started ? (
        <section className="intro-panel" aria-labelledby="page-title">
          <p className="eyebrow">ENSAYO BREVE · 01</p>
          <h1 id="page-title">Un minuto para practicar.</h1>
          <p className="intro-copy">
            Una experiencia simulada de decisiones durante un sismo. No es una
            prueba de preparación ni guarda información personal.
          </p>
          <button className="primary-button" onClick={() => setStarted(true)}>
            Comenzar ensayo
          </button>
        </section>
      ) : (
        <section className="scene-panel" aria-labelledby="scene-title">
          <p className="eyebrow">ENSAYO BREVE · 01 / 03</p>
          <h1 id="scene-title">El suelo comienza a moverse.</h1>
          <p className="scene-copy">Estás cerca de una ventana. ¿Qué haces primero?</p>
          <div className="choice-list">
            <button className="choice-button">Alejarme de la ventana</button>
            <button className="choice-button">Ir hacia la salida principal</button>
          </div>
        </section>
      )}
    </main>
  );
}
