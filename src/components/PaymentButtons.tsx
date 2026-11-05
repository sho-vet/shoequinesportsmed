import { ButtonLink } from "@/components/ui/Button";
import type { PaisPago } from "@/types";

const PAISES: { code: PaisPago; label: string; envVar: string | undefined }[] = [
  { code: "CO", label: "Colombia (COP)", envVar: process.env.NEXT_PUBLIC_PAYMENT_LINK_CO },
  { code: "EC", label: "Ecuador (USD)", envVar: process.env.NEXT_PUBLIC_PAYMENT_LINK_EC },
  { code: "PE", label: "Perú (PEN)", envVar: process.env.NEXT_PUBLIC_PAYMENT_LINK_PE },
  { code: "US", label: "Estados Unidos (USD)", envVar: process.env.NEXT_PUBLIC_PAYMENT_LINK_US },
];

/**
 * Each button points at a real checkout link for a payment processor you
 * configure per country (e.g. Wompi/PayU/ePayco for CO, PayPal/Stripe for
 * US). Set NEXT_PUBLIC_PAYMENT_LINK_* in .env.local — no payment keys or
 * card data are ever handled by this app directly.
 */
export function PaymentButtons() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {PAISES.map((pais) =>
        pais.envVar ? (
          <ButtonLink key={pais.code} href={pais.envVar} variant="secondary" external>
            Pagar — {pais.label}
          </ButtonLink>
        ) : (
          <span
            key={pais.code}
            className="inline-flex items-center justify-center rounded-card border border-dashed border-line px-5 py-2.5 text-sm text-ink/40"
            aria-disabled="true"
          >
            {pais.label} — próximamente
          </span>
        )
      )}
    </div>
  );
}
