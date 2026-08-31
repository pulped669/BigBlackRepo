import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function CoinMark({ className }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("fill-current", className)}
      aria-hidden="true"
    >
      <rect x="8.6" y="5.2" width="6.2" height="5" rx="2" />
      <rect x="17.2" y="5.2" width="6.2" height="5" rx="2" />
      <rect x="4.4" y="13.5" width="6.2" height="5" rx="2" />
      <rect x="12.9" y="13.5" width="6.2" height="5" rx="2" />
      <rect x="21.4" y="13.5" width="6.2" height="5" rx="2" />
      <rect x="8.6" y="21.8" width="6.2" height="5" rx="2" />
      <rect x="17.2" y="21.8" width="6.2" height="5" rx="2" />
    </svg>
  );
}
