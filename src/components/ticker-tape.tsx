import { TAPE } from "@/lib/site";

export function TickerTape() {
  const row = [...TAPE, ...TAPE];
  return (
    <div className="relative z-20 overflow-hidden border-y border-line bg-surface">
      <div className="marquee py-3">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center">
            {row.map((item, i) => (
              <span
                key={`${dup}-${i}`}
                className="flex items-center font-mono text-xs tracking-[0.22em] text-muted uppercase"
              >
                <span className="px-5">{item}</span>
                <span className="text-subtle" aria-hidden="true">
                  ·
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
