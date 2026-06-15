"use client";

import type { ComponentType, SVGProps } from "react";
import PageHero from "@/components/landing/PageHero";
import GenerateCouponSteps from "@/components/coupon/GenerateCouponSteps";
import InsuranceProductsSection, {
  type InsuranceProduct,
} from "@/components/landing/InsuranceProductsSection";
import HomeProduct from "@/src/assets/icons/home-product.svg";
import MarineProduct from "@/src/assets/icons/marine-product.svg";
import TravelProduct from "@/src/assets/icons/travel-product.svg";
import MotorProduct from "@/src/assets/icons/motor-product.svg";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

const GroupIcon: IconType = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const FamilyIcon: IconType = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="7" cy="6" r="3" />
    <circle cx="17" cy="6" r="3" />
    <path d="M2 21v-1a5 5 0 0 1 5-5 5 5 0 0 1 5 5v1" />
    <path d="M12 21v-1a5 5 0 0 1 5-5 5 5 0 0 1 5 5v1" />
  </svg>
);

const products: InsuranceProduct[] = [
  {
    Icon: TravelProduct,
    title: "Travel Insurance",
    desc: "Cover medical emergencies, lost baggage, and trip disruptions on your next local or international trip.",
    href: "/travel-insurance",
  },
  {
    Icon: MotorProduct,
    title: "Motor Insurance",
    desc: "Cover medical emergencies, lost baggage, and trip disruptions on your next local or international trip.",
    href: "/motor-insurance",
  },
  {
    Icon: HomeProduct,
    title: "Home & Property Insurance",
    desc: "Cover medical emergencies, lost baggage, and trip disruptions on your next local or international trip.",
    href: "/property-insurance",
  },
  {
    Icon: GroupIcon,
    title: "Group Insurance",
    desc: "Cover medical emergencies, lost baggage, and trip disruptions on your next local or international trip.",
    href: "#",
  },
  {
    Icon: MarineProduct,
    title: "Marine Goods Insurance",
    desc: "Safeguard goods in transit by sea, air, or land. Ideal for importers, exporters, and logistics operators.",
    href: "/marine-insurance",
  },
  {
    Icon: FamilyIcon,
    title: "Life & Family Insurance",
    desc: "Cover medical emergencies, lost baggage, and trip disruptions on your next local or international trip.",
    href: "/life-and-family-insurance",
  },
];

export default function GenerateCouponPage() {
  return (
    <main className="min-h-screen bg-page-bg">
      <PageHero
        image="/images/umbrella.jpg"
        title="Generate And Redeem Coupon Codes"
        subtitle="Gift your customers Free Insurance Cover today or redeem a coupon"
      />
      <GenerateCouponSteps />
      <InsuranceProductsSection
        title="Choose The Insurance Product"
        subtitle="Choose the type of insurance and provide all customer information accurately to ensure proper coverage."
        products={products}
        couponFlow
      />
    </main>
  );
}
