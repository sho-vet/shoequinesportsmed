import { clsx } from "clsx";

/**
 * Placeholder isotype: a minimal horse-head silhouette. Swap for the real
 * SHO brand mark (e.g. public/logo.svg) when it's ready — everything that
 * renders <Logo /> will pick it up without further changes.
 */
export function Logo({ className, mono }: { className?: string; mono?: boolean }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={clsx("h-8 w-8", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M30.5 4c-4.8 0-8.9 3.1-10.4 7.4-2.6.4-4.9 1.8-6.4 3.9L8 22.5c-.6.8-.2 2 .8 2.2l3.7.8-1.1 9.6c-.1 1 .7 1.9 1.7 1.9h4.4c.9 0 1.6-.6 1.8-1.5l1-4.5h7.4l1 4.5c.2.9.9 1.5 1.8 1.5h4.4c1 0 1.8-.9 1.7-1.9l-1.6-14c-.3-2.6-1.5-5-3.4-6.8 1-1.1 1.6-2.6 1.6-4.3C33.2 6.4 32.1 4 30.5 4Z"
        className={mono ? "fill-current" : "fill-navy"}
      />
      <circle cx="28.5" cy="12.5" r="1.4" className={mono ? "fill-white" : "fill-white"} />
    </svg>
  );
}
