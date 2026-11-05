import type { Metadata } from "next";

const SITE_NAME = "SHO Equine Sports Medicine";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.shoequinesportsmedicine.com";

interface PageMetaInput {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
}

/** Shared helper so every page gets a consistent title, description and OG/Twitter card. */
export function pageMetadata({ title, description, path = "", noIndex = false }: PageMetaInput): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      locale: "es_CO",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
    },
  };
}
