import { useEffect } from "react";

export const SITE_URL = "https://www.jollytech.shop";
export const SITE_NAME = "JollyTech";
export const OG_IMAGE = `${SITE_URL}/media/jollytech-og.jpg`;

export type SeoDefinition = {
  title: string;
  description: string;
  /** path portion of the canonical URL, e.g. "/pricing" */
  path: string;
  /** optional JSON-LD schema objects for this page */
  schema?: Record<string, unknown>[];
};

function upsertMeta(
  attr: "name" | "property",
  key: string,
  content: string,
): void {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * useSeo — per-route document head management.
 * Sets title, meta description, canonical URL, Open Graph and Twitter
 * tags, and injects/removes page-scoped JSON-LD structured data.
 */
export function useSeo(seo: SeoDefinition): void {
  useEffect(() => {
    const url = `${SITE_URL}${seo.path === "/" ? "" : seo.path}`;

    document.title = seo.title;
    upsertMeta("name", "description", seo.description);
    upsertMeta("name", "robots", "index, follow, max-image-preview:large");
    upsertLink("canonical", url);

    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:title", seo.title);
    upsertMeta("property", "og:description", seo.description);
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:image", OG_IMAGE);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:url", url);
    upsertMeta("name", "twitter:title", seo.title);
    upsertMeta("name", "twitter:description", seo.description);
    upsertMeta("name", "twitter:image", OG_IMAGE);

    // page-scoped JSON-LD (marked so route changes can remove it)
    const schemaId = "zx-page-schema";
    document.getElementById(schemaId)?.remove();
    if (seo.schema?.length) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = schemaId;
      script.textContent = JSON.stringify(
        seo.schema.length === 1 ? seo.schema[0] : seo.schema,
      );
      document.head.appendChild(script);
    }
  }, [seo.title, seo.description, seo.path, seo.schema]);
}
