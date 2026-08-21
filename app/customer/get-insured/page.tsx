"use client";

import Link from "next/link";
import { ArrowRight, Coins, FileCheck2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { INSURANCE_PRODUCTS } from "@/components/landing/InsuranceProductsSection";
import { useCouponFlowStore } from "@/lib/store/couponFlowStore";

const steps = [
  {
    icon: ShieldCheck,
    title: "Pick a cover",
    description: "Choose the product that matches what you want to protect.",
  },
  {
    icon: FileCheck2,
    title: "Tell us about it",
    description: "Fill in a short form and review your quote instantly.",
  },
  {
    icon: Coins,
    title: "Pay and get covered",
    description: "Your policy document is issued as soon as payment clears.",
  },
];

export default function CustomerGetInsuredPage() {
  const resetCouponFlow = useCouponFlowStore((s) => s.reset);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-[#111827]">Get Insured</h1>
        <p className="text-sm text-[#6b7280]">
          Choose the insurance that fits your needs and get covered in minutes.
        </p>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {INSURANCE_PRODUCTS.map(({ icon, title, desc, href }) => (
          <div
            key={title}
            className="flex flex-col gap-4 rounded-xl border border-[#e5e7eb] bg-white p-5"
          >
            <span
              role="img"
              aria-label={title}
              className="inline-block h-11 w-11 shrink-0"
              style={{
                backgroundColor: "#af060d",
                maskImage: `url(${icon})`,
                WebkitMaskImage: `url(${icon})`,
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center",
                maskSize: "contain",
                WebkitMaskSize: "contain",
              }}
            />

            <div className="flex flex-1 flex-col gap-1.5">
              <h2 className="text-base font-semibold text-[#111827]">
                {title}
              </h2>
              <p className="text-sm leading-relaxed text-[#6b7280]">{desc}</p>
            </div>

            <Button
              asChild
              className="mt-auto h-11 w-full rounded-full bg-brand-red text-sm font-medium text-white hover:bg-brand-red/90"
            >
              <Link href={href ?? "#"} onClick={() => resetCouponFlow()}>
                Get Insured Now
              </Link>
            </Button>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="rounded-xl border border-[#e5e7eb] bg-white p-5">
        <h2 className="text-base font-semibold text-[#111827]">How it works</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {steps.map(({ icon: Icon, title, description }, index) => (
            <div key={title} className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FEF2F2] text-brand-red">
                <Icon className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#111827]">
                  {index + 1}. {title}
                </p>
                <p className="mt-0.5 text-sm text-[#6b7280]">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coupon shortcut */}
      <div className="flex flex-col gap-3 rounded-xl border border-[#FEE2E2] bg-[#FFFAFA] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#111827]">
            Have a coupon code?
          </p>
          <p className="mt-0.5 text-sm text-[#6b7280]">
            Redeem it to pay less on a new policy.
          </p>
        </div>
        <Link
          href="/coupon/redeem"
          className="flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-red hover:underline"
        >
          Redeem coupon
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
