import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { SITE } from "@/lib/site";
import { CoinMark } from "@/components/coin-mark";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function BuyModal({ open, onOpenChange }: Props) {
  const [copied, setCopied] = useState(false);
  const [amount, setAmount] = useState("100");

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
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-bg/85" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-[90] w-[min(92vw,32rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-surface p-6 shadow-panel hairline sm:p-8">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-elevated">
              <CoinMark className="size-5 text-chrome" />
            </span>
            <div>
              <Dialog.Title className="font-display text-2xl text-fg">
                Buy {SITE.ticker}
              </Dialog.Title>
              <Dialog.Description className="text-sm text-muted">
                Ceremonial desk. No swap executes from this page.
              </Dialog.Description>
            </div>
          </div>

          <label className="mt-8 block">
            <span className="font-mono text-2xs tracking-[0.18em] text-subtle uppercase">
              Amount (USDC)
            </span>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
              inputMode="decimal"
              className="mt-2 h-12 w-full rounded-lg bg-bg px-4 font-mono text-fg outline-none hairline focus:shadow-[inset_0_0_0_1px_var(--color-chrome)]"
            />
          </label>

          <div className="mt-4 rounded-lg bg-bg px-4 py-3">
            <p className="font-mono text-2xs tracking-[0.18em] text-subtle uppercase">
              Contract
            </p>
            <p className="mt-1 break-all font-mono text-xs text-fg">{SITE.ca}</p>
          </div>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => void copy()}
              className="h-11 flex-1 rounded-full text-sm text-fg hairline transition-colors hover:bg-elevated"
            >
              {copied ? "Copied" : "Copy contract"}
            </button>
            <a
              href="https://robinhood.com/us/en/chain/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-chrome text-sm font-medium text-chrome-fg transition-transform active:scale-[0.96]"
            >
              Robinhood Chain
            </a>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-subtle">
            {SITE.ticker} is a memecoin. Not a security. Not affiliated with BlackBerry
            Limited or Robinhood Markets. You can lose everything. You probably will.
          </p>
          <Dialog.Close asChild>
            <button
              type="button"
              className="absolute top-4 right-4 grid size-11 place-items-center rounded-full text-muted transition-colors hover:text-fg"
              aria-label="Close"
            >
              <CloseIcon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path
        d="M1 1l12 12M13 1 1 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
