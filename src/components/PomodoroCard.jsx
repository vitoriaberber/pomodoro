import React, { useState, useEffect, useRef } from "react";
import styles from "./PomodoroCard.module.css";

const PomodoroCard = () => {
  const [tempo, setTempo] = useState(1500);
  const [tempoFormatado, setTempoFormatado] = useState("");
  const [modo, setModo] = useState("pomodoro");
  const [botaoIniciar, setBotaoIniciar] = useState(false);
  const [botaoPausar, setBotaoPausar] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (modo === "pomodoro") setTempo(1500);
    if (modo === "curto") setTempo(300);
    if (modo === "longo") setTempo(900);
  }, [modo]);

  function iniciar() {
    setBotaoIniciar(true);
  }

  function pausar() {
    setBotaoPausar(!botaoPausar);
  }

  function reiniciar() {
    clearInterval(timerRef.current);
    setBotaoIniciar(false);
    setBotaoPausar(false);

    if (modo === "pomodoro") setTempo(1500);
    if (modo === "curto") setTempo(300);
    if (modo === "longo") setTempo(900);
  }

  useEffect(() => {
    if (botaoIniciar && !botaoPausar) {
      timerRef.current = setInterval(() => {
        setTempo((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            alert("Tempo finalizado");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [botaoIniciar, botaoPausar]);

  useEffect(() => {
    const data = new Date(tempo * 1000);
    const formatado = data.toLocaleTimeString("pt-BR", {
      minute: "2-digit",
      second: "2-digit",
    });
    setTempoFormatado(formatado);
  }, [tempo]);

  return (
    <div className={styles.principal__container}>
      <div className={styles.container__botoes}>
        <button onClick={() => setModo("pomodoro")}>Pomodoro</button>
        <button onClick={() => setModo("curto")}>Pausa Curta</button>
        <button onClick={() => setModo("longo")}>Pausa Longa</button>
      </div>

      <p>{tempoFormatado}</p>

      <div className={styles.container__botoes}>
        <button onClick={pausar}>
          {!botaoPausar ? "Pausar" : "Despausar"}
        </button>
        <button onClick={iniciar}>Iniciar</button>
        <button onClick={reiniciar}>Reiniciar</button>
      </div>
    </div>
  );
};
export default PomodoroCard;
