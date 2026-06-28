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
import { States } from "@/utils/states";
import type { LifeInsuranceFormData } from "@/lib/store/lifeInsuranceStore";

const FREQUENCY_OPTIONS = ["Annually", "Quarterly", "Monthly"];
const GENDER_OPTIONS = ["Male", "Female"];

const triggerClass =
  "!h-12 w-full rounded-[10px] border border-[#d1d5db] shadow-[0_1px_2px_rgba(18,26,43,0.05)]";

interface Props {
  formData: LifeInsuranceFormData;
  onUpdate: (field: keyof LifeInsuranceFormData, value: string) => void;
  onContinue: () => void;
  onBack?: () => void;
}

export default function LifestyleProtectionStep1({
  formData,
  onUpdate,
  onContinue,
  onBack,
}: Props) {
  const stateList = useMemo(() => Array.from(States.keys()).sort(), []);
  const cityList = useMemo(() => {
    if (!formData.state) return [];
    return States.get(formData.state) ?? [];
  }, [formData.state]);

  const isFormValid =
    !!formData.sumAssured.trim() &&
    !!formData.premiumFrequency &&
    !!formData.coverDuration.trim() &&
    !!formData.liveCover.trim() &&
    !!formData.firstName.trim() &&
    !!formData.lastname.trim() &&
    !!formData.gender &&
    !!formData.dateOfBirth &&
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
        <CouponGeneratorDetails />

        {/* Sum Assured + Premium Frequency */}
        <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
          <FormInput
            label="Sum Assured"
            placeholder="Enter amount"
            value={formData.sumAssured}
            onChange={(v) => onUpdate("sumAssured", v)}
            type="number"
          />
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#374151]">
              Premium Frequency
            </label>
            <Select
              value={formData.premiumFrequency}
              onValueChange={(v) => onUpdate("premiumFrequency", v)}
            >
              <SelectTrigger className={triggerClass}>
                <SelectValue placeholder="Select" />
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

        {/* Cover Duration + Live Cover */}
        <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
          <FormInput
            label="Cover Duration (in years)"
            placeholder="Enter"
            value={formData.coverDuration}
            onChange={(v) => onUpdate("coverDuration", v)}
            type="number"
          />
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#374151]">
              Live Cover{" "}
              <span className="text-[#9ca3af] font-normal">
                (minimum of N500,000)
              </span>
            </label>
            <input
              type="number"
              placeholder="Enter"
              value={formData.liveCover}
              onChange={(e) => onUpdate("liveCover", e.target.value)}
              className="h-12 w-full rounded-[10px] border border-[#d1d5db] px-3 text-sm text-[#161616] placeholder:text-[#6b7280] shadow-[0_1px_2px_rgba(18,26,43,0.05)] outline-none focus:border-brand-red transition-colors bg-white"
            />
          </div>
        </div>

        {/* Your Personal Information */}
        <div>
          <h3 className="text-base font-semibold text-dark-text mb-2">
            Your Personal Information
          </h3>
          <hr className="border-[#f3f4f6]" />
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

        {/* Gender + Date of Birth */}
        <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#374151]">Gender</label>
            <Select
              value={formData.gender}
              onValueChange={(v) => onUpdate("gender", v)}
            >
              <SelectTrigger className={triggerClass}>
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
              <SelectTrigger className={triggerClass}>
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
              <SelectTrigger className={triggerClass}>
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
