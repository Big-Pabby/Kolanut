"use client";

import { useHomeInsuranceStore } from '@/lib/store/homeInsuranceStore';
import { Button } from '@/components/ui/button';
import CongratulationsIcon from '@/src/assets/icons/congratulations.svg';
import EmailIcon from '@/src/assets/icons/email-icon.svg';
import Link from 'next/link';

const POLICY_NUMBER = 'KA-09795170';
const PREMIUM_PAID = '$5,110';
const COVERAGE_PERIOD = '12 Months';
const EFFECTIVE_DATE = new Date().toLocaleDateString('en-US');

function getFullName(formData: ReturnType<typeof useHomeInsuranceStore.getState>['formData']) {
  if (formData.policyholderType === 'corporate') return formData.companyName || 'N/A';
  return `${formData.firstName} ${formData.lastName}`.trim() || 'N/A';
}

function getProductLabel(insuranceType: string) {
  const map: Record<string, string> = {
    'building-only': 'Building Only',
    'content-only': 'Content Only',
    'building-and-content': 'Building and Content',
  };
  return map[insuranceType] || 'N/A';
}

function getUserEmail(formData: ReturnType<typeof useHomeInsuranceStore.getState>['formData']) {
  if (formData.policyholderType === 'corporate') return formData.companyEmail || 'your email';
  return formData.email || 'your email';
}

interface Step4Props {
  onBackToHome: () => void;
}

export default function Step4PolicyDocument({ onBackToHome }: Step4Props) {
  const { formData } = useHomeInsuranceStore();

  return (
    <div className="mx-auto w-full max-w-[920px] pb-8">
      <div className="rounded-xl border border-[#f3f4f6] bg-[#fdfdfd] px-8 py-10 flex flex-col items-center gap-6">
        {/* Illustration */}
        <CongratulationsIcon width={211} height={175} style={{ color: '#af060d' }} />

        {/* Heading */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-2xl font-medium text-[#161616]">Congratulations! You&apos;re Covered</h2>
          <p className="text-base font-normal text-[#4b5563]">
            Your insurance policy has been issued successfully.
          </p>
        </div>

        {/* Policy Summary */}
        <div className="w-full max-w-[574px] rounded-xl border border-[#f3f4f6] bg-white overflow-hidden">
          {/* Policy Number */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#f3f4f6]">
            <span className="text-base font-normal text-[#161616]">Policy Number</span>
            <span className="text-xl font-medium text-brand-red">{POLICY_NUMBER}</span>
          </div>

          {/* Other rows */}
          <PolicyRow label="Policy Holder:" value={getFullName(formData)} />
          <PolicyRow label="Insurance Type:" value="Home Insurance" />
          <PolicyRow label="Product:" value={getProductLabel(formData.insuranceType)} />
          <PolicyRow label="Premium Paid:" value={PREMIUM_PAID} />
          <PolicyRow label="Coverage Period:" value={COVERAGE_PERIOD} />
          <div className="flex items-center justify-between px-5 py-3">
            <span className="text-base font-normal text-[#4b5563]">Effective Date:</span>
            <span className="text-base font-medium text-[#161616]">{EFFECTIVE_DATE}</span>
          </div>
        </div>

        {/* Email Notice */}
        <div className="w-full max-w-[574px] flex items-start gap-3.5 rounded-xl bg-[#fff5f5] border border-[#ffdfdf] px-4 py-4">
          <EmailIcon
            width={22}
            height={18}
            style={{ color: '#af060d' }}
            className="shrink-0 mt-0.5"
          />
          <div className="flex flex-col gap-1">
            <p className="text-base font-medium capitalize text-[#161616]">Check your email</p>
            <p className="text-sm font-normal text-[#4b5563]">
              A copy of your policy document has been sent to {getUserEmail(formData)}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={onBackToHome}
            className="rounded-full border-brand-red text-brand-red hover:bg-brand-red hover:text-white font-medium px-8 py-3 h-auto transition-colors"
          >
            Back to Home
          </Button>
          <Button
            className="rounded-full bg-brand-red hover:bg-brand-red/90 text-white font-medium px-8 py-3 h-auto"
            onClick={() => {}}
          >
            Download Policy
          </Button>
        </div>
      </div>
    </div>
  );
}

function PolicyRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-5 py-3 border-b border-[#f3f4f6]">
      <span className="text-base font-normal text-[#4b5563]">{label}</span>
      <span className="text-base font-medium text-[#161616]">{value}</span>
    </div>
  );
}
