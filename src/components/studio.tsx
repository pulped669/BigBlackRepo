import { lazy, Suspense, useEffect, useState } from "react";

const CoinCanvas = lazy(() =>
  import("@/components/coin-canvas").then((m) => ({ default: m.CoinCanvas })),
);

export function Studio() {
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    setReady(true);
  }, []);

  return (
    <section className="bg-bg">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="relative min-h-[28rem] overflow-hidden rounded-2xl bg-surface sm:min-h-[36rem]">
          {ready ? (
            <Suspense
              fallback={
                <img
                  src="/coin-void.jpg"
                  alt="Big Black Coin"
                  className="h-full w-full object-contain"
                />
              }
            >
              <CoinCanvas variant="studio" reducedMotion={reduced} />
            </Suspense>
          ) : (
            <img
              src="/coin-void.jpg"
              alt="Big Black Coin"
              className="h-full w-full object-contain"
            />
          )}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
            <p className="font-mono text-2xs tracking-[0.22em] text-subtle uppercase">
              Drag to inspect · reverse reads $BBC
            </p>
            <p className="hidden font-mono text-2xs text-subtle sm:block">SEVEN KEYS</p>
          </div>
        </div>
      </div>
    </section>
  );
}
