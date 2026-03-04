"use client";

import { useState } from 'react';
import { useHomeInsuranceStore } from '@/lib/store/homeInsuranceStore';
import { Button } from '@/components/ui/button';

const PREMIUM_COST = 5000;
const TAX = 100;
const EXTRA_FEE = 10;

function formatCurrency(amount: number) {
  return `$${amount.toLocaleString()}`;
}

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

interface Step3Props {
  onPay: () => void;
  onBack: () => void;
}

export default function Step3ReviewPay({ onPay, onBack }: Step3Props) {
  const { formData, updateField } = useHomeInsuranceStore();
  const [couponInput, setCouponInput] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const total = PREMIUM_COST + TAX + EXTRA_FEE;

  const handleApplyCoupon = () => {
    if (couponInput.trim()) {
      updateField('couponCode', couponInput.trim());
      setCouponApplied(true);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[920px] rounded-xl border border-[#f3f4f6] bg-[#fdfdfd] px-8 py-8">
      {/* Title */}
      <div className="flex flex-col gap-2 mb-6">
        <h2 className="text-2xl font-medium text-[#161616]">Step 3 of 4 — Review & Pay</h2>
        <p className="text-base font-normal text-[#4b5563]">
          Review your quote details and complete payment to get covered.
        </p>
      </div>

      {/* Two columns: Quote Summary + Payment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quote Summary */}
        <div className="rounded-xl border border-[#f3f4f6] bg-[#fdfdfd] p-4">
          <h3 className="text-base font-medium text-[#111827] mb-4">Quote Summary</h3>

          {/* Rows */}
          <div className="flex flex-col">
            <SummaryRow label="Full Name:" value={getFullName(formData)} />
            <SummaryRow label="Insurance Type" value="Home Insurance" />
            <SummaryRow label="Product:" value={getProductLabel(formData.insuranceType)} />
            <div className="flex items-center justify-between py-3">
              <span className="text-base font-normal text-[#4b5563]">Coverage Period:</span>
              <span className="text-base font-medium text-[#161616]">12 Months</span>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="rounded-xl border border-[#f3f4f6] bg-[#fdfdfd] p-4 flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-medium text-[#111827]">Payment</h3>

            {/* Coupon Code */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#374151]">Have a coupon code?</label>
              <div className="flex items-center gap-2 h-12 rounded-[10px] border border-[#d1d5db] px-3 shadow-[0_1px_2px_rgba(18,26,43,0.05)]">
                <input
                  type="text"
                  placeholder="Enter"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 text-sm text-[#161616] placeholder:text-[#6b7280] bg-transparent outline-none"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="text-sm font-medium text-brand-red hover:text-brand-red/80 transition-colors shrink-0"
                >
                  {couponApplied ? 'Applied' : 'Apply'}
                </button>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="flex flex-col">
              <PaymentRow label="Premium Cost:" value={formatCurrency(PREMIUM_COST)} />
              <PaymentRow label="Tax:" value={formatCurrency(TAX)} />
              <PaymentRow label="Extra Fee:" value={formatCurrency(EXTRA_FEE)} />
            </div>

            {/* Total */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-base font-normal text-[#161616]">Total Cost:</span>
              <span className="text-xl font-medium text-brand-red">{formatCurrency(PREMIUM_COST)}</span>
            </div>
          </div>

          {/* Pay Button */}
          <Button
            onClick={onPay}
            className="w-full rounded-full bg-brand-red hover:bg-brand-red/90 text-white font-medium py-3 h-auto text-base"
          >
            PAY NOW - {formatCurrency(total).replace('$', ' $')}
          </Button>
        </div>
      </div>

      {/* Go Back */}
      <div className="mt-8">
        <Button
          variant="outline"
          onClick={onBack}
          className="rounded-full border-brand-red text-brand-red hover:bg-brand-red hover:text-white font-medium px-8 py-3 h-auto transition-colors"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#f3f4f6]">
      <span className="text-base font-normal text-[#4b5563]">{label}</span>
      <span className="text-base font-medium text-[#161616]">{value}</span>
    </div>
  );
}

function PaymentRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#f3f4f6]">
      <span className="text-base font-normal text-[#4b5563]">{label}</span>
      <span className="text-base font-medium text-[#161616]">{value}</span>
    </div>
  );
}
