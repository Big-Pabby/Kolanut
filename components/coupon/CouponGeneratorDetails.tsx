"use client";

import { useEffect, useState } from "react";
import { useCouponFlowStore } from "@/lib/store/couponFlowStore";

const inputClass =
  "h-12 w-full rounded-[10px] border border-[#d1d5db] px-3 text-sm text-[#161616] placeholder:text-[#6b7280] shadow-[0_1px_2px_rgba(18,26,43,0.05)] outline-none focus:border-brand-red transition-colors bg-white";

/**
 * Renders the "Coupon Generator Details" section at the top of an insurance
 * provide-details form, but only when the user arrived via the coupon
 * generation page. Captures the purchaser's (coupon generator's) details into
 * the shared coupon-flow store. Renders nothing otherwise.
 */
export default function CouponGeneratorDetails() {
  const { isCouponFlow, generator, updateGenerator } = useCouponFlowStore();

  // Avoid hydration mismatch: the persisted flag is only known on the client.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || !isCouponFlow) return null;

  return (
    <div className="mb-8">
      <h3 className="text-base font-semibold mb-2 text-[#161616]">
        Coupon Generator Details
      </h3>
      <hr className="mb-6" />

      <div className="grid gap-5 grid-cols-1 lg:grid-cols-2 mb-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#374151]">
            First Name
          </label>
          <input
            type="text"
            placeholder="Enter"
            value={generator.firstName}
            onChange={(e) => updateGenerator("firstName", e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#374151]">Surname</label>
          <input
            type="text"
            placeholder="Enter"
            value={generator.lastname}
            onChange={(e) => updateGenerator("lastname", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#374151]">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter email address"
            value={generator.email}
            onChange={(e) => updateGenerator("email", e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#374151]">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="Enter phone number"
            value={generator.phone}
            onChange={(e) => updateGenerator("phone", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>
    </div>
  );
}
