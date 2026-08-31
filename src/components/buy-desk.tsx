import { useState } from "react";
import { SITE } from "@/lib/site";
import { CoinMark } from "@/components/coin-mark";

const STEPS = [
  {
    n: "01",
    title: "Get a wallet that speaks Robinhood Chain",
    body: "Any EVM wallet. The chain is an Arbitrum L2 built for tokenized markets and the jokes that follow them.",
  },
  {
    n: "02",
    title: "Bridge whatever you still believe in",
    body: "ETH or USDC. If you are bridging a feeling, it will not clear. Try a stablecoin.",
  },
  {
    n: "03",
    title: `Swap into ${SITE.ticker}`,
    body: "Paste the contract. Check the seven keys on the logo. If you see a different fruit, you are in the wrong decade.",
  },
  {
    n: "04",
    title: "Hold like it's 2008 and you still have a trackpad",
    body: "No roadmap. No unlock. No quarterly. Just a disc, a ticker, and the refusal to die.",
  },
];

export function BuyDesk({ onBuy }: { onBuy: () => void }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.ca);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="desk" className="bg-bg">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
        <p className="font-mono text-2xs tracking-[0.28em] text-chrome uppercase">06 — The desk</p>
        <h2 className="mt-5 font-display text-4xl text-fg sm:text-display-sm">
          How to ape
          <br />
          without a brochure.
        </h2>

        <ol className="mt-14 grid gap-3 md:grid-cols-2">
          {STEPS.map((s) => (
            <li key={s.n} className="rounded-xl bg-surface p-6">
              <span className="font-mono text-2xs text-chrome">{s.n}</span>
              <h3 className="mt-3 font-display text-2xl text-fg">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col gap-4 rounded-2xl bg-elevated p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-bg">
              <CoinMark className="size-6 text-chrome" />
            </span>
            <div>
              <p className="font-mono text-2xs tracking-[0.2em] text-subtle uppercase">
                Contract · ceremonial
              </p>
              <p className="mt-1 break-all font-mono text-xs text-fg sm:text-sm">{SITE.ca}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void copy()}
              className="h-11 rounded-full px-5 text-sm text-fg hairline transition-colors duration-150 hover:bg-surface"
            >
              {copied ? "Copied" : "Copy CA"}
            </button>
            <button
              type="button"
              onClick={onBuy}
              className="h-11 rounded-full bg-chrome px-5 text-sm font-medium text-chrome-fg transition-transform duration-150 hover:brightness-110 active:scale-[0.96]"
            >
              Open buy desk
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
