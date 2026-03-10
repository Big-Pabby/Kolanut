"use client";

import { useState } from "react";
import FaqAccordionItem, { FaqItem } from "@/components/admin/faqs/FaqAccordionItem";

const ALL_FAQS: FaqItem[] = [
  {
    id: 1,
    category: "General",
    question: "How do I get started with your product?",
    answer: "Sign up on our website, explore features, customize your profile, and start using our product. We're here to help!",
  },
  {
    id: 2,
    category: "General",
    question: "How do I get started with your product?",
    answer: "Sign up on our website, explore features, customize your profile, and start using our product. We're here to help!",
  },
  {
    id: 3,
    category: "Payment",
    question: "What payment methods do you accept?",
    answer: "We accept credit/debit cards, bank transfers, and mobile money. All payments are processed securely through our payment partners.",
  },
  {
    id: 4,
    category: "Payment",
    question: "When will I receive my policy documents?",
    answer: "Once your payment is confirmed, you will receive your policy documents via email within 24 hours.",
  },
  {
    id: 5,
    category: "Insurance Policy",
    question: "What does my policy cover?",
    answer: "Coverage varies depending on the type of policy you purchase. Each policy document contains detailed information about what's covered and any exclusions.",
  },
  {
    id: 6,
    category: "Insurance Policy",
    question: "How do I cancel my policy?",
    answer: "You can cancel your policy within the cooling-off period (usually 14 days) for a full refund. After this period, refunds are calculated based on the unused portion.",
  },
  {
    id: 7,
    category: "Claims",
    question: "How do I file a claim?",
    answer: "To file a claim, log into your account, navigate to the claims section, and fill out the claim form with all required details.",
  },
  {
    id: 8,
    category: "Claims",
    question: "How long does it take to process a claim?",
    answer: "Claims processing typically takes 5–7 business days from the time all required documents are submitted.",
  },
];

const CATEGORIES = ["General", "Payment", "Insurance Policy", "Claims"] as const;
type Category = (typeof CATEGORIES)[number];

function countByCategory(cat: Category) {
  return ALL_FAQS.filter((f) => f.category === cat).length;
}

export default function AdminFaqsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("General");

  const visibleFaqs = ALL_FAQS.filter((f) => f.category === activeCategory);

  return (
    <div className="flex flex-col" style={{ padding: "24px 40px", gap: 24 }}>
      {/* Header card */}
      <div
        className="flex flex-col"
        style={{
          backgroundColor: "#fefefe",
          border: "1px solid #f3f4f6",
          borderRadius: 8,
          padding: "16px",
          gap: 16,
        }}
      >
        {/* Title + button row */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col" style={{ gap: 4 }}>
            <h1
              style={{
                color: "#000000",
                fontSize: 20,
                fontWeight: 700,
                fontFamily: "var(--font-merriweather), Merriweather, serif",
              }}
            >
              Frequently asked questions
            </h1>
            <p
              style={{
                color: "#6b7280",
                fontSize: 14,
                fontWeight: 400,
                fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
              }}
            >
              Create and manage properties
            </p>
          </div>

          <button
            className="flex items-center justify-center px-5 py-2.5 transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "#af060d",
              color: "#ffffff",
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
              border: "none",
              borderRadius: 24,
              whiteSpace: "nowrap",
            }}
          >
            Add New FAQ
          </button>
        </div>

        {/* Category tabs */}
        <div
          className="flex items-center"
          style={{
            gap: 8,
            backgroundColor: "#f9fafb",
            borderRadius: 8,
            padding: "4px",
            width: "fit-content",
          }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="flex items-center transition-all"
                style={{
                  gap: 8,
                  padding: "8px 14px",
                  borderRadius: 6,
                  border: "none",
                  backgroundColor: isActive ? "#ffffff" : "transparent",
                  boxShadow: isActive
                    ? "0px 1px 2px rgba(18, 26, 43, 0.06), 0px 1px 2px rgba(18, 26, 43, 0.10)"
                    : "none",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    color: isActive ? "#af060d" : "#6b7280",
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
                  }}
                >
                  {cat}
                </span>
                <span
                  style={{
                    color: "#374151",
                    fontSize: 12,
                    fontWeight: 500,
                    fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
                  }}
                >
                  {countByCategory(cat)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* FAQ list */}
      <div className="flex flex-col" style={{ gap: 20 }}>
        {visibleFaqs.map((faq, idx) => (
          <FaqAccordionItem
            key={faq.id}
            faq={faq}
            isFirst={idx === 0}
            defaultOpen={idx % 2 === 0}
            onEdit={(f) => console.log("Edit FAQ", f.id)}
            onDelete={(f) => console.log("Delete FAQ", f.id)}
          />
        ))}
      </div>
    </div>
  );
}
