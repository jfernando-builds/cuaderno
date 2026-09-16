"use client";

import { useState } from "react";
import "./week6.css";

export default function Week6() {
  const [scene, setScene] = useState("start");
  const [choices, setChoices] = useState([]);
  const [voiceMessage, setVoiceMessage] = useState("");

  function restart() {
    setScene("start");
    setChoices([]);
    setVoiceMessage("");
  }

  function chooseNext(choice) {
    setChoices((current) => [...current, choice]);
    if (scene === "first") setScene("blocked");
    if (scene === "blocked") setScene("final");
    if (scene === "final") setScene("debrief");
  }

  function speak(text) {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setVoiceMessage("La lectura de voz no está disponible en este navegador.");
      return;
    }
    setVoiceMessage("Reproduciendo texto de la escena.");
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  }

  return (
    <main className="rehearsal-shell">
      {scene === "start" ? (
        <section className="intro-panel" aria-labelledby="page-title">
          <p className="eyebrow">ENSAYO BREVE · 01</p>
          <div className="visual-stage" aria-label="Visual simulado de una habitación">
            <span className="window-shape" />
            <span className="room-line" />
            <span className="shake-mark">~ ~ ~</span>
            <span className="visual-label">SIMULACIÓN VISUAL</span>
          </div>
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
          <div className="scene-meta">
            <span>ESCENA SIMULADA</span>
            <button className="voice-button" onClick={() => speak("El suelo comienza a moverse. Estas cerca de una ventana. Que haces primero?")}>Escuchar</button>
          </div>
          {voiceMessage && <p className="voice-note">{voiceMessage}</p>}
          <h1 id="scene-title">El suelo comienza a moverse.</h1>
          <p className="scene-copy">
            Estás cerca de una ventana. ¿Qué haces primero?
          </p>
          <div className="choice-list">
            <button
              className="choice-button"
              onClick={() => chooseNext("Alejarme de la ventana")}
            >
              Alejarme de la ventana
            </button>
            <button
              className="choice-button"
              onClick={() => chooseNext("Ir hacia la salida principal")}
            >
              Ir hacia la salida principal
            </button>
          </div>
        </section>
      ) : scene === "blocked" ? (
        <section className="scene-panel" aria-labelledby="scene-title">
          <p className="eyebrow">ENSAYO BREVE · 02 / 03</p>
          <div className="scene-meta">
            <span>EVENTO INESPERADO</span>
            <button className="voice-button" onClick={() => speak("La salida principal esta bloqueada. Elige que haces a continuacion.")}>Escuchar</button>
          </div>
          {voiceMessage && <p className="voice-note">{voiceMessage}</p>}
          <h1 id="scene-title">La salida principal está bloqueada.</h1>
          <p className="scene-copy">
            {choices[0] === "Ir hacia la salida principal"
              ? "La ruta que elegiste ya no está disponible. Elige qué haces a continuación."
              : "Elige qué haces a continuación."}
          </p>
          <div className="choice-list">
            <button
              className="choice-button"
              onClick={() => chooseNext("Buscar una ruta lateral despejada")}
            >
              Buscar una ruta lateral despejada
            </button>
            <button
              className="choice-button"
              onClick={() => chooseNext("Esperar y observar el espacio")}
            >
              Esperar y observar el espacio
            </button>
          </div>
        </section>
      ) : scene === "final" ? (
        <section className="scene-panel" aria-labelledby="scene-title">
          <p className="eyebrow">ENSAYO BREVE · 03 / 03</p>
          <div className="scene-meta">
            <span>ESCENA SIMULADA</span>
            <button className="voice-button" onClick={() => speak("El movimiento disminuye. Que decides hacer ahora?")}>Escuchar</button>
          </div>
          {voiceMessage && <p className="voice-note">{voiceMessage}</p>}
          <h1 id="scene-title">El movimiento disminuye.</h1>
          <p className="scene-copy">¿Qué decides hacer ahora?</p>
          <div className="choice-list">
            <button
              className="choice-button"
              onClick={() => chooseNext("Terminar el ensayo")}
            >
              Terminar ensayo
            </button>
            <button
              className="choice-button"
              onClick={() => chooseNext("Repetir el ensayo")}
            >
              Repetir el ensayo
            </button>
          </div>
        </section>
      ) : (
        <section className="scene-panel" aria-labelledby="debrief-title">
          <p className="eyebrow">ENSAYO COMPLETO</p>
          <h1 id="debrief-title">Tus decisiones en esta simulación</h1>
          <ol className="decision-list">
            {choices.map((choice, index) => (
              <li key={`${choice}-${index}`}>{choice}</li>
            ))}
          </ol>
          <p className="scene-copy">
            Esto describe únicamente lo que elegiste aquí. No es una medida de
            tu preparación ni predice lo que harías fuera de la simulación.
          </p>
          <button className="primary-button" onClick={restart}>
            Repetir ensayo
          </button>
        </section>
      )}
    </main>
  );
}
