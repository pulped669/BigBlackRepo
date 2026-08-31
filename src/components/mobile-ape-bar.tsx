import { usePrices, fmtBbc, fmtPct } from "@/components/price-provider";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

export function MobileApeBar({ onBuy }: { onBuy: () => void }) {
  const { bbc, bbcChg } = usePrices();
  const up = bbcChg >= 0;
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-bg/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-mono text-2xs text-subtle">{SITE.ticker}</p>
          <p className="font-mono text-sm text-fg tabular">
            {fmtBbc(bbc)}{" "}
            <span className={cn(up ? "text-up" : "text-down")}>{fmtPct(bbcChg)}</span>
          </p>
        </div>
        <button
          type="button"
          onClick={onBuy}
          className="h-11 rounded-full bg-chrome px-5 text-sm font-medium text-chrome-fg active:scale-[0.96]"
        >
          Ape in
        </button>
      </div>
    </div>
  );
}
