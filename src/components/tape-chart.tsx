import { useEffect, useRef } from "react";
import { usePrices, fmtBbc, fmtUsd, fmtPct } from "@/components/price-provider";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

export function TapeChart() {
  const prices = usePrices();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    const w = parent?.clientWidth ?? 800;
    const h = 280;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.fillStyle = "#0c0c0e";
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = "#222226";
    ctx.lineWidth = 1;
    for (let i = 1; i < 5; i++) {
      const y = (h / 5) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const draw = (series: number[], color: string, width: number) => {
      if (series.length < 2) return;
      const min = Math.min(...series);
      const max = Math.max(...series);
      const span = max - min || 1;
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      series.forEach((v, i) => {
        const x = (i / (series.length - 1)) * w;
        const y = h - 16 - ((v - min) / span) * (h - 32);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    };

    draw(prices.seriesBb, "#5a5a60", 1.25);
    draw(prices.seriesBbc, "#c8ccd4", 2);
  }, [prices]);

  return (
    <section className="bg-bg">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-2xs tracking-[0.28em] text-chrome uppercase">
              05 — The tape
            </p>
            <h2 className="mt-5 font-display text-4xl text-fg sm:text-display-sm">
              Simulated coupling.
            </h2>
          </div>
          <div className="flex gap-6 font-mono text-xs">
            <Legend swatch="bg-subtle" label={`${SITE.pegTicker} ${fmtUsd(prices.bb)}`} />
            <Legend swatch="bg-chrome" label={`${SITE.ticker} ${fmtBbc(prices.bbc)}`} />
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl bg-surface hairline">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3">
            <p className="font-mono text-2xs tracking-[0.2em] text-subtle uppercase">
              RHCHAIN / NYSE · ceremonial feed
            </p>
            <p
              className={cn(
                "font-mono text-xs tabular",
                prices.bbcChg >= 0 ? "text-up" : "text-down",
              )}
            >
              {SITE.ticker} {fmtPct(prices.bbcChg)}
            </p>
          </div>
          <canvas ref={canvasRef} className="block w-full" />
        </div>
        <p className="mt-4 text-sm text-subtle">
          Not a live market. Numbers wander so the page feels awake. Do not trade this
          chart. It does not know you exist.
        </p>
      </div>
    </section>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="flex items-center gap-2 text-muted">
      <span className={cn("size-2 rounded-full", swatch)} />
      {label}
    </span>
  );
}
