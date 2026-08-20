"use client";

import PageHero from "@/components/landing/PageHero";
import GenerateCouponSteps from "@/components/coupon/GenerateCouponSteps";
import InsuranceProductsSection, {
  type InsuranceProduct,
} from "@/components/landing/InsuranceProductsSection";

const products: InsuranceProduct[] = [
  {
    icon: "/home.svg",
    title: "Home & Property Insurance",
    desc: "Cover medical emergencies, lost baggage, and trip disruptions on your next local or international trip.",
    href: "/home-and-property-insurance",
  },
  {
    icon: "/motor.svg",
    title: "Motor Insurance",
    desc: "Cover medical emergencies, lost baggage, and trip disruptions on your next local or international trip.",
    href: "/motor-insurance",
  },
  {
    icon: "/life-family.svg",
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
