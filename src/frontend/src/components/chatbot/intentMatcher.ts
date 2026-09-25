import { defaultResponse, faqs } from "./faq";

export function matchIntent(userMessage: string): string {
  const normalizedMessage = userMessage.toLowerCase().trim();

  let bestMatch = { score: 0, response: defaultResponse };

  for (const faq of faqs) {
    let score = 0;

    for (const keyword of faq.keywords) {
      if (normalizedMessage.includes(keyword.toLowerCase())) {
        score += faq.priority;
      }
    }

    if (score > bestMatch.score) {
      bestMatch = { score, response: faq.response };
    }
  }

  return bestMatch.response;
}
