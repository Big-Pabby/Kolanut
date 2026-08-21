"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronDown, ChevronLeft, Download } from "lucide-react";
import VehicleDetailsFields from "@/components/customer/VehicleDetailsFields";
import {
  POLICY_HOLDER,
  PREMIUM_STATUS_CLASS,
  formatPremiumAmount,
  formatPremiumDate,
  getPremiumByPolicyNumber,
  policyHolderName,
} from "@/lib/data/premiums";

// ── Types ────────────────────────────────────────────────────────────────────

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

// ── Sub-components ───────────────────────────────────────────────────────────

function AccordionSection({
  title,
  children,
  defaultOpen = true,
}: AccordionSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-[#F3F4F6] rounded-[10px] overflow-hidden bg-[#FEFEFE] p-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left hover:bg-stone-50 pb-3 transition-colors"
      >
        <span className="text-base font-heading font-semibold text-stone-800 tracking-tight">
          {title}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-stone-400 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`transition-all duration-300 ease-in-out ${
          open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className=" border-t border-stone-100 pt-5">{children}</div>
      </div>
    </div>
  );
}

function FieldPair({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-[#4B5563] uppercase">{label}</span>
      <span className="text-sm text-[#161616]">{value}</span>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function PurchasedPremiumDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const policyNumber = decodeURIComponent((params?.id as string) ?? "");
  const premium = getPremiumByPolicyNumber(policyNumber);

  const backButton = (
    <button
      onClick={() => router.push("/customer/purchased-premium")}
      className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-800 transition-colors font-medium"
    >
      <ChevronLeft className="w-4 h-4" />
      Back to Premiums
    </button>
  );

  if (!premium) {
    return (
      <div className="min-h-screen">
        <div className="pb-4">{backButton}</div>
        <div className="rounded-[8px] border border-[#F3F4F6] bg-white p-10 text-center">
          <h1 className="text-lg font-semibold text-stone-800">
            Policy not found
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            We couldn&apos;t find a policy with the number {policyNumber}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Top Nav */}
      <div className="pb-4">{backButton}</div>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 p-4 bg-white border border-[#F3F4F6] rounded-[8px]">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold font-heading tracking-tight">
                {premium.product}
              </h1>
              <span
                className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${PREMIUM_STATUS_CLASS[premium.status]}`}
              >
                {premium.status}
              </span>
            </div>
            <p className="text-sm text-stone-500 mt-1">
              Policy Number:{" "}
              <span className="text-[#AF060D] font-semibold tracking-wide">
                {premium.policyNumber}
              </span>
            </p>
            <p className="text-sm text-stone-500 mt-0.5">
              {premium.category} Insurance · {premium.coveragePeriod}
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button
              disabled
              title="Policy download is not available yet"
              className="flex items-center gap-2 px-4 py-2.5 bg-[#AF060D] text-white text-sm font-semibold rounded-full transition-colors shadow-md shadow-rose-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              Download Policy Document
            </button>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
          {/* Left Column */}
          <div className="space-y-4 bg-white border border-[#F3F4F6] p-4 rounded-[10px]">
            <AccordionSection title="Personal Details">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                <FieldPair label="First Name" value={POLICY_HOLDER.firstName} />
                <FieldPair label="Last Name" value={POLICY_HOLDER.lastName} />
                <FieldPair label="Email Address" value={POLICY_HOLDER.email} />
                <FieldPair label="Phone Number" value={POLICY_HOLDER.phone} />
                <FieldPair label="NIN Number" value={POLICY_HOLDER.nin} />
                <FieldPair
                  label="Date of Birth"
                  value={POLICY_HOLDER.dateOfBirth}
                />
                <FieldPair label="State" value={POLICY_HOLDER.state} />
                <FieldPair label="City/LGA" value={POLICY_HOLDER.city} />
                <FieldPair label="Address" value={POLICY_HOLDER.address} />
              </div>
            </AccordionSection>

            {premium.vehicle && (
              <AccordionSection title="Vehicle Details">
                <VehicleDetailsFields vehicle={premium.vehicle} />
              </AccordionSection>
            )}
          </div>

          {/* Right Column — Policy Overview */}
          <div className="space-y-4 bg-white border border-[#F3F4F6] p-4 rounded-[10px]">
            <AccordionSection title="Policy Overview">
              <div className="grid grid-cols-1 gap-x-8 gap-y-5">
                <FieldPair label="Policy Number:" value={premium.policyNumber} />
                <FieldPair label="Policy Holder:" value={policyHolderName()} />
                <FieldPair
                  label="Insurance Type:"
                  value={`${premium.category} Insurance`}
                />
                <FieldPair label="Product:" value={premium.product} />
                <FieldPair
                  label="Premium Amount:"
                  value={formatPremiumAmount(premium.premiumPaid)}
                />
                <FieldPair
                  label="Date Purchased:"
                  value={formatPremiumDate(premium.datePurchased)}
                />
                <FieldPair
                  label="Expiry Date:"
                  value={formatPremiumDate(premium.expiryDate)}
                />
                <FieldPair
                  label="Coverage Period:"
                  value={premium.coveragePeriod}
                />
                <FieldPair label="Status:" value={premium.status} />
              </div>
            </AccordionSection>
          </div>
        </div>
      </div>
    </div>
  );
}
