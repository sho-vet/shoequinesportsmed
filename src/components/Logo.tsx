import { clsx } from "clsx";
import Image from "next/image";

/**
 * Real SHO brand mark (public/brand/logo-mark.png): a horse head cut in
 * negative space from a black diamond. Currently a plain JPG/PNG export on
 * white — ask for a transparent PNG/SVG export if the mark ever needs to
 * sit on a dark background (it isn't used on one today).
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={clsx("relative block h-8 w-8 shrink-0", className)}>
      <Image src="/brand/logo-mark.png" alt="" fill sizes="32px" className="object-contain" priority />
    </span>
  );
}
