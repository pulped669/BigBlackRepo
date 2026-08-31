import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { SITE } from "@/lib/site";

const SERIES = 84;

export type Prices = {
  bb: number;
  bbc: number;
  bbChg: number;
  bbcChg: number;
  seriesBb: number[];
  seriesBbc: number[];
};

const PriceContext = createContext<Prices | null>(null);

function flat(start: number, n: number) {
  return Array.from({ length: n }, () => start);
}

export function PriceProvider({ children }: { children: ReactNode }) {
  const bb0 = SITE.bbPrice;
  const bbc0 = bb0 / SITE.bbcPegRatio;
  const seriesBb = useRef(flat(bb0, SERIES));
  const seriesBbc = useRef(flat(bbc0, SERIES));
  const openBb = useRef(bb0);
  const openBbc = useRef(bbc0);

  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      const bb = seriesBb.current[seriesBb.current.length - 1] ?? bb0;
      const bbc = seriesBbc.current[seriesBbc.current.length - 1] ?? bbc0;
      const nextBb = Math.max(0.5, bb * (1 + (Math.random() - 0.49) * 0.004));
      const peg = nextBb / SITE.bbcPegRatio;
      const nextBbc = Math.max(
        0.000001,
        bbc * 0.55 + peg * 0.45 + (Math.random() - 0.48) * peg * 0.08,
      );
      seriesBb.current = [...seriesBb.current.slice(1), nextBb];
      seriesBbc.current = [...seriesBbc.current.slice(1), nextBbc];
      setTick((t) => t + 1);
    }, 900);
    return () => window.clearInterval(id);
  }, [bb0, bbc0]);

  const value = useMemo<Prices>(() => {
    const bb = seriesBb.current[seriesBb.current.length - 1] ?? bb0;
    const bbc = seriesBbc.current[seriesBbc.current.length - 1] ?? bbc0;
    return {
      bb,
      bbc,
      bbChg: (bb - openBb.current) / openBb.current,
      bbcChg: (bbc - openBbc.current) / openBbc.current,
      seriesBb: seriesBb.current,
      seriesBbc: seriesBbc.current,
    };
  }, [tick, bb0, bbc0]);

  return <PriceContext.Provider value={value}>{children}</PriceContext.Provider>;
}

export function usePrices() {
  const ctx = useContext(PriceContext);
  if (!ctx) throw new Error("usePrices must be used inside PriceProvider");
  return ctx;
}

export function fmtUsd(n: number, digits = 2) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function fmtBbc(n: number) {
  if (n < 0.01) return `$${n.toFixed(6)}`;
  return fmtUsd(n, 4);
}

export function fmtPct(n: number) {
  const sign = n >= 0 ? "+" : "";
  return `${sign}${(n * 100).toFixed(2)}%`;
}
