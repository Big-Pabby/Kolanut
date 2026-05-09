"use client";

import { Paperclip, Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormInput from "@/components/home-insurance/FormInput";
import StepNavigation from "@/components/insurance/StepNavigation";
import type { LifeInsuranceFormData } from "@/lib/store/lifeInsuranceStore";

interface Props {
  formData: LifeInsuranceFormData;
  onUpdate: (field: keyof LifeInsuranceFormData, value: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

const BANK_OPTIONS = [
  "Access Bank",
  "First Bank of Nigeria",
  "Guaranty Trust Bank",
  "Zenith Bank",
  "United Bank for Africa (UBA)",
  "Fidelity Bank",
  "Sterling Bank",
  "Wema Bank",
  "Polaris Bank",
  "Stanbic IBTC Bank",
  "First City Monument Bank (FCMB)",
  "Union Bank",
  "Ecobank",
  "Keystone Bank",
  "Heritage Bank",
];

const MEDICAL_QUESTIONS: {
  field: keyof LifeInsuranceFormData;
  question: string;
}[] = [
  {
    field: "medHospitalized",
    question:
      "Have you been hospitalized for more than overnight in last 4 years?",
  },
  {
    field: "medRelativeHospitalized",
    question:
      "Have any of your relatives been hospitalized for 1 day or more in the last 4 years for any of the ailments or for any other reason?",
  },
  {
    field: "medConsultedDoctor",
    question:
      "Have you consulted with a doctor regarding any of the ailments in the last 4 years?",
  },
  {
    field: "medRelativeConsultedDoctor",
    question:
      "Have any of your relatives consulted with a doctor regarding any of the ailments in the last 4 years?",
  },
  {
    field: "medTakingMedication",
    question:
      "Are you currently taking any medication or is there any foreseeable need in the future to take medication in respect of any of the ailments?",
  },
  {
    field: "medSufferingFromAbove",
    question: "Have you suffered or are you suffering from the above?",
  },
  {
    field: "medFamilySuffered",
    question:
      "Have any of your husband, wife, parents, brothers, sisters suffered or are suffering from or died of the above?",
  },
  {
    field: "medChronicAilment",
    question:
      "Is there any other chronic ailment for which any relative of yours has consulted a doctor, taken medication or been hospitalised for, other than those above?",
  },
  {
    field: "medSeekingAdvice",
    question: "Do you intend seeking medical advice in the next 8 weeks?",
  },
  {
    field: "medRefusedBloodDonor",
    question: "Have you ever been refused as a blood donor?",
  },
  {
    field: "medInsuranceDeclined",
    question:
      "Has any insurance on your life ever been declined, postponed or accepted on special grounds?",
  },
];

const SUBSTANCE_QUESTIONS: {
  field: keyof LifeInsuranceFormData;
  label: string;
}[] = [
  { field: "useAlcohol", label: "Alcohol (bottles)" },
  { field: "useTobacco", label: "Tobacco (sticks)" },
  { field: "useNarcotics", label: "Narcotics" },
  { field: "useHardDrugs", label: "Hard Drugs" },
];

function YesNoCheckbox({
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

function YesNoQuestion({
  question,
  value,
  onChange,
}: {
  question: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium text-dark-text">{question}</p>
      <div className="flex items-center gap-6">
        <YesNoCheckbox
          label="Yes"
          checked={value === "yes"}
          onChange={() => onChange("yes")}
        />
        <YesNoCheckbox
          label="No"
          checked={value === "no"}
          onChange={() => onChange("no")}
        />
      </div>
    </div>
  );
}

function FileUploadInput({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-[#374151]">{label}</label>
      <div className="flex items-center h-12 w-full rounded-[10px] border border-[#d1d5db] px-3 shadow-[0_1px_2px_rgba(18,26,43,0.05)] bg-white focus-within:border-brand-red transition-colors">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 text-sm text-[#161616] placeholder:text-[#6b7280] outline-none bg-transparent"
        />
        <Paperclip size={18} className="text-[#6b7280] shrink-0" />
      </div>
    </div>
  );
}

export default function TermLifeStep3Identity({
  formData,
  onUpdate,
  onContinue,
  onBack,
}: Props) {
  const allMedicalAnswered = MEDICAL_QUESTIONS.every(
    (q) => !!formData[q.field]
  );
  const allSubstancesAnswered = SUBSTANCE_QUESTIONS.every(
    (q) => !!formData[q.field]
  );

  const isFormValid =
    !!formData.signatureFile.trim() &&
    !!formData.photoFile.trim() &&
    !!formData.identityFile.trim() &&
    !!formData.bankName &&
    !!formData.accountNumber.trim() &&
    !!formData.accountName.trim() &&
    allMedicalAnswered &&
    allSubstancesAnswered;

  return (
    <div className="rounded-xl border border-[#f3f4f6] bg-white p-6 lg:p-8 space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl lg:text-2xl font-semibold text-dark-text">
          Provide Identity Details
        </h2>
        <p className="text-sm lg:text-base font-normal text-body-text">
          Fill in the information below to get your quote.
        </p>
      </div>

      {/* Uploads */}
      <div className="flex flex-col gap-5">
        <FileUploadInput
          label="Upload Signature"
          placeholder="Signature"
          value={formData.signatureFile}
          onChange={(v) => onUpdate("signatureFile", v)}
        />
        <FileUploadInput
          label="Upload Photo"
          placeholder="Passport Photograph"
          value={formData.photoFile}
          onChange={(v) => onUpdate("photoFile", v)}
        />
        <FileUploadInput
          label="Upload Identity"
          placeholder="Driver license, National ID, or International Passport"
          value={formData.identityFile}
          onChange={(v) => onUpdate("identityFile", v)}
        />
      </div>

      {/* Account Details */}
      <div className="flex flex-col gap-5">
        <h3 className="text-base font-semibold text-dark-text border-b border-[#f3f4f6] pb-3">
          Account Details
        </h3>
        <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#374151]">
              Bank Name
            </label>
            <Select
              value={formData.bankName}
              onValueChange={(v) => onUpdate("bankName", v)}
            >
              <SelectTrigger className="!h-12 w-full rounded-[10px] border border-[#d1d5db] shadow-[0_1px_2px_rgba(18,26,43,0.05)]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {BANK_OPTIONS.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <FormInput
            label="Account Number"
            placeholder="Enter"
            value={formData.accountNumber}
            onChange={(v) => onUpdate("accountNumber", v)}
          />
        </div>
        <FormInput
          label="Account Name"
          placeholder="Enter"
          value={formData.accountName}
          onChange={(v) => onUpdate("accountName", v)}
        />
      </div>

      {/* Medical Questions */}
      <div className="flex flex-col gap-5">
        <h3 className="text-base font-semibold text-dark-text border-b border-[#f3f4f6] pb-3">
          Medical Questions
        </h3>
        <div className="flex flex-col gap-5">
          {MEDICAL_QUESTIONS.map((q) => (
            <YesNoQuestion
              key={q.field}
              question={q.question}
              value={(formData[q.field] as string) || ""}
              onChange={(v) => onUpdate(q.field, v)}
            />
          ))}
        </div>

        {/* Substance Use */}
        <div className="grid gap-5 grid-cols-2 lg:grid-cols-4 pt-2">
          {SUBSTANCE_QUESTIONS.map((s) => (
            <div key={s.field} className="flex flex-col gap-3">
              <p className="text-sm font-medium text-dark-text">{s.label}</p>
              <div className="flex flex-col gap-2">
                <YesNoCheckbox
                  label="Yes"
                  checked={formData[s.field] === "yes"}
                  onChange={() => onUpdate(s.field, "yes")}
                />
                <YesNoCheckbox
                  label="No"
                  checked={formData[s.field] === "no"}
                  onChange={() => onUpdate(s.field, "no")}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <StepNavigation
        onBack={onBack}
        onContinue={onContinue}
        continueLabel="Get Quote"
        isDisabled={!isFormValid}
      />
    </div>
  );
}
