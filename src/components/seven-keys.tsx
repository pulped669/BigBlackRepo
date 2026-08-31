import { KEYS } from "@/lib/site";
import { CoinMark } from "@/components/coin-mark";

export function SevenKeys() {
  return (
    <section id="keys" className="relative overflow-hidden bg-bg">
      <img
        src="/pills-macro.jpg"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/85 to-bg" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-2xs tracking-[0.28em] text-chrome uppercase">
              03 — Seven keys
            </p>
            <h2 className="mt-5 font-display text-4xl text-fg sm:text-display-sm">
              The only roadmap
              <br />
              that ever shipped.
            </h2>
          </div>
          <CoinMark className="size-16 text-chrome sm:size-20" />
        </div>

        <ol className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {KEYS.map((k) => (
            <li key={k.n} className="flex flex-col rounded-xl bg-surface/90 p-5 hairline sm:min-h-52">
              <span className="font-mono text-2xs text-chrome">{k.n}</span>
              <h3 className="mt-4 font-display text-2xl text-fg">{k.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{k.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
