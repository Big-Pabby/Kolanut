"use client";

import type { ReactNode } from "react";
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

interface PersonalInfoFields {
  firstName?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  nin?: string;
  state?: string;
  city?: string;
}

interface LocationFields {
  state?: string;
  city?: string;
  address?: string;
}

interface Step2ProvideDetailsProps<T extends Record<string, any>> {
  personalFields?: PersonalInfoFields;
  locationFields?: LocationFields;
  extraFields?: ReactNode;
  onUpdate: (field: keyof T, value: string) => void;
  onContinue: () => void;
  onBack?: () => void;
  title?: string;
  description?: string;
  fullWidthOnMobile?: boolean;
}

export default function Step2ProvideDetails<T extends Record<string, any>>({
  personalFields,
  locationFields,
  extraFields,
  onUpdate,
  onContinue,
  onBack,
  title = "Provide Your Details",
  description = "Fill in the information below to get your quote.",
  fullWidthOnMobile = false,
}: Step2ProvideDetailsProps<T>) {
  const stateList = useMemo(() => Array.from(States.keys()).sort(), []);
  const cityList = useMemo(() => {
    if (!personalFields?.state) return [];
    return States.get(personalFields.state) ?? [];
  }, [personalFields?.state]);

  // Validation: Check if all required fields are filled
  const isFormValid = useMemo(() => {
    // If personalFields are provided, validate them
    if (personalFields) {
      const personalValid =
        personalFields.firstName?.trim() &&
        personalFields.lastname?.trim() &&
        personalFields.email?.trim() &&
        personalFields.phone?.trim() &&
        personalFields.dateOfBirth?.trim() &&
        personalFields.nin?.trim() &&
        personalFields.state?.trim() &&
        personalFields.city?.trim();

      if (!personalValid) return false;
    }

    // If locationFields are provided, validate only the address field
    // (state and city are already in personalFields)
    if (locationFields) {
      const locationValid = locationFields.address?.trim();

      if (!locationValid) return false;
    }

    return true;
  }, [personalFields, locationFields]);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl lg:text-2xl font-semibold text-dark-text">
          {title}
        </h2>
        <p className="text-sm lg:text-base font-normal text-body-text">
          {description}
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Coupon Generator Details — only shown when arriving via the coupon flow */}
        <CouponGeneratorDetails />
        <CustomerPersonalDetailsHeading />

        {/* Personal Information */}
        {personalFields && (
          <>
            {/* First Name + Surname */}
            <div
              className={`grid gap-5 ${fullWidthOnMobile ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"}`}
            >
              <FormInput
                label="First Name"
                placeholder="Enter"
                value={personalFields.firstName || ""}
                onChange={(v) => onUpdate("firstName" as keyof T, v)}
              />
              <FormInput
                label="Last Name"
                placeholder="Enter"
                value={personalFields.lastname || ""}
                onChange={(v) => onUpdate("lastname" as keyof T, v)}
              />
            </div>

            {/* Email + Phone */}
            <div
              className={`grid gap-5 ${fullWidthOnMobile ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"}`}
            >
              <FormInput
                label="Email Address"
                placeholder="Enter email address"
                value={personalFields.email || ""}
                onChange={(v) => onUpdate("email" as keyof T, v)}
                type="email"
              />
              <FormInput
                label="Phone Number"
                placeholder="Enter phone number"
                value={personalFields.phone || ""}
                onChange={(v) => onUpdate("phone" as keyof T, v)}
                type="tel"
              />
            </div>

            {/* Date of Birth + NIN */}
            <div
              className={`grid gap-5 ${fullWidthOnMobile ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"}`}
            >
              <FormInput
                label="Date of Birth"
                placeholder="mm/dd/yyyy"
                value={personalFields.dateOfBirth || ""}
                onChange={(v) => onUpdate("dateOfBirth" as keyof T, v)}
                type="date"
              />
              <FormInput
                label="NIN"
                placeholder="Enter"
                value={personalFields.nin || ""}
                onChange={(v) => onUpdate("nin" as keyof T, v)}
              />
            </div>
          </>
        )}

        {/* Location Information */}
        {locationFields && (
          <>
            {/* State + City/LGA */}
            <div
              className={`grid gap-5 ${fullWidthOnMobile ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"}`}
            >
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#374151]">
                  State
                </label>
                <Select
                  value={personalFields?.state || ""}
                  onValueChange={(v) => {
                    onUpdate("state" as keyof T, v);
                    onUpdate("city" as keyof T, "");
                  }}
                >
                  <SelectTrigger className="!h-12 w-full rounded-[10px] border border-[#d1d5db] shadow-[0_1px_2px_rgba(18,26,43,0.05)]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {stateList.map((s, index) => (
                      <SelectItem key={`${s}-${index}`} value={s}>
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
                  value={personalFields?.city || ""}
                  onValueChange={(v) => onUpdate("city" as keyof T, v)}
                  disabled={!personalFields?.state}
                >
                  <SelectTrigger className="!h-12 w-full rounded-[10px] border border-[#d1d5db] shadow-[0_1px_2px_rgba(18,26,43,0.05)]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {cityList.map((c, index) => (
                      <SelectItem key={`${c}-${index}`} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Address */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#374151]">
                Address
              </label>
              <textarea
                placeholder="Enter address"
                value={locationFields.address || ""}
                onChange={(e) => onUpdate("address" as keyof T, e.target.value)}
                rows={3}
                className="w-full rounded-[10px] border border-[#d1d5db] px-3 py-3 text-sm text-dark-text placeholder:text-[#6b7280] shadow-[0_1px_2px_rgba(18,26,43,0.05)] outline-none focus:border-brand-red transition-colors bg-white resize-none"
              />
            </div>
          </>
        )}

        {/* Extra custom fields */}
        {extraFields}
      </div>

      {/* Navigation */}
      <StepNavigation
        onBack={onBack}
        onContinue={onContinue}
        isDisabled={!isFormValid}
      />
    </div>
  );
}
