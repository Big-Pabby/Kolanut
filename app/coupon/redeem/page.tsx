"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHero from "@/components/landing/PageHero";
import GenerateCouponSteps, {
  type CouponStep,
} from "@/components/coupon/GenerateCouponSteps";
import RedeemCouponForm from "@/components/coupon/RedeemCouponForm";
import RedeemCouponDetails from "@/components/coupon/RedeemCouponDetails";
import RedeemCouponSuccess from "@/components/coupon/RedeemCouponSuccess";

const redeemSteps: CouponStep[] = [
  {
    title: "1. Open Your Redeem Link",
    description:
      "You will receive an email containing your coupon code and a redemption link.",
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
    title: "2. Enter Your Coupon Code",
    description:
      "Enter your coupon code to verify and begin the premium activation process.",
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
    title: "3. Review Your Premium Details",
    description:
      "Once your coupon code is validated, the premium summary will be displayed for you to review before activation.",
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
    title: "4. Activate Your Premium",
    description:
      "Click Activate Premium to activate your insurance coverage instantly.",
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

export default function RedeemCouponPage() {
  const router = useRouter();
  const [step, setStep] = useState<"code" | "details" | "success">("code");
  const [couponCode, setCouponCode] = useState("");

  return (
    <main className="min-h-screen bg-page-bg">
      <PageHero
        image="/images/umbrella.jpg"
        title="Generate And Redeem Coupon Codes"
        subtitle="Gift your customers Free Insurance Cover today or redeem a coupon"
      />

      {step === "code" && (
        <>
          <GenerateCouponSteps
            title="How Redeeming Coupon Works"
            steps={redeemSteps}
          />
          <RedeemCouponForm
            onRedeem={(code) => {
              setCouponCode(code);
              setStep("details");
            }}
          />
        </>
      )}

      {step === "details" && (
        <RedeemCouponDetails
          couponCode={couponCode}
          onBack={() => setStep("code")}
          onActivate={() => setStep("success")}
        />
      )}

      {step === "success" && (
        <RedeemCouponSuccess onBackToHome={() => router.push("/")} />
      )}
    </main>
  );
}
