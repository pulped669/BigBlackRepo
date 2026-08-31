import { lazy, Suspense, useEffect, useState } from "react";
import { TopCoins } from "@/components/top-coins";

const CoinCanvas = lazy(() =>
  import("@/components/coin-canvas").then((m) => ({ default: m.CoinCanvas })),
);

function CoinFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <img
        src="/coin-cutout.png"
        alt="Big Black Coin"
        className="w-[min(78vw,36rem)] drop-shadow-2xl"
      />
    </div>
  );
}

export function Hero() {
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    setReady(true);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-white">
      <h1 className="sr-only">Big Black Coin</h1>
      <TopCoins />
      {ready ? (
        <Suspense fallback={<CoinFallback />}>
          <CoinCanvas reducedMotion={reduced} />
        </Suspense>
      ) : (
        <CoinFallback />
      )}
    </section>
  );
}
