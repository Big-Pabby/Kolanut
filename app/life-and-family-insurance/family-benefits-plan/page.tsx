"use client";

import InsurancePolicyLayout from "@/components/insurance/InsurancePolicyLayout";
import { useRouter } from "next/navigation";

const benefits = [
  {
    text: "Funeral Expenses: Pays an agreed sum for burial expense in the event of death of any assured life named in the policy.",
  },
  {
    text: "Provides a grocery benefit of N25,000 (one time payment).",
  },
  {
    text: "Pays an additional N20,000 monthly payment for six (6) months as family income benefit for the family left behind.",
  },
];

const documents = [
  { text: "Duly-filled proposal form" },
  { text: "Valid means of identification" },
  { text: "Recent passport photograph" },
];

const iconClass =
  "h-6 w-6 stroke-brand-red fill-none stroke-[1.5] [stroke-linecap:round] [stroke-linejoin:round]";

const categories = [
  {
    label: "Travel\nInsurance",
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass}>
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
        <path d="M18 2l3 3-3 3M21 5H15" />
      </svg>
    ),
  },
  {
    label: "Motor\nInsurance",
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass}>
        <path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v9a2 2 0 01-2 2h-2" />
        <circle cx="9" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
        <path d="M14 3v4h5" />
      </svg>
    ),
  },
  {
    label: "Property\nInsurance",
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass}>
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9,22 9,12 15,12 15,22" />
      </svg>
    ),
  },
  {
    label: "Group\nInsurance",
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass}>
        <circle cx="9" cy="7" r="4" />
        <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
        <circle cx="17" cy="7" r="2" />
        <path d="M21 21v-1.5a2 2 0 00-2-2h-1" />
      </svg>
    ),
  },
  {
    label: "Life & Family\nInsurance",
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass}>
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
  {
    label: "Marine Goods\nInsurance",
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass}>
        <path d="M3 17l2-8h14l2 8H3z" />
        <path d="M5 17l-1 4h16l-1-4" />
        <path d="M12 9V5M9 5h6M8 12h8" />
      </svg>
    ),
  },
];

export default function FamilyBenefitsPlanPage() {
  const router = useRouter();
  return (
    <InsurancePolicyLayout
      heroCategory="Life & Family Insurance"
      heroTitle="Family Benefits Plan"
      heroDescription="Give your parents the respectful farewell they deserve. Planning ahead with our Family Benefits Plan gives you peace of mind when life happens."
      heroImage="/images/family-benefits.png"
      heroImageAlt="Family smiling together at home"
      benefits={benefits}
      documents={documents}
      categories={categories}
      onGetQuote={() => {
        router.push("/life-and-family-insurance/family-benefits-plan/policy");
      }}
    />
  );
}
