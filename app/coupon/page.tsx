import PageHero from "@/components/landing/PageHero";
import CouponSection from "@/components/coupon/CouponSection";

export default function CouponPage() {
  return (
    <main className="min-h-screen bg-page-bg">
      <PageHero
        title="Generate And Redeem Coupon Codes"
        subtitle="Gift your customers Free Insurance Cover today... Start by generating a coupon Code for them)"
      />
      <CouponSection />
    </main>
  );
}
