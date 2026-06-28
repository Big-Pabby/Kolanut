"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface RedeemCouponFormProps {
  onRedeem?: (couponCode: string) => void;
}

export default function RedeemCouponForm({ onRedeem }: RedeemCouponFormProps) {
  const [couponCode, setCouponCode] = useState("");

  const handleRedeem = () => {
    if (!couponCode.trim()) return;
    onRedeem?.(couponCode.trim());
  };

  return (
    <section className="bg-[#FFFAFA] px-6 md:px-12 lg:px-20 py-12 md:py-16">
      <div className="mx-auto w-full max-w-[640px] rounded-xl border border-card-border bg-white p-6 md:p-10">
        <div className="flex flex-col items-center gap-1 text-center mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-dark-text">
            Redeem Coupon Code
          </h2>
          <p className="text-sm text-body-text">
            Kindly enter your coupon code to redeem it.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#374151]">
            Coupon Code
          </label>
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="h-12 w-full rounded-[10px] border border-[#d1d5db] px-3 text-sm text-dark-text placeholder:text-[#6b7280] shadow-[0_1px_2px_rgba(18,26,43,0.05)] outline-none focus:border-brand-red transition-colors bg-white"
          />
        </div>

        <Button
          onClick={handleRedeem}
          disabled={!couponCode.trim()}
          className="mt-6 w-full rounded-full bg-brand-red text-white text-sm font-medium !py-3 h-auto hover:bg-brand-red/90 disabled:opacity-50"
        >
          Redeem Coupon
        </Button>
      </div>
    </section>
  );
}
