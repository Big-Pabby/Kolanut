"use client";

import { useRef } from 'react';
import { useMarineInsuranceStore } from '@/lib/store/marineInsuranceStore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import PlusRed from '@/src/assets/icons/plus-red.svg';
import Trash from '@/src/assets/icons/trash.svg';
import { Button } from '@/components/ui/button';
import { States } from '@/utils/states';

/* ─── Option lists ──────────────────────────────────────────────────────────── */
const policyholderOptions = [
  { label: 'Private', value: 'private' },
  { label: 'Corporate', value: 'corporate' },
];

const occupationOptions = [
  { label: 'Importer', value: 'importer' },
  { label: 'Exporter', value: 'exporter' },
  { label: 'Freight Forwarder', value: 'freight-forwarder' },
  { label: 'Manufacturer', value: 'manufacturer' },
  { label: 'Distributor', value: 'distributor' },
  { label: 'Retailer', value: 'retailer' },
  { label: 'Other', value: 'other' },
];

const charterTypeOptions = [
  { label: 'Full Charter', value: 'full-charter' },
  { label: 'Part Charter', value: 'part-charter' },
];

const conditionsOptions = [
  { label: 'ICC A (All Risks)', value: 'icc-a' },
  { label: 'ICC B', value: 'icc-b' },
  { label: 'ICC C', value: 'icc-c' },
];

const goodsTypeOptions = [
  { label: 'Electronics', value: 'electronics' },
  { label: 'Food / Beverage', value: 'food-beverage' },
  { label: 'Machinery', value: 'machinery' },
  { label: 'Chemicals', value: 'chemicals' },
  { label: 'Raw Materials', value: 'raw-materials' },
  { label: 'Textiles', value: 'textiles' },
  { label: 'Automotive Parts', value: 'automotive' },
  { label: 'Other', value: 'other' },
];

const currencyOptions = [
  { label: 'NGN (₦)', value: 'NGN' },
  { label: 'USD ($)', value: 'USD' },
  { label: 'EUR (€)', value: 'EUR' },
  { label: 'GBP (£)', value: 'GBP' },
];

const conveyanceOptions = [
  { label: 'Sea', value: 'sea' },
  { label: 'Air', value: 'air' },
  { label: 'Land', value: 'land' },
  { label: 'Sea / Land', value: 'sea-land' },
  { label: 'Sea / Air', value: 'sea-air' },
];

const interestOptions = [
  { label: 'Full Interest', value: 'full' },
  { label: 'Partial Interest', value: 'partial' },
];

const nigerianStates = Array.from(States.keys());

function occupationLicenseLabel(occupation: string): string {
  const map: Record<string, string> = {
    importer: 'Import License Number',
    exporter: 'Export License Number',
    'freight-forwarder': 'Freight Forwarder License No',
    manufacturer: 'Manufacturer Registration No',
    distributor: 'Distributor License No',
    retailer: 'Retailer License No',
    other: 'License / Registration No',
  };
  return map[occupation] || 'License / Registration No';
}

