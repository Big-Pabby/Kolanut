"use client";

import { useMarineInsuranceStore } from '@/lib/store/marineInsuranceStore';
import { Button } from '@/components/ui/button';
import CongratulationsIcon from '@/src/assets/icons/congratulations.svg';
import EmailIcon from '@/src/assets/icons/email-icon.svg';

const POLICY_NUMBER = 'KA-0' + Math.floor(10000000 + Math.random() * 90000000);
const PREMIUM_PAID = '₦79,250';
const COVERAGE_PERIOD = '12 Months';
const EFFECTIVE_DATE = new Date().toLocaleDateString('en-NG', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

function getDisplayName(formData: ReturnType<typeof useMarineInsuranceStore.getState>['formData']) {
  if (formData.policyholderType === 'corporate') return formData.companyName || 'N/A';
  if (formData.policyholderType === 'private')
    return `${formData.firstName} ${formData.lastName}`.trim() || 'N/A';
  return formData.email || 'N/A';
}

function getUserEmail(formData: ReturnType<typeof useMarineInsuranceStore.getState>['formData']) {
  if (formData.policyholderType === 'corporate') return formData.companyEmail || 'your email';
  return formData.email || 'your email';
}

function getConveyanceLabel(val: string) {
  const map: Record<string, string> = {
    sea: 'Sea',
    air: 'Air',
    land: 'Land',
    'sea-land': 'Sea / Land',
    'sea-air': 'Sea / Air',
  };
  return map[val] || val || 'N/A';
}

interface Step4Props {
  onBackToHome: () => void;
}

export default function MarineStep4PolicyDocument({ onBackToHome }: Step4Props) {
  const { formData } = useMarineInsuranceStore();

  return (
    <div className="mx-auto w-full max-w-[920px] pb-8">
      <div className="rounded-xl border border-[#f3f4f6] bg-[#fdfdfd] px-8 py-10 flex flex-col items-center gap-6">
        {/* Illustration */}
        <CongratulationsIcon width={211} height={175} style={{ color: '#af060d' }} />

        {/* Heading */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-2xl font-medium text-[#161616]">Congratulations! You&apos;re Covered</h2>
          <p className="text-base font-normal text-[#4b5563]">
            Your marine insurance policy has been issued successfully.
          </p>
        </div>

        {/* Policy Summary */}
        <div className="w-full max-w-[574px] rounded-xl border border-[#f3f4f6] bg-white overflow-hidden">
          {/* Policy Number */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#f3f4f6]">
            <span className="text-base font-normal text-[#161616]">Policy Number</span>
            <span className="text-xl font-medium text-brand-red">{POLICY_NUMBER}</span>
          </div>

          <PolicyRow label="Policy Holder:" value={getDisplayName(formData)} />
          <PolicyRow label="Insurance Type:" value="Marine Insurance" />
          <PolicyRow label="Product:" value="Marine Cargo Insurance" />
          <PolicyRow
            label="Port of Origin:"
            value={formData.portOfOrigin || 'N/A'}
          />
          <PolicyRow
            label="Port of Discharge:"
            value={formData.portOfDischarge || 'N/A'}
          />
          <PolicyRow
            label="Medium of Conveyance:"
            value={getConveyanceLabel(formData.mediumOfConveyance)}
          />
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
