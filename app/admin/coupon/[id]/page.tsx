"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import VehicleDetailsFields from "@/components/customer/VehicleDetailsFields";
import { formatAdminAmount, formatAdminDate } from "@/lib/data/admin";
import { getAdminCouponById } from "@/lib/data/coupons";
import { getPremiumByPolicyNumber } from "@/lib/data/premiums";
import { useAdminAccess } from "@/lib/auth/useAdminAccess";

interface Field {
  label: string;
  value: string;
}

export default function AdminCouponDetailPage() {
  const params = useParams();
  const couponId = decodeURIComponent((params?.id as string) ?? "");
  const coupon = getAdminCouponById(couponId);
  const { canDownload } = useAdminAccess();
  const [generatorOpen, setGeneratorOpen] = useState(true);
  const [personalOpen, setPersonalOpen] = useState(true);
  const premium = coupon?.policyNumber
    ? getPremiumByPolicyNumber(coupon.policyNumber)
    : undefined;

  if (!coupon) {
    return (
      <div className="mx-auto space-y-6">
        <Link
          href="/admin/coupon"
          className="flex items-center gap-2 w-fit text-[#6B7280] hover:text-gray-900 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">Back to Coupons</span>
        </Link>
        <div className="border border-[#F3F4F6] bg-white p-10 rounded-[8px] text-center">
          <h1 className="text-lg font-semibold text-gray-900">
            Coupon not found
          </h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            We couldn&apos;t find a coupon with the ID {couponId}.
          </p>
        </div>
      </div>
    );
  }

  const [generatorFirstName, ...generatorSurname] = coupon.generator.split(" ");
  const [customerFirstName, ...customerSurname] = coupon.customer.split(" ");
  const generatorDetails: Field[] = [
    { label: "First Name", value: generatorFirstName },
    { label: "Surname", value: generatorSurname.join(" ") || "—" },
    { label: "Email Address", value: coupon.generatorEmail },
    { label: "Phone Number", value: coupon.generatorPhone },
  ];
  const personalDetails: Field[] = [
    { label: "First Name", value: customerFirstName },
    { label: "Surname", value: customerSurname.join(" ") || "—" },
    { label: "Email Address", value: coupon.customerEmail },
    { label: "Phone Number", value: coupon.customerPhone },
    { label: "State", value: coupon.state },
    { label: "City/LGA", value: coupon.city },
    { label: "Date of Birth", value: coupon.dateOfBirth },
    { label: "NIN", value: coupon.nin },
  ];
  const policyOverview: Field[] = [
    { label: "Policy Number:", value: coupon.policyNumber ?? "Not issued yet" },
    { label: "Policy Holder:", value: coupon.customer },
    { label: "Insurance Type:", value: coupon.insuranceType },
    { label: "Product:", value: coupon.product },
    { label: "Premium Amount:", value: formatAdminAmount(coupon.amount) },
    { label: "Date Created:", value: formatAdminDate(coupon.dateCreated) },
    { label: "Coverage Period:", value: coupon.coveragePeriod },
  ];

  return (
    <div className="mx-auto space-y-6">
      {/* Back link */}
      <Link
        href="/admin/coupon"
        className="flex items-center gap-2 w-fit text-[#6B7280] hover:text-gray-900 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="text-sm">Back to Coupons</span>
      </Link>

      {/* Header card */}
      <div className="border border-[#F3F4F6] bg-white p-6 rounded-[8px] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-heading font-bold text-gray-900">
              {coupon.product}
            </h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F0FDF4] text-green-700 border border-[#BBF7D0]">
              {coupon.status === "redeemed" ? "Redeemed" : "Not Redeemed"}
            </span>
          </div>
          <p className="text-sm text-[#6B7280] mt-1">
            Coupon Code:{" "}
            <span className="text-[#AF060D] font-semibold">{coupon.code}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            disabled={!canDownload}
            title={canDownload ? undefined : "Your role cannot download documents"}
            className="rounded-full border-[#AF060D] text-[#AF060D] hover:bg-red-50 font-medium px-5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Download Receipt
          </Button>
          <Button
            disabled={!canDownload}
            title={canDownload ? undefined : "Your role cannot download documents"}
            className="rounded-full bg-[#AF060D] hover:bg-[#AF060D]/90 text-white font-medium px-5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Download Policy
          </Button>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: details */}
        <div className="lg:col-span-2 space-y-6">
          <CollapsibleCard
            title="Coupon Generator Details"
            open={generatorOpen}
            onToggle={() => setGeneratorOpen((v) => !v)}
            fields={generatorDetails}
          />
          <CollapsibleCard
            title="Policy holder details"
            open={personalOpen}
            onToggle={() => setPersonalOpen((v) => !v)}
            fields={personalDetails}
            footer={<FieldItem label="Address" value={coupon.address} />}
          />
          {premium?.vehicle && (
            <div className="border border-[#F3F4F6] bg-white rounded-[8px] overflow-hidden p-6">
              <h2 className="text-lg font-heading font-bold text-gray-900 mb-4">
                Vehicle Details
              </h2>
              <VehicleDetailsFields vehicle={premium.vehicle} />
            </div>
          )}
        </div>

        {/* Right: policy overview */}
        <div className="border border-[#F3F4F6] bg-white rounded-[8px] p-6 h-fit">
          <h2 className="text-lg font-heading font-bold text-gray-900 mb-4">
            Policy Overview
          </h2>
          <div className="flex flex-col gap-4">
            {policyOverview.map((f) => (
              <div key={f.label} className="flex flex-col gap-1">
                <span className="text-sm text-[#6B7280]">{f.label}</span>
                <span
                  className={`text-sm font-medium ${
                    f.label === "Policy Number:"
                      ? "text-[#AF060D]"
                      : "text-gray-900"
                  }`}
                >
                  {f.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CollapsibleCard({
  title,
  open,
  onToggle,
  fields,
  footer,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  fields: Field[];
  footer?: React.ReactNode;
}) {
  return (
    <div className="border border-[#F3F4F6] bg-white rounded-[8px] overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4"
      >
        <h2 className="text-lg font-heading font-bold text-gray-900">
          {title}
        </h2>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform ${
            open ? "" : "-rotate-90"
          }`}
        />
      </button>
      {open && (
        <div className="px-6 pb-6 flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
            {fields.map((f) => (
              <FieldItem key={f.label} label={f.label} value={f.value} />
            ))}
          </div>
          {footer}
        </div>
      )}
    </div>
  );
}

function FieldItem({ label, value }: Field) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-[#6B7280]">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  );
}
