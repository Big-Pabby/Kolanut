"use client";

import { Plus, Trash2, Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormInput from "@/components/home-insurance/FormInput";
import StepNavigation from "@/components/insurance/StepNavigation";
import type {
  LifeInsuranceFormData,
  Beneficiary,
} from "@/lib/store/lifeInsuranceStore";

interface Props {
  formData: LifeInsuranceFormData;
  onUpdateBeneficiary: (
    index: number,
    field: keyof Beneficiary,
    value: string | boolean
  ) => void;
  onAddBeneficiary: () => void;
  onRemoveBeneficiary: (index: number) => void;
  onContinue: () => void;
  onBack: () => void;
}

const RELATIONSHIP_OPTIONS = [
  "Spouse",
  "Child",
  "Parent",
  "Sibling",
  "Other",
];

function MinorCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex items-center gap-2"
    >
      <span
        className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
          checked
            ? "border-brand-red bg-brand-red text-white"
            : "border-[#d1d5db] bg-white"
        }`}
      >
        {checked && <Check size={14} strokeWidth={3} />}
      </span>
      <span className="text-sm text-dark-text">{label}</span>
    </button>
  );
}

function BeneficiaryCard({
  beneficiary,
  index,
  showRemove,
  onUpdate,
  onRemove,
}: {
  beneficiary: Beneficiary;
  index: number;
  showRemove: boolean;
  onUpdate: (field: keyof Beneficiary, value: string | boolean) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      {(index > 0 || showRemove) && (
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-dark-text">
            Beneficiary {index + 1}
          </h3>
          {showRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="flex items-center gap-1 text-sm font-medium text-brand-red hover:text-brand-red/80 transition-colors"
            >
              <Trash2 size={14} />
              Remove
            </button>
          )}
        </div>
      )}

      {/* Relationship + Date of Birth */}
      <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#374151]">
            Relationship
          </label>
          <Select
            value={beneficiary.relationship}
            onValueChange={(v) => onUpdate("relationship", v)}
          >
            <SelectTrigger className="!h-12 w-full rounded-[10px] border border-[#d1d5db] shadow-[0_1px_2px_rgba(18,26,43,0.05)]">
              <SelectValue placeholder="Select a relationship type" />
            </SelectTrigger>
            <SelectContent>
              {RELATIONSHIP_OPTIONS.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <FormInput
          label="Date of Birth"
          placeholder="mm/dd/yyyy"
          value={beneficiary.dateOfBirth}
          onChange={(v) => onUpdate("dateOfBirth", v)}
          type="date"
        />
      </div>

      {/* First Name + Last Name */}
      <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
        <FormInput
          label="First Name"
          placeholder="Enter"
          value={beneficiary.firstName}
          onChange={(v) => onUpdate("firstName", v)}
        />
        <FormInput
          label="Last Name"
          placeholder="Enter"
          value={beneficiary.lastname}
          onChange={(v) => onUpdate("lastname", v)}
        />
      </div>

      {/* Share Percentage + Minor toggle */}
      <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
        <FormInput
          label="Share Percentage (0 -100)"
          placeholder="Share Percentage"
          value={beneficiary.sharePercentage}
          onChange={(v) => onUpdate("sharePercentage", v)}
          type="number"
        />
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#374151]">
            Beneficiary is a minor
          </label>
          <div className="flex items-center gap-6 pt-2">
            <MinorCheckbox
              label="Yes"
              checked={beneficiary.isMinor}
              onChange={() => onUpdate("isMinor", true)}
            />
            <MinorCheckbox
              label="No"
              checked={!beneficiary.isMinor}
              onChange={() => onUpdate("isMinor", false)}
            />
          </div>
        </div>
      </div>

      {/* Guardian fields - only when minor */}
      {beneficiary.isMinor && (
        <>
          <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
            <FormInput
              label="Guardian First Name"
              placeholder="Enter"
              value={beneficiary.guardianFirstName}
              onChange={(v) => onUpdate("guardianFirstName", v)}
            />
            <FormInput
              label="Guardian Surname"
              placeholder="Enter"
              value={beneficiary.guardianSurname}
              onChange={(v) => onUpdate("guardianSurname", v)}
            />
          </div>

          <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
            <FormInput
              label="Guardian Phone Number"
              placeholder="Enter"
              value={beneficiary.guardianPhone}
              onChange={(v) => onUpdate("guardianPhone", v)}
              type="tel"
            />
            <FormInput
              label="Guardian Email Address"
              placeholder="Enter"
              value={beneficiary.guardianEmail}
              onChange={(v) => onUpdate("guardianEmail", v)}
              type="email"
            />
          </div>

          <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
            <FormInput
              label="Guardian Date of Birth"
              placeholder="mm/dd/yyyy"
              value={beneficiary.guardianDateOfBirth}
              onChange={(v) => onUpdate("guardianDateOfBirth", v)}
              type="date"
            />
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#374151]">
                Guardian Relationship
              </label>
              <Select
                value={beneficiary.guardianRelationship}
                onValueChange={(v) => onUpdate("guardianRelationship", v)}
              >
                <SelectTrigger className="!h-12 w-full rounded-[10px] border border-[#d1d5db] shadow-[0_1px_2px_rgba(18,26,43,0.05)]">
                  <SelectValue placeholder="Select a relationship type" />
                </SelectTrigger>
                <SelectContent>
                  {RELATIONSHIP_OPTIONS.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function isBeneficiaryValid(b: Beneficiary): boolean {
  const baseValid =
    !!b.relationship &&
    !!b.dateOfBirth &&
    !!b.firstName.trim() &&
    !!b.lastname.trim() &&
    !!b.sharePercentage.trim();
  if (!baseValid) return false;

  if (b.isMinor) {
    return (
      !!b.guardianFirstName.trim() &&
      !!b.guardianSurname.trim() &&
      !!b.guardianPhone.trim() &&
      !!b.guardianEmail.trim() &&
      !!b.guardianDateOfBirth &&
      !!b.guardianRelationship
    );
  }
  return true;
}

export default function TermLifeStep2Beneficiary({
  formData,
  onUpdateBeneficiary,
  onAddBeneficiary,
  onRemoveBeneficiary,
  onContinue,
  onBack,
}: Props) {
  const isFormValid = formData.beneficiaries.every(isBeneficiaryValid);

  return (
    <div className="rounded-xl border border-[#f3f4f6] bg-white p-6 lg:p-8 space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl lg:text-2xl font-semibold text-dark-text">
          Provide Beneficiary Details
        </h2>
        <p className="text-sm lg:text-base font-normal text-body-text">
          Fill in the information below to get your quote.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {formData.beneficiaries.map((beneficiary, index) => (
          <BeneficiaryCard
            key={index}
            beneficiary={beneficiary}
            index={index}
            showRemove={formData.beneficiaries.length > 1}
            onUpdate={(field, value) =>
              onUpdateBeneficiary(index, field, value)
            }
            onRemove={() => onRemoveBeneficiary(index)}
          />
        ))}
      </div>

      {/* Add Beneficiary */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onAddBeneficiary}
          className="flex items-center gap-1 text-sm font-medium text-brand-red hover:text-brand-red/80 transition-colors"
        >
          Add a Beneficiary
          <Plus size={16} strokeWidth={2.5} />
        </button>
      </div>

      <StepNavigation
        onBack={onBack}
        onContinue={onContinue}
        isDisabled={!isFormValid}
      />
    </div>
  );
}
