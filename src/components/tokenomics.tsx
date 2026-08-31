import { SITE } from "@/lib/site";

const ROWS = [
  { k: "Ticker", v: SITE.ticker },
  { k: "Chain", v: SITE.chain },
  { k: "Supply", v: SITE.supply },
  { k: "Tax", v: `${SITE.tax} (in / out)` },
  { k: "LP", v: SITE.lp },
  { k: "Team", v: `${SITE.team}. The coin is the team.` },
  { k: "Peg", v: `Cultural. Tracks ${SITE.pegTicker} like a rumor.` },
  { k: "CA", v: SITE.ca },
];

export function Tokenomics() {
  return (
    <section id="tokenomics" className="relative overflow-hidden bg-bg">
      <img
        src="/coin-stack.jpg"
        alt="A heap of Big Black Coins"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-bg/40" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-6 sm:py-32 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="font-mono text-2xs tracking-[0.28em] text-chrome uppercase">
            04 — Tokenomics
          </p>
          <h2 className="mt-5 font-display text-4xl text-fg sm:text-display-sm">
            A prospectus written
            <br />
            in a straight face.
          </h2>
          <p className="mt-6 max-w-md text-muted">
            Seven billion. Zero tax. Liquidity burned like a voicemail you will never
            retrieve. If you need a pie chart, you are already lost.
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl bg-surface/90 hairline">
          <table className="w-full text-left">
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.k} className="border-b border-line last:border-0">
                  <th className="w-28 px-5 py-3.5 font-mono text-2xs tracking-[0.18em] text-subtle uppercase sm:w-36">
                    {row.k}
                  </th>
                  <td className="px-5 py-3.5 font-mono text-xs text-fg break-all sm:text-sm">
                    {row.v}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
