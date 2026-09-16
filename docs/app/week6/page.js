"use client";

import { useState } from "react";

export default function Week6() {
  const [scene, setScene] = useState("start");

  function restart() {
    setScene("start");
  }

  function chooseNext() {
    setScene(scene === "first" ? "blocked" : "final");
  }

  return (
    <main className="rehearsal-shell">
      {scene === "start" ? (
        <section className="intro-panel" aria-labelledby="page-title">
          <p className="eyebrow">ENSAYO BREVE · 01</p>
          <h1 id="page-title">Un minuto para practicar.</h1>
          <p className="intro-copy">
            Una experiencia simulada de decisiones durante un sismo. No es una
            prueba de preparación ni guarda información personal.
          </p>
          <button className="primary-button" onClick={() => setScene("first")}>
            Comenzar ensayo
          </button>
        </section>
      ) : scene === "first" ? (
        <section className="scene-panel" aria-labelledby="scene-title">
          <p className="eyebrow">ENSAYO BREVE · 01 / 03</p>
          <h1 id="scene-title">El suelo comienza a moverse.</h1>
          <p className="scene-copy">Estás cerca de una ventana. ¿Qué haces primero?</p>
          <div className="choice-list">
            <button className="choice-button" onClick={chooseNext}>
              Alejarme de la ventana
            </button>
            <button className="choice-button" onClick={chooseNext}>
              Ir hacia la salida principal
            </button>
          </div>
        </section>
      ) : scene === "blocked" ? (
        <section className="scene-panel" aria-labelledby="scene-title">
          <p className="eyebrow">ENSAYO BREVE · 02 / 03</p>
          <h1 id="scene-title">La salida principal está bloqueada.</h1>
          <p className="scene-copy">Elige qué haces a continuación.</p>
          <div className="choice-list">
            <button className="choice-button" onClick={chooseNext}>
              Buscar una ruta lateral despejada
            </button>
            <button className="choice-button" onClick={chooseNext}>
              Esperar y observar el espacio
            </button>
          </div>
        </section>
      ) : (
        <section className="scene-panel" aria-labelledby="scene-title">
          <p className="eyebrow">ENSAYO BREVE · 03 / 03</p>
          <h1 id="scene-title">El movimiento disminuye.</h1>
          <p className="scene-copy">¿Qué decides hacer ahora?</p>
          <div className="choice-list">
            <button className="choice-button" onClick={restart}>
              Terminar ensayo
            </button>
            <button className="choice-button" onClick={restart}>
              Repetir el ensayo
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
