"use client";

import HomeIconRed from '@/src/assets/icons/home-icon-red.svg';
import { Button } from '@/components/ui/button';

interface Step1Props {
  onContinue: () => void;
}

export default function Step1ChooseProduct({ onContinue }: Step1Props) {
  return (
    <div className="mx-auto w-full max-w-[920px] rounded-xl border border-[#f3f4f6] bg-[#fdfdfd] px-8 py-8">
      {/* Title */}
      <div className="flex flex-col gap-2 mb-6">
        <h2 className="text-2xl font-medium text-[#161616]">
          Step 1 of 4 – Choose your Home Insurance product
        </h2>
        <p className="text-base font-normal text-[#4b5563]">Select the type of cover</p>
      </div>

      {/* Product Card */}
      <div className="mb-8">
        <div className="rounded-xl border border-brand-red bg-[#fff5f5] p-4 lg:p-5 flex flex-col gap-3">
          <div className="w-9 h-9 rounded-lg bg-brand-red flex items-center justify-center">
            <HomeIconRed width={20} height={20} style={{ color: '#ffffff' }} />
          </div>
          <div className="flex flex-col gap-1.5">
            <h3 className="text-base font-medium text-[#161616] capitalize">Home Insurance</h3>
            <p className="text-sm font-normal text-[#4b5563] leading-[20px]">
              Provides indemnity to the Insured against loss or damage to the buildings caused by an
              insured peril (fire, lightning, explosion, flood, malicious damage etc).
            </p>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-end">
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
