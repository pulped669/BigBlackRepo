import { CoinMark } from "@/components/coin-mark";
import { usePrices, fmtBbc, fmtPct } from "@/components/price-provider";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Nav({ onBuy }: { onBuy: () => void }) {
  const { bbc, bbcChg } = usePrices();
  const up = bbcChg >= 0;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6">
        <a href="#top" className="flex items-center gap-2.5 text-fg">
          <span className="grid size-8 place-items-center rounded-md bg-elevated hairline">
            <CoinMark className="size-5 text-chrome" />
          </span>
          <span className="font-display text-xl tracking-tight sm:text-2xl">BBC</span>
        </a>

        <nav className="hidden items-center gap-7 text-sm text-muted md:flex">
          <a href="#lore" className="transition-colors duration-150 hover:text-fg">
            Lore
          </a>
          <a href="#peg" className="transition-colors duration-150 hover:text-fg">
            The Peg
          </a>
          <a href="#keys" className="transition-colors duration-150 hover:text-fg">
            Seven Keys
          </a>
          <a href="#desk" className="transition-colors duration-150 hover:text-fg">
            Desk
          </a>
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden items-baseline gap-2 font-mono text-xs sm:flex">
            <span className="text-subtle">{SITE.ticker}</span>
            <span className="tabular text-fg">{fmtBbc(bbc)}</span>
            <span className={cn("tabular", up ? "text-up" : "text-down")}>{fmtPct(bbcChg)}</span>
          </div>
          <button
            type="button"
            onClick={onBuy}
            className="h-10 rounded-full bg-chrome px-4 text-sm font-medium text-chrome-fg transition-transform duration-150 ease-out hover:brightness-110 active:scale-[0.96] sm:px-5"
          >
            Ape in
          </button>
        </div>
      </div>
    </header>
  );
}
