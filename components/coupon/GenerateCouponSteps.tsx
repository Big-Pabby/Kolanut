"use client";

import type { ReactNode } from "react";

export type CouponStep = {
  title: string;
  description: string;
  icon: ReactNode;
};

const defaultSteps: CouponStep[] = [
  {
    title: "1. Select Insurance Product",
    description:
      "Select insurance product and provide all necessary customer information and your information.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M8 13h8M8 17h8M8 9h2" />
      </svg>
    ),
  },
  {
    title: "2. Review & Make Payment",
    description: "Review the details and complete payment securely.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
      </svg>
    ),
  },
  {
    title: "3. Coupon Code Is Generated",
    description:
      "Once payment is successful, a unique coupon code is automatically generated for the customer.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 9h.01M15 15h.01M16 8l-8 8" />
        <path d="M3 7v3a2 2 0 0 0 0 4v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3a2 2 0 0 0 0-4V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" />
      </svg>
    ),
  },
  {
    title: "Customer Receives Coupon",
    description:
      "The coupon code is sent directly to the customer's email. The purchaser receives a confirmation email as well.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

interface GenerateCouponStepsProps {
  title?: string;
  steps?: CouponStep[];
}

export default function GenerateCouponSteps({
  title = "How Generating Coupon Works",
  steps = defaultSteps,
}: GenerateCouponStepsProps = {}) {
  return (
    <section className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 py-12 md:py-16">
      <h2 className="font-heading text-center text-2xl sm:text-3xl lg:text-[40px] font-bold text-dark-text mb-8 lg:mb-12">
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => (
          <div
            key={step.title}
            className="flex flex-col items-center gap-4 rounded-xl border border-card-border bg-white p-6 text-center"
          >
            <div className="w-12 h-12 rounded-[10px] p-2.5 bg-[#FEF2F2] flex items-center justify-center text-brand-red">
              {step.icon}
            </div>
            <h3 className="text-base font-semibold text-dark-text">
              {step.title}
            </h3>
            <p className="text-sm text-body-text">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
