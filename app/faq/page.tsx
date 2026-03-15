"use client";

import React, { useState, useEffect } from "react";
import { useFaqs } from "./hooks/useFaqs";

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
  const { data: faqsFromApi, isLoading, error } = useFaqs();
  const [faqs, setFaqs] = useState<any[]>([]);

  // Set FAQs from API when data is available
  useEffect(() => {
    if (faqsFromApi && faqsFromApi.length > 0) {
      setFaqs(faqsFromApi);
    }
  }, [faqsFromApi]);
  const [activeTab, setActiveTab] = useState("General");
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
          className="relative min-h-[400px]  bg-cover bg-center flex items-end justify-start px-6 md:px-12 lg:px-20 pb-8 md:pb-15"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url('/images/faq-hero.jpg')`,
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

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500">Loading FAQs...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex justify-center py-20">
            <div className="flex flex-col items-center gap-2">
              <p className="text-red-500">Failed to load FAQs.</p>
              <p className="text-gray-500 text-sm">Please try again later.</p>
            </div>
          </div>
        ) : faqs.length === 0 ? (
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
                    className={`tab-btn flex-1 text-left lg:px-3 py-2 md:py-3 text-sm font-medium whitespace-nowrap cursor-pointer ${idx === 3 ? "border-none" : "lg:border-b-2"}  ${
                      activeTab === tab
                        ? "text-primary font-semibold  lg:border-primary"
                        : "text-[#4B5563] lg:border-gray-100 hover:bg-gray-50"
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
                    <h3 className="text-sm md:text-base font-bold leading-[22px] md:leading-[28px] text-[#161616] pr-2">
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
                    <div className="accordion-content px-4 md:px-6 pb-4 md:pb-6 text-sm leading-[22px] md:leading-[24px] text-[#4B5563] overflow-hidden">
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
