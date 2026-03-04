"use client";

import { useHomeInsuranceStore } from "@/lib/store/homeInsuranceStore";
import FormInput from "./FormInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PlusRed from "@/src/assets/icons/plus-red.svg";
import Trash from "@/src/assets/icons/trash.svg";
import { Button } from "@/components/ui/button";

const policyholderOptions = [
  { label: "Private", value: "private" },
  { label: "Corporate", value: "corporate" },
];

const insuranceTypeOptions = [
  { label: "Building Only", value: "building-only" },
  { label: "Content Only", value: "content-only" },
  { label: "Building and Content", value: "building-and-content" },
];

const contentTypeOptions = [
  { label: "Electronics", value: "electronics" },
  { label: "Furniture", value: "furniture" },
  { label: "Jewelry", value: "jewelry" },
  { label: "Mobile Phone/ Devices", value: "mobile-phone" },
  { label: "Appliances", value: "appliances" },
  { label: "Other", value: "other" },
];

interface Step2Props {
  onContinue: () => void;
  onBack: () => void;
}

export default function Step2ProvideDetails({
  onContinue,
  onBack,
}: Step2Props) {
  const {
    formData,
    updateField,
    addContentItem,
    removeContentItem,
    updateContentItem,
  } = useHomeInsuranceStore();

  const isPrivate = formData.policyholderType === "private";
  const isCorporate = formData.policyholderType === "corporate";
  const showBuilding =
    formData.insuranceType === "building-only" ||
    formData.insuranceType === "building-and-content";
  const showContent =
    formData.insuranceType === "content-only" ||
    formData.insuranceType === "building-and-content";

  return (
    <div className="mx-auto w-full max-w-[920px] rounded-xl border border-[#f3f4f6] bg-[#fdfdfd] px-8 py-8">
      {/* Title */}
      <div className="flex flex-col gap-2 mb-6">
        <h2 className="text-2xl font-medium text-[#161616]">
          Step 2 of 4 — Provide Your Details
        </h2>
        <p className="text-base font-normal text-[#4b5563]">
          Fill in the information below to get your personalized quote.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Policy Type Section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium text-[#111827]">Policy Type</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#374151]">
                Policyholder Type
              </label>
              <Select
                value={formData.policyholderType}
                onValueChange={(v) =>
                  updateField(
                    "policyholderType",
                    v as typeof formData.policyholderType,
                  )
                }
              >
                <SelectTrigger className="!h-12 w-full rounded-[10px] border border-[#d1d5db] shadow-[0_1px_2px_rgba(18,26,43,0.05)]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {policyholderOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#374151]">
                Insurance Type
              </label>
              <Select
                value={formData.insuranceType}
                onValueChange={(v) =>
                  updateField(
                    "insuranceType",
                    v as typeof formData.insuranceType,
                  )
                }
              >
                <SelectTrigger className="w-full !h-12 rounded-[10px] border border-[#d1d5db] shadow-[0_1px_2px_rgba(18,26,43,0.05)]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {insuranceTypeOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Personal Information — Default (no selection) */}
        {!isPrivate && !isCorporate && (
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-medium text-[#111827]">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <FormInput
                label="Email Address"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(v) => updateField("email", v)}
                type="email"
              />
              <FormInput
                label="Phone Number"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(v) => updateField("phone", v)}
                type="tel"
              />
            </div>
          </div>
        )}

        {/* Personal Information — Private */}
        {isPrivate && (
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-medium text-[#111827]">
              Personal Information
            </h3>
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <FormInput
                  label="First Name"
                  placeholder="Enter full name"
                  value={formData.firstName}
                  onChange={(v) => updateField("firstName", v)}
                />
                <FormInput
                  label="Last Name"
                  placeholder="Enter full name"
                  value={formData.lastName}
                  onChange={(v) => updateField("lastName", v)}
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <FormInput
                  label="Email Address"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(v) => updateField("email", v)}
                  type="email"
                />
                <FormInput
                  label="Phone Number"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={(v) => updateField("phone", v)}
                  type="tel"
                />
                <FormInput
                  label="NIN Number"
                  placeholder="Enter"
                  value={formData.nin}
                  onChange={(v) => updateField("nin", v)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Company Information — Corporate */}
        {isCorporate && (
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-medium text-[#111827]">
              Company Information
            </h3>
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <FormInput
                  label="Name of Company"
                  placeholder="Enter full name"
                  value={formData.companyName}
                  onChange={(v) => updateField("companyName", v)}
                />
                <FormInput
                  label="NIN Number"
                  placeholder="Enter"
                  value={formData.companyNin}
                  onChange={(v) => updateField("companyNin", v)}
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <FormInput
                  label="Email Address"
                  placeholder="Enter email address"
                  value={formData.companyEmail}
                  onChange={(v) => updateField("companyEmail", v)}
                  type="email"
                />
                <FormInput
                  label="Phone Number"
                  placeholder="Enter phone number"
                  value={formData.companyPhone}
                  onChange={(v) => updateField("companyPhone", v)}
                  type="tel"
                />
              </div>
            </div>
          </div>
        )}

        {/* Building Information */}
        {showBuilding && (
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-medium text-[#111827]">
              Building Information
            </h3>
            <div className="flex flex-col gap-5">
              {/* Description textarea */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#374151]">
                  Description
                </label>
                <textarea
                  placeholder="Enter full description"
                  value={formData.buildingDescription}
                  onChange={(e) =>
                    updateField("buildingDescription", e.target.value)
                  }
                  rows={3}
                  className="w-full rounded-[10px] border border-[#d1d5db] px-3 py-3 text-sm text-[#161616] placeholder:text-[#6b7280] shadow-[0_1px_2px_rgba(18,26,43,0.05)] outline-none focus:border-brand-red transition-colors bg-white resize-none"
                />
                <p className="text-xs text-[#6b7280] leading-5">
                  e.g. A duplex of standard construction consisting of 6
                  bedrooms including 2- bedroom Boys-Quarters, gates, fence,
                  which is situated at No. 1 Goodman Street, Lagos, Nigeria
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <FormInput
                  label="Building Value (Naira)"
                  placeholder="Enter"
                  value={formData.buildingValue}
                  onChange={(v) => updateField("buildingValue", v)}
                />
                <FormInput
                  label="Risk Location"
                  placeholder="Enter"
                  value={formData.buildingRiskLocation}
                  onChange={(v) => updateField("buildingRiskLocation", v)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Content Information */}
        {showContent && (
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-medium text-[#111827]">
              Content Information
            </h3>
            <div className="flex flex-col gap-5">
              {formData.contentItems.map((item, index) => (
                <div key={item.id} className="flex flex-col gap-2">
                  {/* Item row */}
                  <div className="grid grid-cols-3 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-[#374151]">
                        {index === 0 ? "Type" : "Content Type"}
                      </label>
                      <Select
                        value={item.type}
                        onValueChange={(v) =>
                          updateContentItem(item.id, "type", v)
                        }
                      >
                        <SelectTrigger className="w-full !h-12 rounded-[10px] border border-[#d1d5db] shadow-[0_1px_2px_rgba(18,26,43,0.05)]">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {contentTypeOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <FormInput
                      label="Value"
                      placeholder="Enter"
                      value={item.value}
                      onChange={(v) => updateContentItem(item.id, "value", v)}
                    />
                    <FormInput
                      label="Description"
                      placeholder="Enter"
                      value={item.description}
                      onChange={(v) =>
                        updateContentItem(item.id, "description", v)
                      }
                    />
                  </div>
                  {/* Add another / Delete actions */}
                  {index === 0 ? (
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={addContentItem}
                        className="flex items-center gap-1.5 text-base font-medium text-brand-red hover:text-brand-red/80 transition-colors"
                      >
                        Add another
                        <PlusRed
                          width={13}
                          height={13}
                          style={{ color: "#af060d" }}
                        />
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeContentItem(item.id)}
                        className="flex items-center gap-1.5 text-base font-medium text-[#374151] hover:text-red-600 transition-colors"
                      >
                        Delete
                        <Trash
                          width={17}
                          height={18}
                          style={{ color: "#374151" }}
                        />
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {/* Risk Location */}
              <FormInput
                label="Risk Location"
                placeholder="Enter"
                value={formData.contentRiskLocation}
                onChange={(v) => updateField("contentRiskLocation", v)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-8">
        <Button
          variant="outline"
          onClick={onBack}
          className="rounded-full border-brand-red text-brand-red hover:bg-brand-red hover:text-white font-medium px-8 py-3 h-auto transition-colors"
        >
          Go Back
        </Button>
        <Button
          onClick={onContinue}
          className="rounded-full bg-brand-red hover:bg-brand-red/90 text-white font-medium px-8 py-3 h-auto"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
