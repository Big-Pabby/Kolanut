"use client";

import { Button } from "@/components/ui/button";
import CongratulationsIcon from "@/src/assets/icons/congratulations.svg";
import EmailIcon from "@/src/assets/icons/email-icon.svg";
import StepNavigation from "@/components/insurance/StepNavigation";

interface Step4PolicyDocumentProps {
  policyNumber: string;
  fullName: string;
  insuranceType: string;
  productName: string;
  premiumPaid: string;
  coveragePeriod: string;
  userEmail: string;
  onBackToHome: () => void;
  downloadLabel?: string;
}

export default function Step4PolicyDocument({
  policyNumber,
  fullName,
  insuranceType,
  productName,
  premiumPaid,
  coveragePeriod,
  userEmail,
  onBackToHome,
  downloadLabel = "Download Policy",
}: Step4PolicyDocumentProps) {
  return (
    <div className="mx-auto w-full max-w-[920px] pb-8">
      <div className="rounded-xl border border-[#f3f4f6] bg-[#fdfdfd] px-6 lg:px-8 py-10 flex flex-col items-center gap-6">
        {/* Illustration */}
        <CongratulationsIcon
          width={211}
          height={175}
          style={{ color: "#af060d" }}
          aria-hidden="true"
        />

        {/* Heading */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-xl lg:text-2xl font-semibold text-dark-text">
            Congratulations! You&apos;re Covered
          </h2>
          <p className="text-sm lg:text-base font-normal text-body-text">
            Your insurance policy has been issued successfully.
          </p>
        </div>

        {/* Policy Summary */}
        <div className="w-full max-w-[574px] rounded-xl border border-[#f3f4f6] p-5 bg-white overflow-hidden">
          {/* Policy Number */}
          <div className="flex items-center justify-between py-3 border-b border-[#f3f4f6]">
            <span className="text-sm font-normal text-dark-text">
              Policy Number
            </span>
            <span className="text-xl font-semibold text-brand-red">
              {policyNumber}
            </span>
          </div>

          <PolicyRow label="Full Name:" value={fullName} />
          <PolicyRow label="Insurance Type:" value={insuranceType} />
          <PolicyRow label="Product:" value={productName} />
          <PolicyRow label="Coverage Period" value={coveragePeriod} />
          <div className="flex items-center justify-between py-3">
            <span className="text-sm font-normal text-body-text">
              Premium Paid:
            </span>
            <span className="text-sm font-semibold text-dark-text">
              {premiumPaid}
            </span>
          </div>

          {/* Email Notice */}
          <div className="w-full flex items-center gap-5 rounded-xl bg-[#fff5f5] border border-[#ffdfdf] p-5">
            <EmailIcon
              width={22}
              height={18}
              style={{ color: "#af060d" }}
              className="shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-1">
              <p className="text-base font-semibold capitalize text-dark-text">
                Check Your Email
              </p>
              <p className="text-sm font-normal text-body-text">
                A copy of your policy document has been sent to {userEmail}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col w-full sm:flex-row items-center gap-5 mt-6">
            <Button
              variant="outline"
              onClick={onBackToHome}
              className="rounded-full border-brand-red text-brand-red hover:bg-brand-red hover:text-white font-medium px-8 py-3 h-13 transition-colors w-full flex-1"
            >
              Back to Insurance
            </Button>
            <Button
              disabled
              title="Policy download is not available yet"
              className="rounded-full bg-brand-red hover:bg-brand-red/90 text-white font-medium px-8 py-3 h-13 w-full flex-1 sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
              aria-label={downloadLabel}
            >
              {downloadLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PolicyRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#f3f4f6]">
      <span className="text-sm font-normal text-body-text">{label}</span>
      <span className="text-sm font-semibold text-dark-text">{value}</span>
    </div>
  );
}
