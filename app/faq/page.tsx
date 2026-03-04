"use client";

import React, { useState, useEffect } from "react";

// Animation keyframes style
const animationStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  @keyframes expandHeight {
    from {
      max-height: 0;
      opacity: 0;
    }
    to {
      max-height: 500px;
      opacity: 1;
    }
  }
  .animate-fade-in-up {
    animation: fadeInUp 0.5s ease-out forwards;
  }
  .animate-slide-in-left {
    animation: slideInLeft 0.4s ease-out forwards;
  }
  .accordion-content {
    animation: expandHeight 0.3s ease-out forwards;
  }
  .tab-btn {
    transition: all 0.2s ease;
  }
  .tab-btn:active {
    transform: scale(0.98);
  }
  .accordion-item {
    transition: background-color 0.2s ease;
  }
  .accordion-item:hover {
    background-color: #f9fafb;
  }
  .icon-rotate {
    transition: transform 0.3s ease;
  }
  .icon-rotate.open {
    transform: rotate(180deg);
  }
  .shimmer {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

const Faqs: React.FC = () => {
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: "What is Kolanut Insurance?",
      answer:
        "Kolanut Insurance is a digital insurance platform that makes it easy to purchase and manage insurance policies. We partner with licensed insurance companies to provide comprehensive coverage options.",
      category: "general",
    },
    {
      id: 2,
      question: "How do I purchase insurance?",
      answer:
        "You can purchase insurance through our website by selecting your desired coverage type, filling out the necessary information, and making payment. Our process is completely digital and takes just a few minutes.",
      category: "general",
    },
    {
      id: 3,
      question: "Is my information secure?",
      answer:
        "Yes, we take data security seriously. All your personal information is encrypted and stored securely. We comply with all relevant data protection regulations.",
      category: "general",
    },
    {
      id: 4,
      question: "What payment methods do you accept?",
      answer:
        "We accept various payment methods including credit/debit cards, bank transfers, and mobile money. All payments are processed securely through our payment partners.",
      category: "payment",
    },
    {
      id: 5,
      question: "When will I receive my policy documents?",
      answer:
        "Once your payment is confirmed, you will receive your policy documents via email within 24 hours. You can also download them directly from your account dashboard.",
      category: "payment",
    },
    {
      id: 6,
      question: "Can I get a refund if I cancel my policy?",
      answer:
        "Yes, you can cancel your policy within the cooling-off period (usually 14 days) for a full refund. After this period, refunds are calculated based on the unused portion of your policy.",
      category: "payment",
    },
    {
      id: 7,
      question: "What does my policy cover?",
      answer:
        "Coverage varies depending on the type of policy you purchase. Each policy document contains detailed information about what's covered and any exclusions. You can also contact our support team for clarification.",
      category: "policy",
    },
    {
      id: 8,
      question: "How do I file a claim?",
      answer:
        "To file a claim, log into your account, navigate to the claims section, and fill out the claim form with all required details. Our claims team will review and get back to you within the specified timeframe.",
      category: "policy",
    },
    {
      id: 9,
      question: "How long does it take to process a claim?",
      answer:
        "Claims processing typically takes 5-7 business days from the time all required documents are submitted. Complex claims may take longer, but we strive to resolve all claims as quickly as possible.",
      category: "claims",
    },
    {
      id: 10,
      question: "What documents do I need for a claim?",
      answer:
        "Required documents vary by claim type but typically include: policy certificate, incident report, photos of damage, police report (if applicable), and any other supporting documentation. Our claims team will provide a complete list.",
      category: "claims",
    },
  ]);
  const [activeTab, setActiveTab] = useState("general");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isVisible, setIsVisible] = useState(false);

  // Trigger animation on mount
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Extract unique categories
  const uniqueTabs = Array.from(new Set(faqs.map((faq: any) => faq.category)));

  const tabs = uniqueTabs.sort((a, b) => {
    if (a === "general") return -1;
    if (b === "general") return 1;
    return a.localeCompare(b);
  });

  // Filter FAQs by selected tab
  const filteredFaqs = faqs.filter((faq: any) => faq.category === activeTab);

  const categoryLabels: Record<string, string> = {
    general: "General",
    payment: "Payment",
    policy: "Policy",
    claims: "Claims",
  };

  return (
    <>
      <style>{animationStyles}</style>
      <div>
        <div
          className="relative min-h-[400px] lg:min-h-[500px] bg-cover bg-center flex items-end justify-start px-6 md:px-12 lg:px-20 pb-8 md:pb-15"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url('/images/faq_bg.jpg')`,
            backgroundColor: "#808080",
          }}
        >
          <div className="flex flex-col justify-end items-start text-left z-10 px-4 max-w-4xl">
            <h1
              className={`font-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 md:mb-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              Frequently Asked Questions
            </h1>
            <p
              className={`text-base md:text-lg lg:text-xl text-gray-200 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              Quick answers to questions you may have. Can't find what you are
              looking for?
            </p>
          </div>
        </div>

        {faqs.length === 0 ? (
          <div className="flex justify-center py-20">
            <p className="text-gray-500">No FAQs available at the moment.</p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 flex flex-col lg:flex-row items-start gap-6 md:gap-8">
            {/* Tabs */}
            <div className="w-full lg:w-[260px] flex-shrink-0">
              <div className="flex lg:flex-col gap-2 bg-white p-3 md:p-4 rounded-lg border w-full overflow-x-auto">
                {tabs.map((tab, idx) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setOpenIndex(0);
                    }}
                    className={`tab-btn flex-1 text-left lg:px-3 py-2 md:py-3 text-sm font-medium whitespace-nowrap ${
                      activeTab === tab
                        ? "text-primary lg:border-b-2 lg:border-primary"
                        : "text-gray-600 lg:border-b-2 lg:border-gray-100 hover:bg-gray-50"
                    }`}
                    style={{
                      animationDelay: `${idx * 50}ms`,
                      opacity: isVisible ? 1 : 0,
                      transition: `all 0.3s ease ${idx * 50}ms`,
                    }}
                  >
                    {categoryLabels[tab] || tab}
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="flex-1 bg-white h-fit rounded-xl border overflow-hidden w-full">
              {filteredFaqs.map((faq: any, i) => (
                <div
                  key={faq.id}
                  className="border-b last:border-b-0 cursor-pointer accordion-item"
                  onClick={() => toggleAccordion(i)}
                  style={{
                    animation: "fadeInUp 0.4s ease-out forwards",
                    animationDelay: `${i * 50}ms`,
                    opacity: 0,
                  }}
                >
                  <div className="flex items-center justify-between px-4 md:px-6 py-4 md:py-5">
                    <h3 className="text-sm md:text-base font-bold leading-[22px] md:leading-[28px] text-[#374151] pr-2">
                      {faq.question}
                    </h3>
                    <span className="text-xl flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`icon-rotate ${openIndex === i ? "open" : ""}`}
                      >
                        <polyline
                          points={
                            openIndex === i
                              ? "18 15 12 9 6 15"
                              : "6 9 12 15 18 9"
                          }
                        ></polyline>
                      </svg>
                    </span>
                  </div>
                  {openIndex === i && faq.answer && (
                    <div className="accordion-content px-4 md:px-6 pb-4 md:pb-6 text-sm leading-[22px] md:leading-[24px] text-[#685C5C] overflow-hidden">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Faqs;
