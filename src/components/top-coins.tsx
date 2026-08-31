import { SITE } from "@/lib/site";

function XMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-chrome">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.727-8.822L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function DexMark() {
  return (
    <img
      src="/dex-logo.png"
      alt=""
      className="h-7 w-7 object-contain"
      draggable={false}
    />
  );
}

function SpinCoin({
  href,
  label,
  reverse,
  children,
}: {
  href: string;
  label: string;
  reverse?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="link-coin"
    >
      <span className={reverse ? "link-coin-spin is-reverse" : "link-coin-spin"}>
        <span className="link-coin-face">{children}</span>
        <span className="link-coin-face is-back">{children}</span>
      </span>
    </a>
  );
}

export function TopCoins() {
  return (
    <nav
      className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center pt-5"
      aria-label="Social"
    >
      <div className="pointer-events-auto flex items-center gap-5">
        <SpinCoin href={SITE.xUrl} label="Big Black Coin on X">
          <XMark />
        </SpinCoin>
        <SpinCoin href={SITE.dexUrl} label="Big Black Coin on Dexscreener" reverse>
          <DexMark />
        </SpinCoin>
      </div>
    </nav>
  );
}