/* ─── Reusable sub-components ───────────────────────────────────────────────── */
function FormInput({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-[#374151]">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-[10px] border border-[#d1d5db] px-3 text-sm text-[#161616] placeholder:text-[#6b7280] shadow-[0_1px_2px_rgba(18,26,43,0.05)] outline-none focus:border-brand-red transition-colors bg-white"
      />
    </div>
  );
}

function FormSelect({
  label,
  placeholder,
  value,
  onValueChange,
  options,
}: {
  label: string;
  placeholder: string;
  value: string;
  onValueChange: (v: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-[#374151]">{label}</label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="!h-12 w-full rounded-[10px] border border-[#d1d5db] shadow-[0_1px_2px_rgba(18,26,43,0.05)]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <h3 className="text-base font-medium text-[#111827]">{title}</h3>;
}

function FileUpload({
  label,
  fileName,
  onFileChange,
}: {
  label: string;
  fileName: string;
  onFileChange: (name: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => inputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileChange(file.name);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-[#374151]">{label}</label>
      <button
        type="button"
        onClick={handleClick}
        className="w-full rounded-[10px] border border-dashed border-[#d1d5db] bg-white px-4 py-4 flex flex-col items-center gap-2 hover:border-brand-red transition-colors"
      >
        {fileName ? (
          <span className="text-sm font-medium text-brand-red truncate max-w-full">{fileName}</span>
        ) : (
          <>
            <div className="w-8 h-8 rounded-full bg-[#fff5f5] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 2v8M4 6l4-4 4 4M2 14h12"
                  stroke="#af060d"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-sm text-[#6b7280]">
              <span className="font-medium text-brand-red">Click to upload</span> or drag and drop
            </span>
            <span className="text-xs text-[#9ca3af]">PDF, JPG, PNG (max 5MB)</span>
          </>
        )}
      </button>
      <input ref={inputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleChange} />
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────────── */
interface Step2Props {
  onContinue: () => void;
  onBack: () => void;
}

export default function MarineStep2ProvideDetails({ onContinue, onBack }: Step2Props) {
  const {
    formData,
    updateField,
    addGoodsItem,
    removeGoodsItem,
    updateGoodsItem,
  } = useMarineInsuranceStore();

  const isPrivate = formData.policyholderType === 'private';
  const isCorporate = formData.policyholderType === 'corporate';
  const hasOccupation = !!formData.occupationCategory;

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

      <div className="flex flex-col gap-8">

        {/* ── 1. Policy Type ───────────────────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          <SectionTitle title="Policy Type" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <FormSelect
              label="Policyholder Type"
              placeholder="Select"
              value={formData.policyholderType}
              onValueChange={(v) => updateField('policyholderType', v as typeof formData.policyholderType)}
              options={policyholderOptions}
            />
            <FormSelect
              label="Occupation Category"
              placeholder="Select"
              value={formData.occupationCategory}
              onValueChange={(v) => updateField('occupationCategory', v as typeof formData.occupationCategory)}
              options={occupationOptions}
            />
          </div>
        </div>

        {/* ── 2a. Personal Information — Private ──────────────────────────── */}
        {isPrivate && (
          <div className="flex flex-col gap-4">
            <SectionTitle title="Personal Information" />
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <FormInput label="First Name" placeholder="Enter first name" value={formData.firstName} onChange={(v) => updateField('firstName', v)} />
                <FormInput label="Last Name" placeholder="Enter last name" value={formData.lastName} onChange={(v) => updateField('lastName', v)} />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <FormInput label="Email Address" placeholder="Enter email address" value={formData.email} onChange={(v) => updateField('email', v)} type="email" />
                <FormInput label="Phone Number" placeholder="Enter phone number" value={formData.phone} onChange={(v) => updateField('phone', v)} type="tel" />
                <FormInput label="NIN Number" placeholder="Enter NIN" value={formData.nin} onChange={(v) => updateField('nin', v)} />
              </div>
              <FormInput label="Address" placeholder="Enter address" value={formData.address} onChange={(v) => updateField('address', v)} />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <FormSelect
                  label="State"
                  placeholder="Select state"
                  value={formData.state}
                  onValueChange={(v) => updateField('state', v)}
                  options={nigerianStates.map((s) => ({ label: s, value: s }))}
                />
                <FormInput label="City" placeholder="Enter city" value={formData.city} onChange={(v) => updateField('city', v)} />
                <FormInput label="Country" placeholder="Enter country" value={formData.country} onChange={(v) => updateField('country', v)} />
              </div>
            </div>
          </div>
        )}

        {/* ── 2b. Company Information — Corporate ─────────────────────────── */}
        {isCorporate && (
          <div className="flex flex-col gap-4">
            <SectionTitle title="Company Information" />
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <FormInput label="Name of Company" placeholder="Enter company name" value={formData.companyName} onChange={(v) => updateField('companyName', v)} />
                <FormInput label="NIN / RC Number" placeholder="Enter NIN / RC Number" value={formData.companyNin} onChange={(v) => updateField('companyNin', v)} />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <FormInput label="Email Address" placeholder="Enter email address" value={formData.companyEmail} onChange={(v) => updateField('companyEmail', v)} type="email" />
                <FormInput label="Phone Number" placeholder="Enter phone number" value={formData.companyPhone} onChange={(v) => updateField('companyPhone', v)} type="tel" />
              </div>
              <FormInput label="Company Address" placeholder="Enter company address" value={formData.companyAddress} onChange={(v) => updateField('companyAddress', v)} />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <FormSelect
                  label="State"
                  placeholder="Select state"
                  value={formData.companyState}
                  onValueChange={(v) => updateField('companyState', v)}
                  options={nigerianStates.map((s) => ({ label: s, value: s }))}
                />
                <FormInput label="City" placeholder="Enter city" value={formData.companyCity} onChange={(v) => updateField('companyCity', v)} />
                <FormInput label="Country" placeholder="Enter country" value={formData.companyCountry} onChange={(v) => updateField('companyCountry', v)} />
              </div>
            </div>
          </div>
        )}

        {/* ── 2c. Default — no type selected ──────────────────────────────── */}
        {!isPrivate && !isCorporate && (
          <div className="flex flex-col gap-4">
            <SectionTitle title="Personal Information" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <FormInput label="Email Address" placeholder="Enter email address" value={formData.email} onChange={(v) => updateField('email', v)} type="email" />
              <FormInput label="Phone Number" placeholder="Enter phone number" value={formData.phone} onChange={(v) => updateField('phone', v)} type="tel" />
            </div>
          </div>
        )}

        {/* ── 3. Occupation Details (shown when occupation selected) ───────── */}
        {hasOccupation && (
          <div className="flex flex-col gap-4">
            <SectionTitle title="Occupation Details" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <FormInput
                label={occupationLicenseLabel(formData.occupationCategory)}
                placeholder="Enter license / registration number"
                value={formData.occupationLicenseNo}
                onChange={(v) => updateField('occupationLicenseNo', v)}
              />
              <FormInput
                label="TIN (Tax Identification Number)"
                placeholder="Enter TIN"
                value={formData.tin}
                onChange={(v) => updateField('tin', v)}
              />
            </div>
          </div>
        )}

        {/* ── 4. Cargo Information ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          <SectionTitle title="Cargo Information" />
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <FormInput label="Start Date" placeholder="YYYY-MM-DD" value={formData.startDate} onChange={(v) => updateField('startDate', v)} type="date" />
              <FormInput label="Port of Origin" placeholder="Enter port of origin" value={formData.portOfOrigin} onChange={(v) => updateField('portOfOrigin', v)} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <FormInput label="Port of Discharge" placeholder="Enter port of discharge" value={formData.portOfDischarge} onChange={(v) => updateField('portOfDischarge', v)} />
              <FormSelect
                label="Charter Type"
                placeholder="Select"
                value={formData.charterType}
                onValueChange={(v) => updateField('charterType', v)}
                options={charterTypeOptions}
              />
              <FormSelect
                label="Conditions"
                placeholder="Select"
                value={formData.conditions}
                onValueChange={(v) => updateField('conditions', v)}
                options={conditionsOptions}
              />
            </div>
          </div>
        </div>

        {/* ── 5. Goods / Cargo Items ───────────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          <SectionTitle title="Goods / Cargo Information" />
          <div className="flex flex-col gap-5">
            {formData.goodsItems.map((item, index) => (
              <div key={item.id} className="flex flex-col gap-2">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <FormSelect
                    label={index === 0 ? 'Type of Goods' : 'Type of Goods'}
                    placeholder="Select goods type"
                    value={item.type}
                    onValueChange={(v) => updateGoodsItem(item.id, 'type', v)}
                    options={goodsTypeOptions}
                  />
                  <FormInput
                    label="Value (₦)"
                    placeholder="Enter value"
                    value={item.value}
                    onChange={(v) => updateGoodsItem(item.id, 'value', v)}
                  />
                </div>
                {index === 0 ? (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={addGoodsItem}
                      className="flex items-center gap-1.5 text-base font-medium text-brand-red hover:text-brand-red/80 transition-colors"
                    >
                      Add another
                      <PlusRed width={13} height={13} style={{ color: '#af060d' }} />
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeGoodsItem(item.id)}
                      className="flex items-center gap-1.5 text-base font-medium text-[#374151] hover:text-red-600 transition-colors"
                    >
                      Delete
                      <Trash width={17} height={18} style={{ color: '#374151' }} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── 6. Finance Information ───────────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          <SectionTitle title="Finance Information" />
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <FormInput label="Exchange Rate" placeholder="Enter exchange rate" value={formData.exchangeRate} onChange={(v) => updateField('exchangeRate', v)} />
              <FormSelect
                label="Currency"
                placeholder="Select currency"
                value={formData.currency}
                onValueChange={(v) => updateField('currency', v)}
                options={currencyOptions}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <FormInput label="Insured Value" placeholder="Enter insured value" value={formData.insuredValue} onChange={(v) => updateField('insuredValue', v)} />
              <FormInput label="Premium" placeholder="Enter premium" value={formData.premium} onChange={(v) => updateField('premium', v)} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <FormInput label="PFI Date" placeholder="YYYY-MM-DD" value={formData.pfiDate} onChange={(v) => updateField('pfiDate', v)} type="date" />
              <FormInput label="PFI No" placeholder="Enter PFI number" value={formData.pfiNo} onChange={(v) => updateField('pfiNo', v)} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <FormInput label="Marks & Numbers" placeholder="Enter marks & numbers" value={formData.marksNumbers} onChange={(v) => updateField('marksNumbers', v)} />
              <FormSelect
                label="Interest"
                placeholder="Select"
                value={formData.interest}
                onValueChange={(v) => updateField('interest', v)}
                options={interestOptions}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <FormInput label="Bank Lien" placeholder="Enter bank lien" value={formData.bankLien} onChange={(v) => updateField('bankLien', v)} />
              <FormSelect
                label="Medium of Conveyance"
                placeholder="Select"
                value={formData.mediumOfConveyance}
                onValueChange={(v) => updateField('mediumOfConveyance', v)}
                options={conveyanceOptions}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <FormInput label="Excess" placeholder="Enter excess" value={formData.excess} onChange={(v) => updateField('excess', v)} />
              {!hasOccupation && (
                <FormInput label="TIN (Tax Identification Number)" placeholder="Enter TIN" value={formData.tin} onChange={(v) => updateField('tin', v)} />
              )}
            </div>
          </div>
        </div>

        {/* ── 7. Document Uploads ──────────────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          <SectionTitle title="Document Uploads" />
          <div className="flex flex-col gap-5">
            <div className={`grid grid-cols-1 gap-5 ${isPrivate || isCorporate ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}>
              <FileUpload
                label="Proforma Invoice (PFI)"
                fileName={formData.pfiDocumentName}
                onFileChange={(name) => updateField('pfiDocumentName', name)}
              />
              {isPrivate && (
                <FileUpload
                  label="Means of ID"
                  fileName={formData.meansOfIdName}
                  onFileChange={(name) => updateField('meansOfIdName', name)}
                />
              )}
              {isCorporate && (
                <FileUpload
                  label="CAC Document"
                  fileName={formData.cacDocumentName}
                  onFileChange={(name) => updateField('cacDocumentName', name)}
                />
              )}
            </div>
          </div>
        </div>

        {/* ── 8. Examine Name ──────────────────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          <SectionTitle title="Examine" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <FormInput
              label="Examine Name"
              placeholder="Enter examine name"
              value={formData.examineName}
              onChange={(v) => updateField('examineName', v)}
            />
          </div>
        </div>

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
