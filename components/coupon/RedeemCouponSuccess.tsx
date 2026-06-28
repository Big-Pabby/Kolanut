"use client";

import { Button } from "@/components/ui/button";
import CongratulationsIcon from "@/src/assets/icons/congratulations.svg";
import EmailIcon from "@/src/assets/icons/email-icon.svg";

interface RedeemCouponSuccessProps {
  onBackToHome: () => void;
  onDownload?: () => void;
  policyNumber?: string;
  fullName?: string;
  insuranceType?: string;
  product?: string;
  coveragePeriod?: string;
  premiumPaid?: string;
  email?: string;
}

export default function RedeemCouponSuccess({
  onBackToHome,
  onDownload,
  policyNumber = "KA-09795170",
  fullName = "Mauteen Adeleke",
  insuranceType = "Home Insurance",
  product = "Tenant Policy",
  coveragePeriod = "12 Months",
  premiumPaid = "$5,110",
  email = "mauteen@gmail.com",
}: RedeemCouponSuccessProps) {
  return (
    <section className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 py-12 md:py-16">
      <div className="mx-auto w-full max-w-[760px] rounded-xl border border-card-border bg-white px-6 md:px-10 py-10 flex flex-col items-center gap-6">
        {/* Illustration */}
        <CongratulationsIcon
          width={211}
          height={175}
          style={{ color: "#af060d" }}
        />

        {/* Heading */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-2xl font-medium text-[#161616]">
            Congratulations! You&apos;re Covered
          </h2>
          <p className="text-base text-[#4b5563]">
            Your insurance policy has been issued successfully.
          </p>
        </div>

        {/* Policy Summary */}
        <div className="w-full max-w-[574px] rounded-xl border border-card-border bg-white overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-card-border">
            <span className="text-base text-[#161616]">Policy Number</span>
            <span className="text-xl font-medium text-brand-red">
              {policyNumber}
            </span>
          </div>
          <PolicyRow label="Full Name:" value={fullName} />
          <PolicyRow label="Insurance Type:" value={insuranceType} />
          <PolicyRow label="Product:" value={product} />
          <PolicyRow label="Coverage Period" value={coveragePeriod} />
          <div className="flex items-center justify-between px-5 py-3">
            <span className="text-base text-[#4b5563]">Premium Paid:</span>
            <span className="text-base font-medium text-[#161616]">
              {premiumPaid}
            </span>
          </div>
        </div>

        {/* Email Notice */}
        <div className="w-full max-w-[574px] flex items-start gap-3.5 rounded-xl bg-[#fff5f5] border border-[#ffdfdf] px-4 py-4">
          <EmailIcon
            width={22}
            height={18}
            style={{ color: "#af060d" }}
            className="shrink-0 mt-0.5"
          />
          <div className="flex flex-col gap-1">
            <p className="text-base font-medium text-[#161616]">
              Check Your Email
            </p>
            <p className="text-sm text-[#4b5563]">
              A copy of your policy document has been sent to {email}
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
            onClick={onDownload}
            className="rounded-full bg-brand-red hover:bg-brand-red/90 text-white font-medium px-8 py-3 h-auto"
          >
            Download Policy
          </Button>
        </div>
      </div>
    </section>
  );
}

function PolicyRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-5 py-3 border-b border-card-border">
      <span className="text-base text-[#4b5563]">{label}</span>
      <span className="text-base font-medium text-[#161616]">{value}</span>
    </div>
  );
}
