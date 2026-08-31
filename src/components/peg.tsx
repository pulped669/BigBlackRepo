import { SITE } from "@/lib/site";
import { usePrices, fmtUsd, fmtBbc, fmtPct } from "@/components/price-provider";
import { cn } from "@/lib/utils";

export function Peg() {
  const p = usePrices();
  return (
    <section id="peg" className="bg-bg">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
        <p className="font-mono text-2xs tracking-[0.28em] text-chrome uppercase">02 — The peg</p>
        <h2 className="mt-5 max-w-4xl font-display text-4xl text-fg sm:text-display-sm">
          Tied to {SITE.pegTicker} the way a shadow is tied to a body.
        </h2>
        <p className="mt-6 max-w-2xl text-muted">
          Robinhood Chain was built to put stocks onchain. {SITE.ticker} is the memetic
          overflow of that idea — culturally locked to BlackBerry, mechanically locked to
          nothing but liquidity and attention.
        </p>

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          <PegCard
            venue="NYSE"
            ticker={SITE.pegTicker}
            name={SITE.pegName}
            price={fmtUsd(p.bb)}
            chg={fmtPct(p.bbChg)}
            up={p.bbChg >= 0}
            points={["Equity", "Opens 9:30", "Closes like a coward", "SEC-shaped"]}
          />
          <PegCard
            venue={SITE.chainShort}
            ticker={SITE.ticker}
            name={SITE.name}
            price={fmtBbc(p.bbc)}
            chg={fmtPct(p.bbcChg)}
            up={p.bbcChg >= 0}
            featured
            points={["Memecoin", "24/7", "Seven keys", "No bedtime"]}
          />
        </div>

        <p className="mt-8 max-w-3xl text-sm text-subtle">
          Ratio is ceremonial: 1 {SITE.pegTicker} ≈ {SITE.bbcPegRatio.toLocaleString()}{" "}
          {SITE.ticker}. The tape below drifts. Do not confuse a vibe with a NAV.
        </p>
      </div>
    </section>
  );
}

function PegCard({
  venue,
  ticker,
  name,
  price,
  chg,
  up,
  points,
  featured,
}: {
  venue: string;
  ticker: string;
  name: string;
  price: string;
  chg: string;
  up: boolean;
  points: string[];
  featured?: boolean;
}) {
  return (
    <article
      className={cn(
        "rounded-2xl p-6 sm:p-8",
        featured ? "bg-elevated" : "bg-surface",
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-2xs tracking-[0.22em] text-subtle uppercase">{venue}</p>
        <p className={cn("font-mono text-xs tabular", up ? "text-up" : "text-down")}>{chg}</p>
      </div>
      <h3 className="mt-6 font-display text-5xl text-fg sm:text-6xl">{ticker}</h3>
      <p className="mt-2 text-sm text-muted">{name}</p>
      <p className="mt-8 font-mono text-2xl text-fg tabular sm:text-3xl">{price}</p>
      <ul className="mt-8 grid grid-cols-2 gap-2">
        {points.map((pt) => (
          <li
            key={pt}
            className="rounded-lg bg-bg/50 px-3 py-2 font-mono text-2xs tracking-wide text-muted uppercase"
          >
            {pt}
          </li>
        ))}
      </ul>
    </article>
  );
}
