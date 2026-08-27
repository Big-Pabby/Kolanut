"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronDown, ChevronLeft, Eye, FileText, ImageIcon } from "lucide-react";
import {
  buildClaimTimeline,
  claimReference,
  CLAIM_STATUS_CLASS,
  formatClaimAmount,
  formatClaimDateDMY,
  formatIncidentDate,
  getClaimById,
} from "@/lib/data/claims";
import {
  POLICY_HOLDER,
  formatPremiumAmount,
  formatPremiumDate,
  getPremiumByPolicyNumber,
  policyHolderName,
} from "@/lib/data/premiums";

function AccordionSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-[#F3F4F6] rounded-[10px] bg-white p-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left"
      >
        <span className="text-base font-heading font-bold text-gray-900 tracking-tight">
          {title}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          open ? "max-h-[3000px] opacity-100 mt-5" : "max-h-0 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-[#6B7280]">{label}</span>
      <span className="text-sm text-[#161616]">{value}</span>
    </div>
  );
}

export default function AdminClaimDetailPage() {
  const params = useParams();
  const claimId = decodeURIComponent((params?.id as string) ?? "");
  const claim = getClaimById(claimId);

  const backLink = (
    <Link
      href="/admin/claims"
      className="flex items-center gap-1.5 w-fit text-sm text-stone-500 hover:text-stone-800 transition-colors font-medium"
    >
      <ChevronLeft className="w-4 h-4" />
      Back to Claims
    </Link>
  );

  if (!claim) {
    return (
      <div className="mx-auto space-y-6">
        {backLink}
        <div className="rounded-[8px] border border-[#F3F4F6] bg-white p-10 text-center">
          <h1 className="text-lg font-semibold text-stone-800">
            Claim not found
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            We couldn&apos;t find a claim with the ID {claimId}.
          </p>
        </div>
      </div>
    );
  }

  const premium = getPremiumByPolicyNumber(claim.policyNumber);
  const timeline = buildClaimTimeline(claim);

  return (
    <div className="mx-auto space-y-6">
      {backLink}

      {/* Header */}
      <div className="p-4 md:p-6 bg-white border border-[#F3F4F6] rounded-[8px]">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-heading font-bold text-gray-900 tracking-tight">
            {claimReference(claim)}
          </h1>
          <span
            className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${CLAIM_STATUS_CLASS[claim.status]}`}
          >
            {claim.status}
          </span>
        </div>
        <p className="text-sm text-[#6B7280] mt-1">
          Date Submitted: {formatClaimDateDMY(claim.dateFiled)}
        </p>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
        {/* Left column */}
        <div className="space-y-6">
          <AccordionSection title="Customer Details">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
              <Field label="Customer Name" value={policyHolderName()} />
              <Field label="Email Address" value={POLICY_HOLDER.email} />
              <Field label="NIN Number" value={POLICY_HOLDER.nin} />
              <Field label="Phone Number" value={POLICY_HOLDER.phone} />
              <Field label="State" value={POLICY_HOLDER.state} />
              <Field label="Country" value="Nigeria" />
            </div>
          </AccordionSection>

          <AccordionSection title="Claim Details">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
              <Field
                label="Date of Incident"
                value={formatIncidentDate(claim.dateOfIncident)}
              />
              <Field label="Time of Incident" value={claim.timeOfIncident} />
              <Field label="Incident type" value={claim.incidentType} />
              <div className="sm:col-span-2">
                <Field label="Location of incident" value={claim.location} />
              </div>
              <div className="sm:col-span-2 flex flex-col gap-0.5">
                <span className="text-xs text-[#6B7280]">
                  Describe the full circumstance of the incident
                </span>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  {claim.description}
                </p>
              </div>
            </div>
          </AccordionSection>

          <AccordionSection title="Images/Documents submitted">
            <div className="flex flex-col gap-4">
              {claim.document && (
                <div className="flex items-center justify-between rounded-[10px] border border-[#F3F4F6] px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100">
                      <FileText className="w-4 h-4 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#161616]">
                        {claim.document.name}
                      </p>
                      <p className="text-xs text-[#6B7280]">
                        {claim.document.size}
                      </p>
                    </div>
                  </div>
                  <button
                    className="text-gray-400 hover:text-gray-700 transition-colors"
                    title="Preview"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              )}

              {claim.imageCount > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {Array.from({ length: claim.imageCount }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-center aspect-square rounded-[10px] bg-gray-100 border border-[#F3F4F6]"
                    >
                      <ImageIcon className="w-6 h-6 text-gray-400" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </AccordionSection>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Claim Settlement */}
          <div className="border border-[#F3F4F6] rounded-[10px] bg-white p-4">
            <h2 className="text-base font-heading font-bold text-gray-900 mb-4">
              Claim Settlement
            </h2>
            <div className="flex items-center justify-between rounded-[10px] bg-[#F9FAFB] px-4 py-3">
              <span className="text-sm text-[#374151]">Amount Paid:</span>
              {claim.settledAmount != null ? (
                <span className="text-base font-semibold text-[#15803D]">
                  {formatClaimAmount(claim.settledAmount)}
                </span>
              ) : (
                <span className="text-sm font-medium text-[#B45309]">
                  Pending settlement
                </span>
              )}
            </div>
          </div>

          {/* Policy Overview */}
          <AccordionSection title="Policy Overview">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-[#6B7280]">Policy Number:</span>
                <span className="text-sm font-semibold text-[#AF060D]">
                  {claim.policyNumber}
                </span>
              </div>
              <Field label="Policy Holder:" value={policyHolderName()} />
              <Field
                label="Insurance Type:"
                value={`${claim.insuranceType} Insurance`}
              />
              <Field label="Product:" value={premium?.product ?? "—"} />
              <Field
                label="Premium Amount:"
                value={premium ? formatPremiumAmount(premium.premiumPaid) : "—"}
              />
              <Field
                label="Date Purchased:"
                value={premium ? formatPremiumDate(premium.datePurchased) : "—"}
              />
              <Field
                label="Coverage Period:"
                value={premium?.coveragePeriod ?? "12 Months"}
              />
            </div>
          </AccordionSection>

          {/* Activity timeline */}
          <AccordionSection title="Activity timeline">
            <ol className="relative flex flex-col gap-5">
              {timeline.map((step, i) => {
                const isRejected = step.label === "Rejected";
                return (
                  <li key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span
                        className={`mt-1 w-2.5 h-2.5 rounded-full ${
                          isRejected ? "bg-[#B91C1C]" : "bg-[#15803D]"
                        }`}
                      />
                      {i < timeline.length - 1 && (
                        <span className="w-px flex-1 bg-[#E5E7EB]" />
                      )}
                    </div>
                    <div className="pb-1">
                      <p
                        className={`text-sm font-medium ${
                          isRejected ? "text-[#B91C1C]" : "text-[#15803D]"
                        }`}
                      >
                        {step.label}
                      </p>
                      <p className="text-xs text-[#6B7280] mt-0.5">
                        {formatClaimDateDMY(step.date)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </AccordionSection>
        </div>
      </div>
    </div>
  );
}
