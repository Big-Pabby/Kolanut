"use client";

import { useState } from "react";

import Link from "next/link";
import PremiumCard from "@/components/customer/PremiumCard";
import {
  PREMIUM_CATEGORIES,
  premiumsByRecency,
  type PremiumCategory,
} from "@/lib/data/premiums";

const FILTERS = ["All", ...PREMIUM_CATEGORIES] as const;
type Filter = (typeof FILTERS)[number];

export default function PurchasedPremiumsPage() {
  const [activeCategory, setActiveCategory] = useState<Filter>("All");

  const premiums = premiumsByRecency().filter(
    (premium) =>
      activeCategory === "All" ||
      premium.category === (activeCategory as PremiumCategory),
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Header card */}
      <div
        className="flex flex-col"
        style={{
          backgroundColor: "#fefefe",
          border: "1px solid #f3f4f6",
          borderRadius: 8,
          padding: "16px",
          gap: 16,
        }}
      >
        {/* Title + button row */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col" style={{ gap: 4 }}>
            <h1
              style={{
                color: "#000000",
                fontSize: 20,
                fontWeight: 700,
                fontFamily: "var(--font-merriweather), Merriweather, serif",
              }}
            >
              Policies
            </h1>
            <p
              style={{
                color: "#6b7280",
                fontSize: 14,
                fontWeight: 400,
                fontFamily:
                  "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
              }}
            >
              Manage and purchase your insurance premium
            </p>
          </div>

          <Link
            href="/customer/get-insured"
            className="flex items-center justify-center px-5 py-2.5 transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "#af060d",
              color: "#ffffff",
              fontSize: 14,
              fontWeight: 500,
              fontFamily:
                "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
              border: "none",
              borderRadius: 24,
              whiteSpace: "nowrap",
            }}
          >
            Get Insured
          </Link>
        </div>

        {/* Category tabs - scrollable on mobile */}
        <div
          className="flex items-center overflow-x-auto scrollbar-hide"
          style={{
            gap: 8,
            backgroundColor: "#f9fafb",
            borderRadius: 8,
            padding: "4px",
            width: "fit-content",
            maxWidth: "100%",
          }}
        >
          {FILTERS.map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="flex items-center transition-all"
                style={{
                  gap: 8,
                  padding: "8px 14px",
                  borderRadius: 6,
                  border: "none",
                  backgroundColor: isActive ? "#ffffff" : "transparent",
                  boxShadow: isActive
                    ? "0px 1px 2px rgba(18, 26, 43, 0.06), 0px 1px 2px rgba(18, 26, 43, 0.10)"
                    : "none",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    color: isActive ? "#af060d" : "#6b7280",
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily:
                      "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
                  }}
                >
                  {cat}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      {premiums.length === 0 ? (
        <div className="rounded-[8px] border border-[#F3F4F6] bg-white p-10 text-center">
          <p className="text-base font-semibold text-[#374151]">
            No premiums in this category
          </p>
          <p className="mt-1 text-sm text-[#6b7280]">
            Pick another category, or buy a new policy to see it here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {premiums.map((premium) => (
            <PremiumCard key={premium.policyNumber} premium={premium} />
          ))}
        </div>
      )}
    </div>
  );
}
