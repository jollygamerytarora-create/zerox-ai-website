import { SITE_NAME, SITE_URL, type SeoDefinition } from "./seo";

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  alternateName: "Jolly Tech",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon-192.png`,
  sameAs: [
    "https://youtube.com/@jollygamerytog",
    "https://www.instagram.com/divyyam_arora",
    "https://thejollypodcast.wordpress.com/",
    "https://website.beacons.ai/divyamarora",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${SITE_NAME} — Zerox AI`,
  alternateName: ["Zerox", "Zerox AI", "JollyTech"],
  url: SITE_URL,
};

const appSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Zerox AI",
  alternateName: "Zerox",
  description:
    "Zerox AI by JollyTech is a personal AI assistant for Windows with voice control, desktop automation, computer vision and AI image generation.",
  operatingSystem: "Windows",
  applicationCategory: "UtilitiesApplication",
  offers: { "@type": "Offer", price: "59", priceCurrency: "INR" },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "1500",
  },
  brand: { "@type": "Brand", name: SITE_NAME },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Zerox AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zerox AI is a voice-controlled desktop AI assistant by JollyTech that automates files, apps, messages and system commands.",
      },
    },
    {
      "@type": "Question",
      name: "How much does Zerox AI cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Plans start at ₹59/week. Monthly is ₹199, quarterly ₹599, yearly ₹999, and lifetime ₹2999 (₹2599 for students).",
      },
    },
    {
      "@type": "Question",
      name: "Is there a free trial?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — redeem codes like Zerox100 on the pricing page give free access to the yearly and lifetime plans.",
      },
    },
  ],
};

const breadcrumb = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: `${SITE_URL}${it.path === "/" ? "" : it.path}`,
  })),
});

export const SEO: Record<string, SeoDefinition> = {
  "/": {
    title: `Zerox AI — Personal AI Assistant for Your Desktop | ${SITE_NAME}`,
    description:
      "Zerox AI by JollyTech is your personal AI assistant for Windows: voice control, desktop automation, computer vision and AI image generation in one system. Trusted by 1500+ users. Plans from ₹59/week.",
    path: "/",
    schema: [orgSchema, websiteSchema, appSchema, faqSchema],
  },
  "/features": {
    title: `Zerox AI Features — 27 Personal Assistant Capabilities | ${SITE_NAME}`,
    description:
      "Explore all 27 Zerox AI capabilities: voice control, desktop automation, computer vision, AI image generation, plugins, live camera assistance and more. Your personal AI assistant, in full.",
    path: "/features",
    schema: [
      appSchema,
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Features", path: "/features" },
      ]),
    ],
  },
  "/pricing": {
    title: `Zerox AI Pricing — Lifetime ₹2999 & Student ₹2599 Plans | ${SITE_NAME}`,
    description:
      "Get the Zerox AI personal assistant for life: ₹2999 (₹2599 students) or redeem a code for free. One-time payment, lifetime updates, all 27 capabilities included.",
    path: "/pricing",
    schema: [
      appSchema,
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Pricing", path: "/pricing" },
      ]),
    ],
  },
  "/monthly-pricing": {
    title: `Zerox AI Subscriptions — Weekly to Yearly from ₹59 | ${SITE_NAME}`,
    description:
      "Flexible Zerox AI assistant subscriptions: weekly ₹59, monthly ₹199, quarterly ₹599, yearly ₹999. Cancel anytime, every plan includes all 27 capabilities.",
    path: "/monthly-pricing",
    schema: [
      appSchema,
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Subscriptions", path: "/monthly-pricing" },
      ]),
    ],
  },
  "/demo": {
    title: `Book a Live Zerox AI Demo — See Your Personal Assistant Work | ${SITE_NAME}`,
    description:
      "See Zerox AI run your desktop live. Book a free personalized demo and watch voice control, automation and vision in action.",
    path: "/demo",
    schema: [
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Demo", path: "/demo" },
      ]),
    ],
  },
  "/contact": {
    title: `Contact JollyTech — Zerox AI Support & Sales | ${SITE_NAME}`,
    description:
      "Questions about Zerox AI? Reach the JollyTech team for support, sales, partnerships or press. Fast replies on WhatsApp and email.",
    path: "/contact",
    schema: [
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ]),
    ],
  },
  "/tools": {
    title: `Free Online AI Tools by JollyTech — QR, Images & More | ${SITE_NAME}`,
    description:
      "Free browser tools from the makers of Zerox AI: QR code generator, AI image generator, print margin checker and more. Free to use, no sign-up needed.",
    path: "/tools",
    schema: [
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Free Tools", path: "/tools" },
      ]),
    ],
  },
};
