import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as tf from "@tensorflow/tfjs";
import * as tmImage from "@teachablemachine/image";

export default function AuraSystem() {
  const navigate = useNavigate();

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [text, setText] = useState<string>("Cargando IA...");
  const [confidence, setConfidence] = useState<string>("0");
  const [history, setHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const lastWordRef = useRef<string>("");

  useEffect(() => {
    let model: tmImage.CustomMobileNet;
    let interval: number;

    async function initSystem() {
      try {
        await tf.ready();

        model = await tmImage.load(
          "/model/model.json",
          "/model/metadata.json"
        );

        // 🎥 Activar cámara
        streamRef.current = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });

        if (videoRef.current && streamRef.current) {
          videoRef.current.srcObject = streamRef.current;
          await videoRef.current.play();
        }

        setLoading(false);
        setText("Esperando manos...");

        interval = window.setInterval(async () => {
          if (videoRef.current && videoRef.current.readyState === 4) {
            const predictions = await model.predict(videoRef.current);

            const best = predictions.reduce((a, b) =>
              a.probability > b.probability ? a : b
            );

            const prob = (best.probability * 100).toFixed(0);

            if (best.probability > 0.9) {
              setText(best.className);
              setConfidence(prob);

              if (best.className !== lastWordRef.current) {
                lastWordRef.current = best.className;

                setHistory((prev) => [
                  best.className,
                  ...prev.slice(0, 4),
                ]);
              }
            } else {
              setText("Seña no reconocida");
              setConfidence("0");
            }
          }
        }, 250);
      } catch (error) {
        console.error("Error inicializando AuraSystem:", error);
        setText("Error al cargar la cámara o modelo");
      }
    }

    initSystem();

    // 🧹 CLEANUP REAL
    return () => {
      if (interval) clearInterval(interval);

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  const handleBack = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    navigate("/");
  };

  return (
    <div
      style={{
        background: "#050505",
        color: "white",
        minHeight: "100vh",
        padding: "30px",
        fontFamily: "sans-serif",
      }}
    >
      {/* Botón de navegación */}
      <button
        onClick={() => navigate("/")}
        style={{
          background: "transparent",
          color: "#85B7EB",
          border: "1px solid #85B7EB",
          padding: "8px 16px",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span>←</span> Volver al inicio
      </button>

      <h1 style={{ fontSize: "42px", marginBottom: "5px" }}>Aura AI</h1>
      <p style={{ color: "#888", marginBottom: "30px" }}>
        Traductor en vivo. Realiza una seña frente a la cámara.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {/* Contenedor de la Cámara */}
        <div
          style={{
            background: "#111",
            borderRadius: "24px",
            padding: "15px",
            boxShadow: "0 0 20px rgba(24, 95, 165, 0.2)",
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
              width: "100%",
              borderRadius: "18px",
              background: "black",
              minHeight: "300px",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Panel lateral de Resultados */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* Tarjeta de Detección */}
          <div
            style={{
              background: "#111",
              padding: "20px",
              borderRadius: "24px",
              border: "1px solid #222",
            }}
          >
            <p style={{ color: "#777", margin: 0, fontSize: "14px" }}>Detección actual</p>
            <h2
              style={{
                fontSize: "48px",
                color: "#E6F1FB",
                margin: "10px 0",
              }}
            >
              {loading ? "Iniciando..." : text}
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div 
                style={{ 
                  flex: 1, 
                  background: "#222", 
                  height: "8px", 
                  borderRadius: "4px",
                  overflow: "hidden"
                }}
              >
                <div 
                  style={{ 
                    width: `${confidence}%`, 
                    background: "#185FA5", 
                    height: "100%",
                    transition: "width 0.2s ease"
                  }} 
                />
              </div>
              <p style={{ margin: 0, color: "#85B7EB" }}>{confidence}%</p>
            </div>
          </div>

          {/* Tarjeta de Historial */}
          <div
            style={{
              background: "#111",
              padding: "20px",
              borderRadius: "24px",
              border: "1px solid #222",
              flex: 1,
            }}
          >
            <p style={{ color: "#777", margin: "0 0 15px 0", fontSize: "14px" }}>Historial reciente</p>
            {history.length === 0 && !loading ? (
              <p style={{ color: "#444", fontStyle: "italic" }}>Aún no se han detectado señas...</p>
            ) : (
              history.map((item, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: "10px",
                    padding: "12px 16px",
                    background: i === 0 ? "#185FA5" : "#1a1a1a",
                    color: i === 0 ? "white" : "#ccc",
                    borderRadius: "12px",
                    transition: "all 0.3s ease",
                  }}
                >
                  {item}
                </div>
              ))
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}