import { useState } from "react";
import LandingPage from "./LandingPage";
import Translator from "./Translator";

export default function App() {
  const [started, setStarted] = useState(false);

  return started ? (
    <Translator onBack={() => setStarted(false)} />
  ) : (
    <LandingPage onStart={() => setStarted(true)} />
  );
}