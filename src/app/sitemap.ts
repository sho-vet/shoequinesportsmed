import type { MetadataRoute } from "next";
import { articulos } from "@/data/articulos";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/educacion-continuada", "/contacto", "/pagos", "/privacidad", "/terminos", "/login"].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
    })
  );

  const articleRoutes = articulos.map((a) => ({
    url: `${SITE_URL}/educacion-continuada/${a.slug}`,
    lastModified: new Date(a.fecha),
  }));

  // /portal and its sub-routes are intentionally excluded — private, authenticated content.
  return [...staticRoutes, ...articleRoutes];
}
