export interface FAQ {
  keywords: string[];
  response: string;
  priority: number;
}

export const faqs: FAQ[] = [
  {
    keywords: [
      "features",
      "capabilities",
      "what can",
      "what does",
      "functions",
    ],
    response: `Zerox AI offers powerful capabilities including:
• Voice-controlled AI interaction
• Real-time speech-to-text and text-to-speech
• Computer vision and image analysis
• Desktop automation and system control
• WhatsApp and email automation
• File and photo search via voice
• Plugin-based expandable system

Visit our Features page to learn more!`,
    priority: 10,
  },
  {
    keywords: ["price", "pricing", "cost", "how much", "payment"],
    response: `We offer two lifetime plans:

1. Lifetime Access: ₹2999 (one-time payment)
2. Student Lifetime Plan: ₹2599 (one-time payment)
   * Student verification required

We also offer subscriptions on the Monthly Pricing page:
Weekly ₹59 · Monthly ₹199 · Quarterly ₹599 · Yearly ₹999

Both lifetime plans include lifetime updates and all core features!`,
    priority: 10,
  },
  {
    keywords: ["student", "verification", "verify", "student plan"],
    response: `The Student Lifetime Plan is available for ₹2599 and requires student verification.

After payment, you'll need to provide proof of student status (student ID, enrollment letter, etc.) via WhatsApp to complete verification.`,
    priority: 9,
  },
  {
    keywords: ["upi", "pay", "payment method", "how to pay"],
    response: `Payment is simple via UPI:

1. Use UPI ID: divyamarora@fam
2. Or scan the QR code on the Pricing page
3. Complete the payment
4. Enter your transaction ID
5. Click "Verify Payment" to send details via WhatsApp

You'll receive access after verification!`,
    priority: 10,
  },
  {
    keywords: ["whatsapp", "contact", "support", "help", "verify payment"],
    response: `You can reach us via WhatsApp at: +91 7014270402

We're here to help with:
• Payment verification
• Technical support
• General inquiries
• Access issues

Feel free to message us anytime!`,
    priority: 9,
  },
  {
    keywords: ["podcast", "jolly podcast", "listen"],
    response: `Check out The Jolly Podcast! 🎧

We discuss technology, innovation, and the future of AI. Visit our podcast page or go directly to:
https://thejollypodcast.wordpress.com/

New episodes regularly!`,
    priority: 8,
  },
  {
    keywords: ["beacons", "more", "explore", "portfolio", "projects"],
    response: `Explore more from Jolly Tech on our Beacons page! 🚀

Visit: https://website.beacons.ai/divyamarora

Discover our complete portfolio of projects, content, and innovations.`,
    priority: 8,
  },
  {
    keywords: ["install", "download", "get started", "setup"],
    response: `After purchasing Zerox AI, you'll receive:
• Download link for the installer
• Setup instructions
• API configuration guide
• First-run guided setup

Complete payment and verification to get instant access!`,
    priority: 7,
  },
  {
    keywords: ["lifetime", "updates", "subscription"],
    response: `Both our plans offer LIFETIME access with no recurring fees!

You pay once and get:
• Lifetime updates
• All future features
• Continuous improvements
• No hidden costs

It's a one-time investment in your productivity!`,
    priority: 8,
  },
  {
    keywords: ["hello", "hi", "hey", "greetings"],
    response: `Hello! 👋 Welcome to Jolly Tech!

I'm here to help you with:
• Zerox AI features and capabilities
• Pricing information
• Payment process
• Support and contact

What would you like to know?`,
    priority: 5,
  },
];

export const defaultResponse = `I'm here to help! I can assist you with:

• Zerox AI features and capabilities
• Pricing plans (₹2999 lifetime / ₹2599 student)
• Payment and verification process
• The Jolly Podcast
• Beacons page and portfolio
• General support

What would you like to know more about?`;
