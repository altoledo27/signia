import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage"; // Asegúrate de que la ruta del archivo sea correcta
import AuraSystem from "./pages/AuraSystem";   // El componente donde está la IA y la cámara

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/traductor" element={<AuraSystem />} />
      </Routes>
    </BrowserRouter>
  );
}