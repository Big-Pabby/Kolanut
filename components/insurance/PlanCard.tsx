"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  features?: string[];
}

interface PlanCardProps {
  plan: Plan;
  isExpanded: boolean;
  onToggle: () => void;
  onSelect: () => void;
  formatPrice: (price: number) => string;
  priceLabel?: string;
  insuranceType?: string;
}

export default function PlanCard({
  plan,
  isExpanded,
  onToggle,
  onSelect,
  formatPrice,
  priceLabel = "Total Premium",
  insuranceType,
}: PlanCardProps) {
  const coverageDetailsLink = insuranceType
    ? `/home-and-property-insurance/coverage/${insuranceType}/${plan.id}`
    : null;

  return (
    <div className="rounded-2xl border border-[#F3F4F6] bg-[#fffafa] px-5 py-5 flex flex-col gap-4">
      {/* Top row: Plan info + Price */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg lg:text-xl font-semibold capitalize text-dark-text">
            {plan.name}
          </h3>
          <p className="text-sm font-normal text-body-text">
            {plan.description}
          </p>
        </div>
        <div className="flex flex-col items-end shrink-0">
          <span className="text-lg lg:text-xl font-semibold text-dark-text">
            {formatPrice(plan.price)}
          </span>
          <span className="text-sm font-normal text-body-text">
            {priceLabel}
          </span>
        </div>
      </div>

      {/* Coverage details expandable */}
      {isExpanded && (
        <div className="text-sm text-body-text border-t border-[#f3f4f6] pt-3 animate-in fade-in slide-in-from-top-1 duration-200">
          {plan.features ? (
            <ul className="list-disc list-inside space-y-1">
              {plan.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          ) : (
            <p>
              Comprehensive coverage with standard benefits. Contact us for
              detailed policy terms and conditions.
            </p>
          )}
        </div>
      )}

      {/* Bottom row: Toggle Details + Select Button */}
      <div className="flex items-center justify-between">
        {coverageDetailsLink ? (
          <Link
            href={coverageDetailsLink}
            className="text-sm lg:text-base font-semibold text-brand-red hover:text-brand-red/80 transition-colors"
          >
            See Coverage Details
          </Link>
        ) : (
          <button
            type="button"
            onClick={onToggle}
            className="text-sm lg:text-base font-semibold text-brand-red hover:text-brand-red/80 transition-colors"
          >
            {isExpanded ? "Hide Coverage Details" : "See Coverage Details"}
          </button>
        )}
        <Button
          onClick={onSelect}
          className="rounded-full bg-brand-red hover:bg-brand-red/90 text-white text-sm font-medium !px-5 py-2 h-[40px]"
        >
          Choose this Plan
        </Button>
      </div>
    </div>
  );
}
