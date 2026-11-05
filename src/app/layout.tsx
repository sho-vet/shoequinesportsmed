import type { Metadata, Viewport } from "next";
import { Analytics } from "@/components/Analytics";
import { CookieConsent } from "@/components/CookieConsent";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SHO Equine Sports Medicine",
    template: "%s | SHO Equine Sports Medicine",
  },
  description:
    "Clínica de medicina deportiva equina: diagnóstico, rehabilitación y seguimiento clínico para caballos de alto rendimiento.",
  icons: {
    icon: "/icon.svg",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B1F3A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="font-sans text-ink antialiased">
        {children}
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
