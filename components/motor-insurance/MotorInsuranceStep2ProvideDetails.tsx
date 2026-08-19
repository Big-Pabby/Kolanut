import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CouponGeneratorDetails from "@/components/coupon/CouponGeneratorDetails";
import type { ComprehensiveAutoInsuranceFormData } from "@/lib/store/comprehensiveAutoInsuranceStore";
import { States } from "@/utils/states";

interface MotorInsuranceStep2ProvideDetailsProps {
  formData: ComprehensiveAutoInsuranceFormData;
  onUpdate: (field: string, value: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

export default function MotorInsuranceStep2ProvideDetails({
  formData,
  onUpdate,
  onContinue,
  onBack,
}: MotorInsuranceStep2ProvideDetailsProps) {
  const stateOptions = Array.from(States.keys());
  const cityOptions = formData.state ? (States.get(formData.state) ?? []) : [];

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      {/* Coupon Generator Details — only shown when arriving via the coupon flow */}
      <CouponGeneratorDetails />

      {/* Personal Details Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-6 text-[#161616]">
          Customer Personal Details
        </h3>

        {/* Car Ownership + Last Name */}
        <div className="grid gap-5 grid-cols-1 lg:grid-cols-2 mb-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#374151]">
              Car Ownership
            </label>
            <Select
              value={formData.carOwnership}
              onValueChange={(value) => onUpdate("carOwnership", value)}
            >
              <SelectTrigger className="!h-12 w-full rounded-[10px] border border-[#d1d5db] px-3 text-sm text-[#161616] placeholder:text-[#6b7280] shadow-[0_1px_2px_rgba(18,26,43,0.05)] outline-none focus:border-brand-red transition-colors bg-white">
                <SelectValue placeholder="Select car ownership type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="corporate">Corporate</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#374151]">
              Company Name
            </label>
            <input
              type="text"
              placeholder="Enter your company name"
              value={formData.companyName}
              onChange={(e) => onUpdate("companyName", e.target.value)}
              className="h-12 w-full rounded-[10px] border border-[#d1d5db] px-3 text-sm text-[#161616] placeholder:text-[#6b7280] shadow-[0_1px_2px_rgba(18,26,43,0.05)] outline-none focus:border-brand-red transition-colors bg-white"
            />
          </div>
        </div>

        {/* RC Number - Only show if Corporate is selected */}
        {formData.carOwnership === "corporate" && (
          <div className="grid gap-5 grid-cols-1 lg:grid-cols-2 mb-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#374151]">
                RC Number
              </label>
              <input
                type="text"
                placeholder="Enter your RC Number"
                value={formData.rcNumber}
                onChange={(e) => onUpdate("rcNumber", e.target.value)}
                className="h-12 w-full rounded-[10px] border border-[#d1d5db] px-3 text-sm text-[#161616] placeholder:text-[#6b7280] shadow-[0_1px_2px_rgba(18,26,43,0.05)] outline-none focus:border-brand-red transition-colors bg-white"
              />
            </div>
          </div>
        )}

        {/* First Name + Last Name */}
        <div className="grid gap-5 grid-cols-1 lg:grid-cols-2 mb-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#374151]">
              First Name
            </label>
            <input
              type="text"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={(e) => onUpdate("firstName", e.target.value)}
              className="h-12 w-full rounded-[10px] border border-[#d1d5db] px-3 text-sm text-[#161616] placeholder:text-[#6b7280] shadow-[0_1px_2px_rgba(18,26,43,0.05)] outline-none focus:border-brand-red transition-colors bg-white"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#374151]">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter your last name"
              value={formData.lastname}
              onChange={(e) => onUpdate("lastname", e.target.value)}
              className="h-12 w-full rounded-[10px] border border-[#d1d5db] px-3 text-sm text-[#161616] placeholder:text-[#6b7280] shadow-[0_1px_2px_rgba(18,26,43,0.05)] outline-none focus:border-brand-red transition-colors bg-white"
            />
          </div>
        </div>

        {/* Email + Phone */}
        <div className="grid gap-5 grid-cols-1 lg:grid-cols-2 mb-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#374151]">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => onUpdate("email", e.target.value)}
              className="h-12 w-full rounded-[10px] border border-[#d1d5db] px-3 text-sm text-[#161616] placeholder:text-[#6b7280] shadow-[0_1px_2px_rgba(18,26,43,0.05)] outline-none focus:border-brand-red transition-colors bg-white"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#374151]">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => onUpdate("phone", e.target.value)}
              autoComplete="off"
              className="h-12 w-full rounded-[10px] border border-[#d1d5db] px-3 text-sm text-[#161616] placeholder:text-[#6b7280] shadow-[0_1px_2px_rgba(18,26,43,0.05)] outline-none focus:border-brand-red transition-colors bg-white"
            />
          </div>
        </div>

        {/* Date of Birth + NIN */}
        <div className="grid gap-5 grid-cols-1 lg:grid-cols-2 mb-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#374151]">
              Date of Birth
            </label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => onUpdate("dateOfBirth", e.target.value)}
              className="h-12 w-full rounded-[10px] border border-[#d1d5db] px-3 text-sm text-[#161616] placeholder:text-[#6b7280] shadow-[0_1px_2px_rgba(18,26,43,0.05)] outline-none focus:border-brand-red transition-colors bg-white"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#374151]">
              National ID Number (NIN)
            </label>
            <input
              type="text"
              placeholder="Enter your NIN"
              value={formData.nin}
              onChange={(e) => onUpdate("nin", e.target.value)}
              autoComplete="off"
              className="h-12 w-full rounded-[10px] border border-[#d1d5db] px-3 text-sm text-[#161616] placeholder:text-[#6b7280] shadow-[0_1px_2px_rgba(18,26,43,0.05)] outline-none focus:border-brand-red transition-colors bg-white"
            />
          </div>
        </div>

