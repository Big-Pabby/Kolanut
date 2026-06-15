"use client";

import { useEffect, useState } from "react";
import { useCouponFlowStore } from "@/lib/store/couponFlowStore";

/**
 * Renders a "Customer Personal Details" section heading to separate the
 * customer's information from the purchaser's "Coupon Generator Details".
 * Only shown when the user arrived via the coupon flow; renders nothing
 * otherwise so non-coupon forms are unchanged.
 */
export default function CustomerPersonalDetailsHeading() {
  const isCouponFlow = useCouponFlowStore((s) => s.isCouponFlow);

  // Avoid hydration mismatch: the flag is only known on the client.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || !isCouponFlow) return null;

  return (
    <div>
      <h3 className="text-base font-semibold mb-2 text-[#161616]">
        Customer Personal Details
      </h3>
      <hr className="mb-6" />
    </div>
  );
}
