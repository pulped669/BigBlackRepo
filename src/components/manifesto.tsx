export function Manifesto() {
  return (
    <section id="lore" className="relative overflow-hidden bg-bg">
      <img
        src="/coin-space.jpg"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/80 to-bg" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
        <p className="font-mono text-2xs tracking-[0.28em] text-chrome uppercase">01 — Manifesto</p>
        <h2 className="mt-5 max-w-5xl font-display text-4xl text-fg sm:text-display-sm">
          BlackBerry did not die.
          <br />
          It waited for a chain.
        </h2>
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="max-w-xl space-y-5 text-base leading-relaxed text-muted lg:col-span-7 sm:text-lg">
            <p>
              A generation learned to write on seven keys. Then the phone left, the stock
              stayed, and the internet did what the internet does — it refused the funeral.
            </p>
            <p>
              <span className="text-fg">Big Black Coin</span> is the on-chain twin of that
              refusal. Same initials as the equity. Same chrome mark. Different settlement
              layer. It lives on Robinhood Chain, the L2 they built so Wall Street could
              stay open after bedtime.
            </p>
            <p>
              This is not a wrap. Not a note. Not a product of BlackBerry Limited or
              Robinhood Markets. It is what happens when a ticker becomes a joke, and the
              joke becomes a lifestyle, and the lifestyle learns to mint.
            </p>
          </div>
          <aside className="lg:col-span-5">
            <blockquote className="rounded-2xl bg-surface/80 p-6 hairline sm:p-8">
              <p className="font-display text-3xl text-fg sm:text-4xl">
                Seven keys.
                <br />
                One disc.
                <br />
                Infinite copium.
              </p>
              <p className="mt-6 font-mono text-xs tracking-[0.2em] text-subtle uppercase">
                — the only whitepaper
              </p>
            </blockquote>
          </aside>
        </div>
      </div>
    </section>
  );
}
