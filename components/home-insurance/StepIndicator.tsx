"use client";

import StepCheck from '@/src/assets/icons/step-check.svg';

interface StepIndicatorProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: 'Choose Product' },
  { number: 2, label: 'Provide Details' },
  { number: 3, label: 'Review & Pay' },
  { number: 4, label: 'Policy Document' },
];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="mx-auto w-full max-w-[920px] py-8 lg:py-10">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.number} className="flex items-center flex-1">
              {/* Step column */}
              <div className="flex flex-col items-center gap-1.5 shrink-0">
                {/* Circle */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors
                    ${isCompleted ? 'bg-brand-red' : isCurrent ? 'bg-brand-red' : 'bg-white border-2 border-[#d1d5db]'}
                  `}
                >
                  {isCompleted ? (
                    <StepCheck width={15} height={11} style={{ color: '#ffffff' }} />
                  ) : (
                    <span className={isCurrent ? 'text-white' : 'text-[#374151]'}>
                      {step.number}
                    </span>
                  )}
                </div>
                {/* Label */}
                <span
                  className={`text-xs font-normal whitespace-nowrap ${
                    isCompleted || isCurrent ? 'text-[#161616]' : 'text-[#4b5563]'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line */}
              {!isLast && (
                <div
                  className="flex-1 mx-2 h-[3px] mb-5 rounded-full"
                  style={{
                    backgroundColor:
                      currentStep > step.number ? '#af060d' : '#e5e7eb',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
