"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const inputClass =
  "h-12 w-full rounded-[10px] border border-[#d1d5db] px-3 text-sm text-[#161616] placeholder:text-[#6b7280] shadow-[0_1px_2px_rgba(18,26,43,0.05)] outline-none focus:border-brand-red transition-colors bg-white";

interface RedeemCouponDetailsProps {
  couponCode: string;
  onBack: () => void;
  onActivate: () => void;
}

interface Field {
  label: string;
  key: string;
  type?: string;
  placeholder?: string;
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "Enter",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-[#374151]">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    </div>
  );
}

const generatorFields: Field[] = [
  { label: "First Name", key: "genFirstName" },
  { label: "Last Name", key: "genLastName" },
  { label: "Phone Number", key: "genPhone", type: "tel" },
  { label: "Email Address", key: "genEmail", type: "email" },
];

export default function RedeemCouponDetails({
  couponCode,
  onBack,
  onActivate,
}: RedeemCouponDetailsProps) {
  const [form, setForm] = useState<Record<string, string>>({});
  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <section className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 py-10 md:py-12">
      {/* Back header */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-dark-text mb-6 hover:text-brand-red transition-colors"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        <span className="text-lg font-semibold">Redeem Coupon</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: forms */}
        <div className="lg:col-span-2 rounded-xl border border-card-border bg-white p-6 md:p-8 flex flex-col gap-8">
          {/* Coupon Generator Information */}
          <div className="flex flex-col gap-5">
            <div>
              <h3 className="text-base font-semibold text-dark-text mb-2">
                Coupon Generator Information
              </h3>
              <hr className="border-card-border" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {generatorFields.map((f) => (
                <TextField
                  key={f.key}
                  label={f.label}
                  type={f.type}
                  value={form[f.key] || ""}
                  onChange={(v) => update(f.key, v)}
                />
              ))}
            </div>
          </div>

          {/* Customer Personal Information */}
          <div className="flex flex-col gap-5">
            <div>
              <h3 className="text-base font-semibold text-dark-text mb-2">
                Customer Personal Information
              </h3>
              <hr className="border-card-border" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Title */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#374151]">
                  Title
                </label>
                <Select
                  value={form.title || ""}
                  onValueChange={(v) => update("title", v)}
                >
                  <SelectTrigger className="!h-12 w-full rounded-[10px] border border-[#d1d5db] shadow-[0_1px_2px_rgba(18,26,43,0.05)]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Mr", "Mrs", "Miss", "Ms", "Dr"].map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <TextField
                label="First Name"
                value={form.firstName || ""}
                onChange={(v) => update("firstName", v)}
              />
              <TextField
                label="Last Name"
                value={form.lastName || ""}
                onChange={(v) => update("lastName", v)}
              />
              <TextField
                label="Other Name (If any)"
                value={form.otherName || ""}
                onChange={(v) => update("otherName", v)}
              />
            </div>

            <TextField
              label="NIN Number"
              value={form.nin || ""}
              onChange={(v) => update("nin", v)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <TextField
                label="Email Address"
                type="email"
                placeholder="Enter email address"
                value={form.email || ""}
                onChange={(v) => update("email", v)}
              />
              <TextField
                label="Phone Number"
                type="tel"
                placeholder="Enter phone number"
                value={form.phone || ""}
                onChange={(v) => update("phone", v)}
              />
              <TextField
                label="Date of Birth"
                type="date"
                placeholder="Select"
                value={form.dob || ""}
                onChange={(v) => update("dob", v)}
              />
              <TextField
                label="Age Next Birthday"
                placeholder="..."
                value={form.ageNextBirthday || ""}
                onChange={(v) => update("ageNextBirthday", v)}
              />
            </div>
          </div>
        </div>

        {/* Right: payment + quote summary */}
        <div className="flex flex-col gap-6">
          {/* Payment */}
          <div className="rounded-xl border border-card-border bg-white p-6">
            <h3 className="text-base font-semibold text-dark-text mb-2">
              Payment
            </h3>
            <hr className="border-card-border mb-4" />

            <SummaryRow label="Premium Cost:" value="₦26,275" />
            <SummaryRow label="Extra Fee:" value="₦10" />
            <SummaryRow label="Coupon code" value={couponCode || "—"} />
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-[#4b5563]">Total Cost:</span>
              <span className="text-base font-semibold text-brand-red">
                -₦26,275
              </span>
            </div>

            <Button
              onClick={onActivate}
              className="mt-2 w-full rounded-full bg-brand-red text-white text-sm font-medium !py-3 h-auto hover:bg-brand-red/90"
            >
              Activate Premium
            </Button>
            <p className="mt-3 text-center text-xs text-[#6b7280]">
              This premium has already been paid for, no further payment is
              required. Click the button above to activate your premium.
            </p>
          </div>

          {/* Quote Summary */}
          <div className="rounded-xl border border-card-border bg-white p-6">
            <h3 className="text-base font-semibold text-dark-text mb-2">
              Quote Summary
            </h3>
            <hr className="border-card-border mb-4" />
            <SummaryRow label="Full Name:" value="Mauteen Adeleke" bold />
            <SummaryRow label="Insurance Type:" value="Home Insurance" bold />
            <SummaryRow label="Product:" value="Tenant Policy" bold />
          </div>
        </div>
      </div>
    </section>
  );
}

function SummaryRow({
  label,
  value,
  bold = false,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-card-border last:border-0">
      <span className="text-sm text-[#4b5563]">{label}</span>
      <span
        className={`text-sm text-[#161616] ${bold ? "font-semibold" : "font-medium"}`}
      >
        {value}
      </span>
    </div>
  );
}
