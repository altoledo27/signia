import { useEffect, useRef, useState } from "react";
import * as tmImage from "@teachablemachine/image";

export default function Translator({ onBack }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const lastSpokenRef = useRef("");
  const lastTimeRef = useRef(0);
  const speakingRef = useRef(false);

  const [text, setText] = useState("Cargando IA...");
  const [confidence, setConfidence] = useState(0);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  async function speakEleven(word) {
  try {
    const response = await fetch("http://localhost:3001/speak", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: word }),
    });

    if (!response.ok) return;

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const audio = new Audio(url);
    audio.play();

    audio.onended = () => {
      URL.revokeObjectURL(url);
    };
  } catch (error) {
    console.log(error);
  }
}

  useEffect(() => {
    let model;
    let interval;

    async function start() {
      model = await tmImage.load(
        "/model/model.json",
        "/model/metadata.json"
      );

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setLoading(false);

      interval = setInterval(async () => {
        if (!videoRef.current) return;

        const prediction = await model.predict(videoRef.current);

        const best = prediction.reduce((a, b) =>
          a.probability > b.probability ? a : b
        );

        const prob = (best.probability * 100).toFixed(0);

        if (best.probability > 0.9) {
          setText(best.className);
          setConfidence(prob);

          const now = Date.now();

          if (
            best.className !== lastSpokenRef.current &&
            now - lastTimeRef.current > 2500
          ) {
            lastSpokenRef.current = best.className;
            lastTimeRef.current = now;

            setHistory((prev) => [
              best.className,
              ...prev.slice(0, 4),
            ]);

            speakEleven(best.className);
          }
        }
      }, 350);
    }

    start();

    return () => {
      clearInterval(interval);

      if (streamRef.current) {
        streamRef.current
          .getTracks()
          .forEach((track) => track.stop());

        streamRef.current = null;
      }

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top right, #111827 0%, #050505 45%, #000000 100%)",
        color: "white",
        padding: "28px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          position: "relative",
          textAlign: "center",
          marginBottom: "28px",
        }}
      >
        <button
          onClick={onBack}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            background: "#111",
            color: "#fff",
            border: "1px solid #222",
            padding: "12px 18px",
            borderRadius: "14px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          ← Regresar
        </button>

        <h1
          style={{
            fontSize: "clamp(2rem,5vw,3.5rem)",
            margin: 0,
            fontWeight: 700,
          }}
        >
          SIGNIA
        </h1>

        <p
          style={{
            color: "#9ca3af",
            marginTop: "20px",
            fontSize: "15px",
          }}
        >
          Traductor Inteligente de Lengua de Señas
        </p>
      </div>

      {/* Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "22px",
        }}
      >
        {/* Cámara */}
        <div
          style={{
            background: "#111",
            borderRadius: "26px",
            padding: "16px",
            border: "1px solid #222",
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            width="100%"
            style={{
              borderRadius: "18px",
              width: "100%",
              minHeight: "520px",
              objectFit: "cover",
              background: "#000",
            }}
          />
        </div>

        {/* Panel */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <Card>
            <p style={{ color: "#6b7280", margin: 0 }}>
              Detectado
            </p>

            <h2
              style={{
                fontSize: "42px",
                color: "#4DA3FF",
                margin: "10px 0",
              }}
            >
              {loading ? "..." : text}
            </h2>

            <p>{confidence}% confianza</p>
          </Card>

          <Card>
            <p style={{ color: "#6b7280", marginTop: 0 }}>
              Historial reciente
            </p>

            {history.map((item, i) => (
              <div
                key={i}
                style={{
                  marginTop: "10px",
                  padding: "12px",
                  background: "#1a1a1a",
                  borderRadius: "12px",
                }}
              >
                {item}
              </div>
            ))}
          </Card>

          <Card>
            <p style={{ color: "#22c55e", margin: 0 }}>
              ● Sistema Activo
            </p>

            <p style={{ color: "#9ca3af" }}>
              Cámara + IA + Voz funcionando.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Card({ children }) {
  return (
    <div
      style={{
        background: "#111",
        padding: "22px",
        borderRadius: "24px",
        border: "1px solid #222",
      }}
    >
      {children}
    </div>
  );
}