"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "sho-cookie-consent";
export type ConsentValue = "accepted" | "rejected";

function readConsent(): ConsentValue | null {
  try {
    return localStorage.getItem(STORAGE_KEY) as ConsentValue | null;
  } catch {
    return null;
  }
}

/** Dispatches a DOM event so <Analytics /> can react without prop drilling. */
function setConsent(value: ConsentValue) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Private browsing / blocked storage — the banner will just reappear next visit.
  }
  window.dispatchEvent(new CustomEvent<ConsentValue>("sho-consent-change", { detail: value }));
}

export function useCookieConsent() {
  const [consent, setLocalConsent] = useState<ConsentValue | null>(null);

  useEffect(() => {
    setLocalConsent(readConsent());
    const handler = (e: Event) => setLocalConsent((e as CustomEvent<ConsentValue>).detail);
    window.addEventListener("sho-consent-change", handler);
    return () => window.removeEventListener("sho-consent-change", handler);
  }, []);

  return consent;
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(readConsent() === null);
  }, []);

  if (!visible) return null;

  const choose = (value: ConsentValue) => {
    setConsent(value);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Preferencias de cookies"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-xl flex-col gap-4 rounded-card border border-line bg-white p-5 shadow-card sm:flex-row sm:items-center"
    >
      <p className="text-sm text-ink/80">
        Usamos cookies esenciales y, con tu permiso, analíticas para mejorar el sitio. Consulta nuestra{" "}
        <a href="/privacidad" className="font-medium text-navy underline underline-offset-2">
          Política de Privacidad
        </a>
        .
      </p>
      <div className="flex shrink-0 gap-2">
        <Button variant="secondary" onClick={() => choose("rejected")}>
          Rechazar
        </Button>
        <Button variant="primary" onClick={() => choose("accepted")}>
          Aceptar
        </Button>
      </div>
    </div>
  );
}
