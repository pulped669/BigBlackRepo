import { CoinMark } from "@/components/coin-mark";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <CoinMark className="size-7 text-chrome" />
              <span className="font-display text-3xl text-fg">{SITE.ticker}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted">
              {SITE.name}. The stock that learned to mint. Seven keys. Robinhood Chain.
              Culturally tied to {SITE.pegName} {SITE.pegTicker}.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-16">
            <FooterCol
              title="On this disc"
              links={[
                ["Lore", "#lore"],
                ["The Peg", "#peg"],
                ["Seven Keys", "#keys"],
                ["Desk", "#desk"],
              ]}
            />
            <FooterCol
              title="Elsewhere"
              links={[
                ["Robinhood Chain", "https://robinhood.com/us/en/chain/"],
                ["$BB on NYSE", "https://finance.yahoo.com/quote/BB/"],
              ]}
            />
            <FooterCol
              title="Ticker"
              links={[
                [SITE.ticker, "#top"],
                [SITE.pegTicker, "#peg"],
              ]}
            />
          </div>
        </div>

        <div className="mt-16 max-w-3xl space-y-3 text-xs leading-relaxed text-subtle">
          <p>
            {SITE.ticker} is a memecoin created for entertainment. It is not a security, not
            an investment contract, and not a tokenized share of BlackBerry Limited. It is
            not issued, endorsed, or affiliated with BlackBerry Limited, Robinhood Markets,
            Inc., or any of their subsidiaries. Mentions of {SITE.pegTicker}, NYSE, and
            Robinhood Chain describe a cultural theme, not a legal peg, wrap, or claim on
            any equity.
          </p>
          <p>
            Nothing on this site is an offer to sell or a solicitation to buy any security
            or token. Crypto assets are volatile. You can lose all of your money. Past
            performance of a stock that once made phones is not indicative of anything
            useful. Do your own research, then do less of it.
          </p>
        </div>
        <p className="mt-10 font-mono text-2xs tracking-[0.18em] text-subtle uppercase">
          {SITE.name} · {SITE.ticker} · 2026
        </p>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: Array<[string, string]> }) {
  return (
    <div>
      <p className="font-mono text-2xs tracking-[0.2em] text-subtle uppercase">{title}</p>
      <ul className="mt-3 space-y-2">
        {links.map(([label, href]) => (
          <li key={label}>
            <a
              href={href}
              className="text-sm text-muted transition-colors hover:text-fg"
              {...(href.startsWith("http")
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
