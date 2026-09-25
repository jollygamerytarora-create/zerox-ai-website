import { SITE_NAME, SITE_URL, type SeoDefinition } from "./seo";

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  sameAs: [],
};

const appSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Zerox AI",
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
    title: `Zerox AI — Voice-Controlled Desktop AI Assistant | ${SITE_NAME}`,
    description:
      "Zerox AI turns your desktop alive with intelligence: voice control, desktop automation, computer vision and AI image generation. Trusted by 1500+ users. Plans from ₹59/week.",
    path: "/",
    schema: [orgSchema, appSchema, faqSchema],
  },
  "/features": {
    title: `Features — 27 Capabilities of Zerox AI | ${SITE_NAME}`,
    description:
      "Explore all 27 Zerox AI capabilities: voice control, desktop automation, computer vision, AI image generation, plugins, live camera assistance and more.",
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
    title: `Pricing — Lifetime & Student Plans from ₹2599 | ${SITE_NAME}`,
    description:
      "Get Zerox AI lifetime access for ₹2999 (₹2599 students) or redeem a code for free. One-time payment, lifetime updates, all 27 capabilities included.",
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
    title: `Subscription Plans — Weekly to Yearly from ₹59 | ${SITE_NAME}`,
    description:
      "Flexible Zerox AI subscriptions: weekly ₹59, monthly ₹199, quarterly ₹599, yearly ₹999. Cancel anytime, every plan includes all 27 capabilities.",
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
    title: `Book a Live Demo of Zerox AI | ${SITE_NAME}`,
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
    title: `Contact JollyTech — Support & Sales | ${SITE_NAME}`,
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
    title: `Free Online Tools — QR, AI Images & More | ${SITE_NAME}`,
    description:
      "Free browser tools from JollyTech: QR code generator, AI image generator, print margin checker and more. Free to use, no sign-up needed.",
    path: "/tools",
    schema: [
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Free Tools", path: "/tools" },
      ]),
    ],
  },
};