        {/* State + City/LGA */}
        <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#374151]">State</label>
            <Select
              value={formData.state}
              onValueChange={(value) => onUpdate("state", value)}
            >
              <SelectTrigger className="!h-12 w-full rounded-[10px] border border-[#d1d5db] px-3 text-sm text-[#161616] placeholder:text-[#6b7280] shadow-[0_1px_2px_rgba(18,26,43,0.05)] outline-none focus:border-brand-red transition-colors bg-white">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {stateOptions.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
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
              onValueChange={(value) => onUpdate("city", value)}
            >
              <SelectTrigger className="!h-12 w-full rounded-[10px] border border-[#d1d5db] px-3 text-sm text-[#161616] placeholder:text-[#6b7280] shadow-[0_1px_2px_rgba(18,26,43,0.05)] outline-none focus:border-brand-red transition-colors bg-white">
                <SelectValue placeholder="Select city/LGA" />
              </SelectTrigger>
              <SelectContent>
                {cityOptions.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid gap-5 grid-cols-1 lg:grid-cols-2 mb-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#374151]">Address</label>
          <input
            type="text"
            placeholder="Enter your address"
            value={formData.address}
            onChange={(e) => onUpdate("address", e.target.value)}
            className="h-12 w-full rounded-[10px] border border-[#d1d5db] px-3 text-sm text-[#161616] placeholder:text-[#6b7280] shadow-[0_1px_2px_rgba(18,26,43,0.05)] outline-none focus:border-brand-red transition-colors bg-white"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#374151]">
            Upload Identity
          </label>
          <input
            type="text"
            placeholder="Driver license, National ID, or International Passport number"
            value={formData.identityDocument}
            onChange={(e) => onUpdate("identityDocument", e.target.value)}
            className="h-12 w-full rounded-[10px] border border-[#d1d5db] px-3 text-sm text-[#161616] placeholder:text-[#6b7280] shadow-[0_1px_2px_rgba(18,26,43,0.05)] outline-none focus:border-brand-red transition-colors bg-white"
          />
        </div>
      </div>

      {/* Vehicle Details Section */}
      <div className="mb-8">
        <h3 className="text-base font-semibold mb-2 text-[#161616]">
          Vehicle Details
        </h3>

        <hr className="mb-6" />

        {/* Plate Number + Vehicle Value */}
        <div className="grid gap-5 grid-cols-1 lg:grid-cols-2 mb-2">
          {/* Plate Number */}
          <div className="flex flex-col gap-2 mb-5">
            <label className="text-sm font-medium text-[#374151]">
              Plate Number
            </label>
            <input
              type="text"
              placeholder="e.g., ABC-123XYZ"
              value={formData.plateNumber}
              onChange={(e) => onUpdate("plateNumber", e.target.value)}
              className="h-12 w-full rounded-[10px] border border-[#d1d5db] px-3 text-sm text-[#161616] placeholder:text-[#6b7280] shadow-[0_1px_2px_rgba(18,26,43,0.05)] outline-none focus:border-brand-red transition-colors bg-white"
            />
          </div>
          {/* Vehicle Value */}
          <div className="flex flex-col gap-2 mb-5">
            <label className="text-sm font-medium text-[#374151]">
              Vehicle Amount
            </label>
            <input
              type="number"
              placeholder="Enter vehicle value in Naira"
              value={formData.vehicleValue}
              onChange={(e) => onUpdate("vehicleValue", e.target.value)}
              className="h-12 w-full rounded-[10px] border border-[#d1d5db] px-3 text-sm text-[#161616] placeholder:text-[#6b7280] shadow-[0_1px_2px_rgba(18,26,43,0.05)] outline-none focus:border-brand-red transition-colors bg-white"
            />
          </div>
        </div>
        {/* Vehicle Make + Vehicle Model */}
        <div className="grid gap-5 grid-cols-1 lg:grid-cols-2 mb-2">
          {/* Vehicle Body Type */}
          <div className="flex flex-col gap-2 mb-5">
            <label className="text-sm font-medium text-[#374151]">
              Vehicle Body Type
            </label>
            <input
              type="text"
              placeholder="e.g., Sedan, SUV, Hatchback"
              value={formData.vehicleBodyType}
              onChange={(e) => onUpdate("vehicleBodyType", e.target.value)}
              className="h-12 w-full rounded-[10px] border border-[#d1d5db] px-3 text-sm text-[#161616] placeholder:text-[#6b7280] shadow-[0_1px_2px_rgba(18,26,43,0.05)] outline-none focus:border-brand-red transition-colors bg-white"
            />
          </div>
          {/* Vehicle Make */}
          <div className="flex flex-col gap-2 mb-5">
            <label className="text-sm font-medium text-[#374151]">
              Vehicle Make
            </label>
            <input
              type="text"
              placeholder="e.g., Toyota, Honda, Ford"
              value={formData.vehicleMake}
              onChange={(e) => onUpdate("vehicleMake", e.target.value)}
              className="h-12 w-full rounded-[10px] border border-[#d1d5db] px-3 text-sm text-[#161616] placeholder:text-[#6b7280] shadow-[0_1px_2px_rgba(18,26,43,0.05)] outline-none focus:border-brand-red transition-colors bg-white"
            />
          </div>
        </div>
        {/* Vehicle Model + Year */}
        <div className="grid gap-5 grid-cols-1 lg:grid-cols-2 mb-2">
          {/* Vehicle Model */}
          <div className="flex flex-col gap-2 mb-5">
            <label className="text-sm font-medium text-[#374151]">
              Vehicle Model
            </label>
            <input
              type="text"
              placeholder="e.g., Camry, Accord, F-150"
              value={formData.vehicleModel}
              onChange={(e) => onUpdate("vehicleModel", e.target.value)}
              className="h-12 w-full rounded-[10px] border border-[#d1d5db] px-3 text-sm text-[#161616] placeholder:text-[#6b7280] shadow-[0_1px_2px_rgba(18,26,43,0.05)] outline-none focus:border-brand-red transition-colors bg-white"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#374151]">
              Year of Manufacture
            </label>
            <input
              type="number"
              placeholder="e.g., 2020"
              value={formData.vehicleYear}
              onChange={(e) => onUpdate("vehicleYear", e.target.value)}
              className="h-12 w-full rounded-[10px] border border-[#d1d5db] px-3 text-sm text-[#161616] placeholder:text-[#6b7280] shadow-[0_1px_2px_rgba(18,26,43,0.05)] outline-none focus:border-brand-red transition-colors bg-white"
            />
          </div>
        </div>
        {/* Color + Engine Number */}
        <div className="grid gap-5 grid-cols-1 lg:grid-cols-2 mb-2">
          {/* Color */}
          <div className="flex flex-col gap-2 mb-5">
            <label className="text-sm font-medium text-[#374151]">Color</label>
            <input
              type="text"
              placeholder="Enter color"
              value={formData.color}
              onChange={(e) => onUpdate("color", e.target.value)}
              className="h-12 w-full rounded-[10px] border border-[#d1d5db] px-3 text-sm text-[#161616] placeholder:text-[#6b7280] shadow-[0_1px_2px_rgba(18,26,43,0.05)] outline-none focus:border-brand-red transition-colors bg-white"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#374151]">
              Engine Number
            </label>
            <input
              type="text"
              placeholder="Enter engine number"
              value={formData.engineNumber}
              onChange={(e) => onUpdate("engineNumber", e.target.value)}
              className="h-12 w-full rounded-[10px] border border-[#d1d5db] px-3 text-sm text-[#161616] placeholder:text-[#6b7280] shadow-[0_1px_2px_rgba(18,26,43,0.05)] outline-none focus:border-brand-red transition-colors bg-white"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#374151]">
            Chassis Number
          </label>
          <input
            type="text"
            placeholder="e.g., ABC-123XYZ"
            value={formData.chassisNumber}
            onChange={(e) => onUpdate("chassisNumber", e.target.value)}
            className="h-12 w-full rounded-[10px] border border-[#d1d5db] px-3 text-sm text-[#161616] placeholder:text-[#6b7280] shadow-[0_1px_2px_rgba(18,26,43,0.05)] outline-none focus:border-brand-red transition-colors bg-white"
          />
        </div>
      </div>

      {/* <div className="mt-6 bg-[#FFFAFA] border border-[#FFD4D6] rounded-[8px] p-6 text-[#4B5563] text-base">
        Please note that once your purchase is completed, you will immediately
        receive a link to carry out your vehicle inspection. Kindly follow the
        instructions in the link to complete the inspection, or call +234 020
        12800 700 or +234 701 939 1747 for any assistance.
      </div> */}

      {/* Action Buttons */}
      <div className="flex gap-4 mt-10">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-[#d1d5db] rounded-full text-sm font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors"
        >
          Back
        </button>
        <button
          onClick={onContinue}
          className="px-6 py-3 bg-brand-red rounded-full text-sm font-medium text-white hover:bg-red-700 transition-colors ml-auto"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
