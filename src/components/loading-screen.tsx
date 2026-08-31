import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [dots, setDots] = useState(1);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (still) {
      setDots(3);
      return;
    }
    const id = window.setInterval(() => {
      setDots((n) => (n % 3) + 1);
    }, 380);
    return () => window.clearInterval(id);
  }, [still]);

  return (
    <div className="loading-screen" role="status" aria-live="polite">
      <p className={still ? "loading-text is-still" : "loading-text"} aria-hidden="true">
        <span className="loading-word">Loading</span>
        <span className="loading-dots">{".".repeat(dots)}</span>
      </p>
      <span className="sr-only">Loading</span>
    </div>
  );
}
