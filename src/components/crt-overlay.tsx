import { useEffect, useRef, useState } from "react";

const SNOW_W = 160;
const SNOW_H = 90;

function paintSnow(ctx: CanvasRenderingContext2D, data: ImageData) {
  const pix = data.data;
  for (let i = 0; i < pix.length; i += 4) {
    const n = Math.random();
    if (n > 0.38) {
      pix[i] = 4;
      pix[i + 1] = 4;
      pix[i + 2] = 6;
      pix[i + 3] = 90 + n * 165;
    } else {
      pix[i] = 0;
      pix[i + 1] = 0;
      pix[i + 2] = 0;
      pix[i + 3] = 0;
    }
  }
  ctx.putImageData(data, 0, 0);
}

export function CrtOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    canvas.width = SNOW_W;
    canvas.height = SNOW_H;
    const image = ctx.createImageData(SNOW_W, SNOW_H);

    paintSnow(ctx, image);
    if (still) return;

    let raf = 0;
    let live = true;
    const tick = () => {
      if (!live) return;
      if (!document.hidden) paintSnow(ctx, image);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      live = false;
      cancelAnimationFrame(raf);
    };
  }, [still]);

  return (
    <div className={still ? "crt-overlay is-still" : "crt-overlay"} aria-hidden="true">
      <canvas ref={canvasRef} className="crt-snow" />
      <div className="crt-scanlines" />
      <div className="crt-phosphor" />
      <div className="crt-roll" />
      <div className="crt-glitch">
        <span className="crt-glitch-a" />
        <span className="crt-glitch-b" />
        <span className="crt-glitch-c" />
      </div>
      <div className="crt-vignette" />
      <div className="crt-glass" />
      <div className="crt-flicker" />
    </div>
  );
}
