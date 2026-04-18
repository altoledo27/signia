// LandingPage.jsx
// Uso: <LandingPage onStart={() => { /* tu lógica para mostrar la app */ }} />

const steps = [
  {
    num: "01",
    title: "Activa la cámara",
    desc: "Permite el acceso a tu cámara web. No se graba ni almacena ningún video.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="1.8" width={20} height={20}>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M15 10l-4 4-2-2" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Realiza tus señas",
    desc: "Frente a la cámara, haz las señas de forma natural. El modelo las detecta en tiempo real.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="1.8" width={20} height={20}>
        <path d="M12 2a5 5 0 0 1 5 5v5a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5z" />
        <path d="M3 11v1a9 9 0 0 0 18 0v-1" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "IA interpreta",
    desc: "TensorFlow analiza los gestos de tu mano y los clasifica con alta precisión.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="1.8" width={20} height={20}>
        <circle cx="12" cy="12" r="9" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Escucha la traducción",
    desc: "El texto reconocido se convierte en audio al instante usando síntesis de voz.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="1.8" width={20} height={20}>
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
];

const features = [
  ["Tiempo real", "sin retrasos perceptibles"],
  ["Sin instalación", "corre en el navegador"],
  ["Privado", "la cámara no se graba"],
  ["Texto + audio", "doble salida"],
  ["Accesible", "diseñado para todos"],
  ["Ligero", "modelo optimizado"],
];

const techs = [
  "TensorFlow.js",
  "Web Speech API",
  "MediaDevices API",
  "Hand Pose Detection",
  "React",
];

export default function LandingPage({ onStart }) {
  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        width: "100%",
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top right, #111827 0%, #050505 45%, #000000 100%)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        color: "white",
        boxSizing: "border-box",
      }}
    >
      <div
      style={{
        maxWidth: "2100px",
        margin: "0 auto",
        padding: "0 16px",
      }}
    >
      {/* Hero */}
      <div style={{ textAlign: "center", padding: "4.5rem 1.5rem 3rem" }}>
        
        <h1
          style={{
            fontSize: "clamp(2rem, 6vw, 4.2rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: "850px",
            margin: "0 auto 1rem",
            color: "#fff",
          }}
        >
          Traduce señas a voz
          <span style={{ color: "#4DA3FF" }}> en tiempo real</span>
        </h1>

        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "#cfcfcf",
            maxWidth: "700px",
            margin: "0 auto 2rem",
            lineHeight: 1.8,
          }}
        >
          Usa tu cámara para comunicarte sin barreras. Nuestra IA reconoce
          señas al instante y las convierte en voz.
        </p>

        <CtaButton onClick={onStart}>Empezar ahora</CtaButton>
      </div>

      <Divider />

      {/* Cómo funciona */}
      <Section label="Cómo funciona">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 20,
            alignItems: "stretch",
            justifyItems: "center",
            textAlign: "center",
          }}
        >
          {steps.map((step) => (
            <div
              key={step.num}
              style={{
                background: "#111111",
                border: "1px solid #222",
                borderRadius: 18,
                padding: "1.3rem",
                boxShadow: "0 10px 30px rgba(0,0,0,.35)",
              }}
            >
              <div
          style={{
            width: 42,
            height: 42,
            margin: "0 auto 1rem",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, #4DA3FF 0%, #185FA5 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 700,
            fontSize: 14,
            boxShadow: "0 8px 20px rgba(77,163,255,.25)",
          }}
        >
          {step.num}
        </div>

        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            background: "#1b2635",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1rem",
          }}
        >
          {step.icon}
        </div>

        <p
          style={{
            fontSize: 16,
            fontWeight: 700,
            marginBottom: "0.6rem",
            color: "#fff",
          }}
        >
          {step.title}
        </p>

        <p
          style={{
            fontSize: 13,
            color: "#a1a1aa",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {step.desc}
        </p>
            </div>
          ))}
        </div>
      </Section>

      <Divider />

      {/* Demo */}
      <Section label="Demostración del flujo">
        <div
          style={{
            background: "#111111",
            border: "1px solid #222",
            borderRadius: 14,
            padding: "1.5rem",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                background: "#181818",
                border: "1px solid #2a2a2a",
                borderRadius: 8,
                padding: "8px 14px",
                fontSize: 13,
                color: "#fff",
              }}
            >
              Seña detectada: ✋ Hola
            </div>

            <span style={{ color: "#4DA3FF", fontSize: 18 }}>→</span>

            <div
              style={{
                background: "#0f2236",
                border: "1px solid #24435f",
                borderRadius: 8,
                padding: "8px 14px",
                fontSize: 13,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <PulseDot />
              Reproduciendo: "Hola"
            </div>
          </div>
        </div>
      </Section>

      <Divider />

      {/* Características */}
      <Section label="Características">
        <div
           style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 18,
            maxWidth: "950px",
            margin: "0 auto",
            alignItems: "stretch",
            justifyItems: "center",
          }}
        >
          {features.map(([title, desc]) => (
            <div
            key={title}
            style={{
              background: "#111111",
              border: "1px solid #222",
              borderRadius: 18,
              padding: "1.3rem",
              width: "100%",
              maxWidth: "260px",
              textAlign: "center",
              boxShadow: "0 10px 25px rgba(0,0,0,.28)",
            }}
          >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  margin: "0 auto 1rem",
                  background:
                    "linear-gradient(135deg, #4DA3FF 0%, #185FA5 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                ✓
              </div>

              <p
                style={{
                  fontSize: 16,
                  color: "#fff",
                  fontWeight: 700,
                  marginBottom: "0.45rem",
                }}
              >
                {title}
              </p>

              <p
                style={{
                  fontSize: 14,
                  color: "#a1a1aa",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Divider />

     {/* Tecnologías */}
<Section label="Tecnologías">
  <div
    style={{
      display: "flex",
      gap: 12,
      flexWrap: "wrap",
      justifyContent: "center",
      maxWidth: "900px",
      margin: "0 auto",
    }}
  >
    {techs.map((t) => (
      <span
        key={t}
        style={{
          background: "#111111",
          border: "1px solid #222",
          borderRadius: 999,
          fontSize: 13,
          padding: "10px 16px",
          color: "#ffffff",
          fontWeight: 500,
          cursor: "pointer",
          transition: "all .25s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.border = "1px solid #4DA3FF";
          e.currentTarget.style.boxShadow =
            "0 0 0 1px rgba(77,163,255,.35), 0 0 18px rgba(77,163,255,.20)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.border = "1px solid #222";
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {t}
      </span>
    ))}
  </div>
</Section>

      {/* CTA final */}
      <div style={{ textAlign: "center", padding: "0rem 1.5rem 4rem" }}>
        <CtaButton onClick={onStart}>Ir al traductor →</CtaButton>

        <p
          style={{
            fontSize: 14,
            color: "#888",
            marginTop: "0.9rem",
          }}
        >
          No requiere cuenta ni registro
        </p>
      </div>
      </div>
    </div>
  );
}

/* COMPONENTES */

function CtaButton({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "#185FA5",
        color: "#fff",
        border: "none",
        borderRadius: 14,
        padding: "13px 28px",
        fontSize: 15,
        fontWeight: 600,
        cursor: "pointer",
        boxShadow: "0 10px 25px rgba(24,95,165,.20)",
        transition: "all .2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#0C447C";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#185FA5";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {children}
    </button>
  );
}

function Section({ label, children }) {
  return (
    <div style={{ padding: "3rem 0" }}>
      <p
        style={{
          fontSize: "clamp(1.4rem, 3vw, 2.3rem)",
          letterSpacing: "-0.03em",
          color: "#ffffff",
          marginBottom: "1.4rem",
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        {label}
      </p>

      {children}
    </div>
  );
}



function Divider() {
  return (
    <hr
      style={{
        border: "none",
        borderTop: "1px solid #1a1a1a",
        margin: "0",
      }}
    />
  );
}

function PulseDot() {
  return (
    <>
      <style>{`
        @keyframes aura-pulse {
          0%,100%{opacity:1;transform:scale(1)}
          50%{opacity:.4;transform:scale(.65)}
        }
      `}</style>

      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#185FA5",
          flexShrink: 0,
          animation: "aura-pulse 1.5s ease-in-out infinite",
        }}
      />
    </>
  );
}