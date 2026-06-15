"use client";

import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormInput from "@/components/home-insurance/FormInput";
import StepNavigation from "@/components/insurance/StepNavigation";
import CouponGeneratorDetails from "@/components/coupon/CouponGeneratorDetails";
import CustomerPersonalDetailsHeading from "@/components/coupon/CustomerPersonalDetailsHeading";
import { States } from "@/utils/states";
import type { LifeInsuranceFormData } from "@/lib/store/lifeInsuranceStore";

interface PremiumOption {
  value: string;
  label: string;
}

interface Props {
  formData: LifeInsuranceFormData;
  onUpdate: (field: keyof LifeInsuranceFormData, value: string) => void;
  onContinue: () => void;
  onBack?: () => void;
  premiumOptions?: PremiumOption[];
}

const DEFAULT_PREMIUM_OPTIONS: PremiumOption[] = [
  { value: "7500", label: "₦7,500 (up to ₦500,000 benefit)" },
  { value: "10000", label: "₦10,000 (up to ₦1,000,000 benefit)" },
];

const FREQUENCY_OPTIONS = ["Annually", "Quarterly", "Monthly"];

const GENDER_OPTIONS = ["Male", "Female"];

export default function TermLifeStep1PersonalInfo({
  formData,
  onUpdate,
  onContinue,
  onBack,
  premiumOptions = DEFAULT_PREMIUM_OPTIONS,
}: Props) {
  const stateList = useMemo(() => Array.from(States.keys()).sort(), []);
  const cityList = useMemo(() => {
    if (!formData.state) return [];
    return States.get(formData.state) ?? [];
  }, [formData.state]);

  const isFormValid =
    !!formData.premiumAmount &&
    !!formData.premiumFrequency &&
    !!formData.gender &&
    !!formData.dateOfBirth &&
    !!formData.firstName.trim() &&
    !!formData.lastname.trim() &&
    !!formData.phone.trim() &&
    !!formData.email.trim() &&
    !!formData.nin.trim() &&
    !!formData.state &&
    !!formData.city &&
    !!formData.address.trim();

  return (
    <div className="rounded-xl border border-[#f3f4f6] bg-white p-6 lg:p-8 space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl lg:text-2xl font-semibold text-dark-text">
          Provide Your Details
        </h2>
        <p className="text-sm lg:text-base font-normal text-body-text">
          Fill in the information below to get your quote.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Coupon Generator Details — only shown when arriving via the coupon flow */}
        <CouponGeneratorDetails />
        <CustomerPersonalDetailsHeading />

        {/* Premium Amount + Premium Frequency */}
        <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#374151]">
              Premium Amount
            </label>
            <Select
              value={formData.premiumAmount}
              onValueChange={(v) => onUpdate("premiumAmount", v)}
            >
              <SelectTrigger className="!h-12 w-full rounded-[10px] border border-[#d1d5db] shadow-[0_1px_2px_rgba(18,26,43,0.05)]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {premiumOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#374151]">
              Premium Frequency
            </label>
            <Select
              value={formData.premiumFrequency}
              onValueChange={(v) => onUpdate("premiumFrequency", v)}
            >
              <SelectTrigger className="!h-12 w-full rounded-[10px] border border-[#d1d5db] shadow-[0_1px_2px_rgba(18,26,43,0.05)]">
                <SelectValue placeholder="Annually" />
              </SelectTrigger>
              <SelectContent>
                {FREQUENCY_OPTIONS.map((f) => (
                  <SelectItem key={f} value={f}>
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Gender + Date of Birth */}
        <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#374151]">Gender</label>
            <Select
              value={formData.gender}
              onValueChange={(v) => onUpdate("gender", v)}
            >
              <SelectTrigger className="!h-12 w-full rounded-[10px] border border-[#d1d5db] shadow-[0_1px_2px_rgba(18,26,43,0.05)]">
                <SelectValue placeholder="Male" />
              </SelectTrigger>
              <SelectContent>
                {GENDER_OPTIONS.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <FormInput
            label="Date of Birth"
            placeholder="mm/dd/yyyy"
            value={formData.dateOfBirth}
            onChange={(v) => onUpdate("dateOfBirth", v)}
            type="date"
          />
        </div>

        {/* First Name + Last Name */}
        <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
          <FormInput
            label="First Name"
            placeholder="Enter"
            value={formData.firstName}
            onChange={(v) => onUpdate("firstName", v)}
          />
          <FormInput
            label="Last Name"
            placeholder="Enter"
            value={formData.lastname}
            onChange={(v) => onUpdate("lastname", v)}
          />
        </div>

        {/* Other Name + Phone */}
        <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
          <FormInput
            label="Other Name (optional)"
            placeholder="Your middle name"
            value={formData.otherName}
            onChange={(v) => onUpdate("otherName", v)}
          />
          <FormInput
            label="Phone Number"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={(v) => onUpdate("phone", v)}
            type="tel"
          />
        </div>

        {/* Email + NIN */}
        <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
          <FormInput
            label="Email Address"
            placeholder="Enter email address"
            value={formData.email}
            onChange={(v) => onUpdate("email", v)}
            type="email"
          />
          <FormInput
            label="NIN"
            placeholder="Enter"
            value={formData.nin}
            onChange={(v) => onUpdate("nin", v)}
          />
        </div>

        {/* State + City/LGA */}
        <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#374151]">State</label>
            <Select
              value={formData.state}
              onValueChange={(v) => {
                onUpdate("state", v);
                onUpdate("city", "");
              }}
            >
              <SelectTrigger className="!h-12 w-full rounded-[10px] border border-[#d1d5db] shadow-[0_1px_2px_rgba(18,26,43,0.05)]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {stateList.map((s, i) => (
                  <SelectItem key={`${s}-${i}`} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#374151]">
              City/LGA
            </label>
            <Select
              value={formData.city}
              onValueChange={(v) => onUpdate("city", v)}
              disabled={!formData.state}
            >
              <SelectTrigger className="!h-12 w-full rounded-[10px] border border-[#d1d5db] shadow-[0_1px_2px_rgba(18,26,43,0.05)]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {cityList.map((c, i) => (
                  <SelectItem key={`${c}-${i}`} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Address */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#374151]">Address</label>
          <input
            type="text"
            placeholder="Enter"
            value={formData.address}
            onChange={(e) => onUpdate("address", e.target.value)}
            className="h-12 w-full rounded-[10px] border border-[#d1d5db] px-3 text-sm text-[#161616] placeholder:text-[#6b7280] shadow-[0_1px_2px_rgba(18,26,43,0.05)] outline-none focus:border-brand-red transition-colors bg-white"
          />
        </div>
      </div>

      <StepNavigation
        onBack={onBack}
        onContinue={onContinue}
        isDisabled={!isFormValid}
      />
    </div>
  );
}
