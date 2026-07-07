"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Field {
  label: string;
  value: string;
}

// Demo data — replace with real coupon lookup by id
const generatorDetails: Field[] = [
  { label: "First Name", value: "Mauteen" },
  { label: "Surname", value: "Adeleke" },
  { label: "Email Address", value: "mauteen@gmail.com" },
  { label: "Phone Number", value: "0909090909090" },
];

const personalDetails: Field[] = [
  { label: "First Name", value: "Mauteen" },
  { label: "Surname", value: "Adeleke" },
  { label: "Email Address", value: "mauteen@gmail.com" },
  { label: "Phone Number", value: "0909090909090" },
  { label: "State", value: "Lagos" },
  { label: "City/LGA", value: "Ikeja" },
  { label: "Date of Birth", value: "15/05/1880" },
  { label: "NIN", value: "123456789000" },
];

const policyOverview: Field[] = [
  { label: "Policy Number:", value: "KA-09795170" },
  { label: "Policy Holder:", value: "Mauteen Adeleke" },
  { label: "Insurance Type:", value: "Home & Property Insurance" },
  { label: "Product:", value: "Tenant Policy" },
  { label: "Premium Amount:", value: "N10,000" },
  { label: "Date Purchased:", value: "12/8/2025" },
  { label: "Coverage Period:", value: "12 Months" },
];

export default function AdminCouponDetailPage() {
  const [generatorOpen, setGeneratorOpen] = useState(true);
  const [personalOpen, setPersonalOpen] = useState(true);

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
              Tenant Policy Insurance
            </h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F0FDF4] text-green-700 border border-[#BBF7D0]">
              Redeemed
            </span>
          </div>
          <p className="text-sm text-[#6B7280] mt-1">
            Coupon Code:{" "}
            <span className="text-[#AF060D] font-semibold">COP-E6LAA</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="rounded-full border-[#AF060D] text-[#AF060D] hover:bg-red-50 font-medium px-5"
          >
            Download Receipt
          </Button>
          <Button className="rounded-full bg-[#AF060D] hover:bg-[#AF060D]/90 text-white font-medium px-5">
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
            title="Personal Details"
            open={personalOpen}
            onToggle={() => setPersonalOpen((v) => !v)}
            fields={personalDetails}
            footer={
              <FieldItem label="Address" value="08 Johnson Street, Ikeja Lagos State" />
            }
          />
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
