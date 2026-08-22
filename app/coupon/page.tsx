import PageHero from "@/components/landing/PageHero";
import CouponSection from "@/components/coupon/CouponSection";
import HeroSection from "@/components/couponpage/HeroSection";
import StepsSection from "@/components/couponpage/StepsSection";
import ProtectionTypesSection from "@/components/couponpage/ProtectionTypesSection";
import PartnerCtaSection from "@/components/couponpage/PartnerCtaSection";
import CouponRedemptionSection from "@/components/couponpage/CouponRedemptionSection";
import WalkthroughSection from "@/components/couponpage/WalkthroughSection";
import WhyChooseSection from "@/components/couponpage/WhyChooseSection";
import PartnerRegistrationSection from "@/components/couponpage/PartnerRegistrationSection";

export default function CouponPage() {
	return (
		<main className="min-h-screen bg-page-bg">
			{/* <PageHero
      image="/images/umbrella.jpg"
        title="Generate And Redeem Coupon Codes"
        subtitle="Gift your customers Free Insurance Cover today... Start by generating a coupon Code for them"
      /> */}
			{/* <CouponSection /> */}
			<HeroSection />
			<StepsSection />
			<ProtectionTypesSection />
			<PartnerCtaSection />
			<CouponRedemptionSection />
			<WalkthroughSection />
			<WhyChooseSection />
			<PartnerRegistrationSection />
		</main>
	);
}
