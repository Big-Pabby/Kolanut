"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  PREMIUM_STATUS_CLASS,
  formatPremiumAmount,
  formatPremiumDate,
  type PurchasedPremium,
} from "@/lib/data/premiums";

/**
 * The purchased-premium card. Shared by the customer dashboard and the
 * Purchased Premiums page so both surfaces stay identical.
 */
export default function PremiumCard({
  premium,
}: {
  premium: PurchasedPremium;
}) {
  return (
    <Card className="border border-[#F3F4F6] bg-[#FEFEFE] rounded-[10px] shadow-none hover:shadow-sm transition-shadow">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[#4B5563] text-xs">Policy Number</p>
            <p className="text-[#AF060D] font-semibold text-sm mt-0.5">
              {premium.policyNumber}
            </p>
          </div>
          <span
            className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium ${PREMIUM_STATUS_CLASS[premium.status]}`}
          >
            {premium.status}
          </span>
        </div>

        <div className="border-t border-gray-100 pt-3">
          <p className="text-[#4B5563] text-xs">Product</p>
          <p className="text-gray-800 font-semibold text-sm mt-0.5">
            {premium.product}
          </p>
          <p className="text-[#6B7280] text-xs mt-0.5">
            {premium.category} · {premium.coveragePeriod}
          </p>
        </div>

        <div className="border-t border-gray-100 pt-3">
          <p className="text-[#4B5563] text-xs">Premium Paid</p>
          <p className="text-gray-800 font-semibold text-sm mt-0.5">
            {formatPremiumAmount(premium.premiumPaid)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-gray-100 pt-3">
          <div className="min-w-0">
            <p className="text-[#4B5563] text-xs">Purchased</p>
            <p className="text-gray-800 font-medium text-sm mt-0.5">
              {formatPremiumDate(premium.datePurchased)}
            </p>
          </div>
          <div className="min-w-0">
            <p className="text-[#4B5563] text-xs">Expires</p>
            <p className="text-gray-800 font-medium text-sm mt-0.5">
              {formatPremiumDate(premium.expiryDate)}
            </p>
          </div>
        </div>

        <Button
          asChild
          variant="outline"
          className="w-full border-[#AF060D] text-[#AF060D] hover:bg-red-50 hover:text-red-700 rounded-full text-sm font-semibold h-10 mt-1"
        >
          <Link href={`/customer/purchased-premium/${premium.policyNumber}`}>
            View Details
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
