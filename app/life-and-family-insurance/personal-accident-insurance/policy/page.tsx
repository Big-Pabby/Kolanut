"use client";

import { usePersonalAccidentInsuranceStore } from "@/lib/store/lifeInsuranceStore";
import GenericStepIndicator from "@/components/insurance/GenericStepIndicator";
import Step3ReviewPay from "@/components/insurance/Step3ReviewPay";
import Step4PolicyDocument from "@/components/insurance/Step4PolicyDocument";
import PageHero from "@/components/landing/PageHero";
import PersonalProtectionStep1 from "@/components/life-insurance/PersonalProtectionStep1";

const STEPS = [
  { number: 1, label: "Provide Details" },
  { number: 2, label: "Review & Pay" },
  { number: 3, label: "Policy Document" },
];

const COVER_OPTIONS = [
  { value: "5000", label: "Bronze (₦5,000)" },
  { value: "10000", label: "Silver (₦10,000)" },
  { value: "20000", label: "Gold (₦20,000)" },
];

function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

function formatUsd(amount: number): string {
  const usd = Math.round(amount / 1500);
  return `$${usd.toLocaleString("en-US")}`;
}

function getPlanLabel(premium: string): string {
  if (premium === "20000") return "Gold Plan";
  if (premium === "10000") return "Silver Plan";
  if (premium === "5000") return "Bronze Plan";
  return "Personal Protection Insurance";
}

export default function PersonalAccidentInsurancePolicyPage() {
  const { currentStep, setStep, formData, updateField, reset } =
    usePersonalAccidentInsuranceStore();

  const handleContinueStep1 = () => setStep(2);
  const handleContinueStep2 = () => setStep(3);
  const handleBack = () => setStep(currentStep - 1);

  const handleBackToHome = () => {
    reset();
    window.location.href =
      "/life-and-family-insurance/personal-accident-insurance";
  };

  const premium = parseInt(formData.premiumAmount || "0", 10);
  const extraFee = 10;
  const total = premium + extraFee;

  return (
    <main className="min-h-screen bg-page-bg">
      <PageHero
        title="Personal Protection Insurance"
        subtitle="Drive assured knowing you're financially protected from unforeseen perils. We have an array of options to fit your needs and budget."
        image={"/images/personal-accident.png"}
      />

      <section className="bg-[#fdfdfd] pb-16">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-20">
          <GenericStepIndicator currentStep={currentStep} steps={STEPS} />

          <div className="transition-all duration-300 max-w-[920px] mx-auto mt-8">
            {currentStep === 1 && (
              <PersonalProtectionStep1
                formData={formData}
                onUpdate={(field, value) => updateField(field, value)}
                onContinue={handleContinueStep1}
                onBack={handleBack}
                coverOptions={COVER_OPTIONS}
              />
            )}

            {currentStep === 2 && (
              <Step3ReviewPay
                summaryRows={[
                  {
                    label: "Full Name:",
                    value:
                      `${formData.firstName} ${formData.lastname}`.trim() ||
                      "N/A",
                  },
                  {
                    label: "Insurance Type:",
                    value: "Personal Protection Insurance",
                  },
                  {
                    label: "Cover Type:",
                    value: getPlanLabel(formData.premiumAmount),
                  },
                  {
                    label: "Cover Frequency:",
                    value: formData.premiumFrequency || "Annually",
                  },
                  { label: "Coverage Period:", value: "12 Months" },
                ]}
                costRows={[
                  { label: "Premium Cost:", value: formatNaira(premium) },
                  { label: "Extra Fee:", value: `₦${extraFee}` },
                ]}
                totalCost={total}
                currencyFormatter={formatNaira}
                currencyCode="₦"
                onPay={handleContinueStep2}
                onBack={handleBack}
                payButtonLabel={`PAY NOW - ${formatUsd(total)}`}
                showCoupon
              />
            )}

            {currentStep === 3 && (
              <Step4PolicyDocument
                policyNumber="PAI-09795170"
                fullName={
                  `${formData.firstName} ${formData.lastname}`.trim() ||
                  "Policy Holder"
                }
                insuranceType="Personal Protection Insurance"
                productName={getPlanLabel(formData.premiumAmount)}
                premiumPaid={formatUsd(total)}
                coveragePeriod="12 Months"
                userEmail={formData.email || "your email"}
                onBackToHome={handleBackToHome}
              />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
