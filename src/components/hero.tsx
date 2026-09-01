import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { LoadingScreen } from "@/components/loading-screen";
import { TopCoins } from "@/components/top-coins";

const CoinCanvas = lazy(() =>
  import("@/components/coin-canvas").then((m) => ({ default: m.CoinCanvas })),
);

export function Hero() {
  const [booted, setBooted] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  const markReady = useCallback(() => setSceneReady(true), []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    setBooted(true);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <section
      className="relative h-[100dvh] w-full overflow-hidden bg-white"
      aria-busy={!sceneReady}
    >
      <h1 className="sr-only">Big Black Coin</h1>
      {sceneReady ? <TopCoins /> : null}
      {booted ? (
        <div className={sceneReady ? "absolute inset-0" : "invisible absolute inset-0"}>
          <Suspense fallback={null}>
            <CoinCanvas reducedMotion={reduced} onReady={markReady} />
          </Suspense>
        </div>
      ) : null}
      {sceneReady ? null : <LoadingScreen />}
    </section>
  );
}
