"use client";

import { useQuery } from "@tanstack/react-query";
import { admin } from "@/lib/service";

// API Response type from /v1/faqs/
export interface ApiFaqItem {
  category: string;
  question: string;
  answer: string;
}

// Generate unique ID for FAQ items (since API doesn't provide one)
function generateFaqId(
  category: string,
  question: string,
  index: number,
): number {
  const str = `${category}-${question}-${index}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

// Transform API response to FAQ item format with ID
export interface FaqItem {
  id: number;
  category: string;
  question: string;
  answer: string;
}

// Transform API response to FaqItem format
const transformFaqItem = (item: ApiFaqItem, index: number): FaqItem => ({
  id: generateFaqId(item.category, item.question, index),
  category: item.category,
  question: item.question,
  answer: item.answer,
});

// Fetch all FAQs for public page
export const useFaqs = () => {
  return useQuery({
    queryKey: ["faqs-public"],
    queryFn: async () => {
      const data = await admin.get<ApiFaqItem[]>("/faqs/");
      return data.map((item, index) => transformFaqItem(item, index));
    },
    staleTime: 60000, // Cache for 1 minute
  });
};
