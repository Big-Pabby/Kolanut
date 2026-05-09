"use client";

import { useLifestyleProtectionInsuranceStore } from "@/lib/store/lifeInsuranceStore";
import GenericStepIndicator from "@/components/insurance/GenericStepIndicator";
import Step3ReviewPay from "@/components/insurance/Step3ReviewPay";
import Step4PolicyDocument from "@/components/insurance/Step4PolicyDocument";
import PageHero from "@/components/landing/PageHero";
import TermLifeStep1PersonalInfo from "@/components/life-insurance/TermLifeStep1PersonalInfo";
import TermLifeStep2Beneficiary from "@/components/life-insurance/TermLifeStep2Beneficiary";
import TermLifeStep3Identity from "@/components/life-insurance/TermLifeStep3Identity";

const STEPS = [
  { number: 1, label: "Personal Information" },
  { number: 2, label: "Beneficiary Details" },
  { number: 3, label: "Identity Details" },
  { number: 4, label: "Review & Pay" },
  { number: 5, label: "Policy Document" },
];

const PREMIUM_OPTIONS = [
  { value: "20000", label: "₦20,000 (5% escalation)" },
  { value: "35000", label: "₦35,000 (10% escalation)" },
  { value: "50000", label: "₦50,000 (15% escalation)" },
];

function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

function formatUsd(amount: number): string {
  const usd = Math.round(amount / 1500);
  return `$${usd.toLocaleString("en-US")}`;
}

function getPlanLabel(premium: string): string {
  if (premium === "50000") return "Premium Plan";
  if (premium === "35000") return "Standard Plan";
  if (premium === "20000") return "Starter Plan";
  return "Lifestyle Protection Insurance";
}

export default function LifestyleProtectionInsurancePolicyPage() {
  const {
    currentStep,
    setStep,
    formData,
    updateField,
    updateBeneficiary,
    addBeneficiary,
    removeBeneficiary,
    reset,
  } = useLifestyleProtectionInsuranceStore();

  const handleContinueStep1 = () => setStep(2);
  const handleContinueStep2 = () => setStep(3);
  const handleContinueStep3 = () => setStep(4);
  const handleContinueStep4 = () => setStep(5);
  const handleBack = () => setStep(currentStep - 1);

  const handleBackToHome = () => {
    reset();
    window.location.href =
      "/life-and-family-insurance/lifestyle-protection-insurance";
  };

  const premium = parseInt(formData.premiumAmount || "0", 10);
  const extraFee = 10;
  const total = premium + extraFee;

  return (
    <main className="min-h-screen bg-page-bg">
      <PageHero
        title="Complete Your Order"
        subtitle="Follow the Kolanut process to get insured and receive your policy instantly."
        image={"/images/lifestyle-protection.png"}
      />

      <section className="bg-[#fdfdfd] pb-16">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-20">
          <GenericStepIndicator currentStep={currentStep} steps={STEPS} />

          <div className="transition-all duration-300 max-w-[920px] mx-auto mt-8">
            {currentStep === 1 && (
              <TermLifeStep1PersonalInfo
                formData={formData}
                onUpdate={(field, value) => updateField(field, value)}
                onContinue={handleContinueStep1}
                onBack={handleBack}
                premiumOptions={PREMIUM_OPTIONS}
              />
            )}

            {currentStep === 2 && (
              <TermLifeStep2Beneficiary
                formData={formData}
                onUpdateBeneficiary={updateBeneficiary}
                onAddBeneficiary={addBeneficiary}
                onRemoveBeneficiary={removeBeneficiary}
                onContinue={handleContinueStep2}
                onBack={handleBack}
              />
            )}

            {currentStep === 3 && (
              <TermLifeStep3Identity
                formData={formData}
                onUpdate={(field, value) => updateField(field, value)}
                onContinue={handleContinueStep3}
                onBack={handleBack}
              />
            )}

            {currentStep === 4 && (
              <Step3ReviewPay
                summaryRows={[
                  {
                    label: "Full Name:",
                    value:
                      `${formData.firstName} ${formData.lastname}`.trim() ||
                      "N/A",
                  },
                  { label: "Insurance Type:", value: "Life & Family Insurance" },
                  {
                    label: "Product:",
                    value: getPlanLabel(formData.premiumAmount),
                  },
                  {
                    label: "Premium Frequency:",
                    value: formData.premiumFrequency || "Annually",
                  },
                  {
                    label: "Beneficiary:",
                    value:
                      formData.beneficiaries
                        .map((b) => `${b.firstName} ${b.lastname}`.trim())
                        .filter(Boolean)
                        .join(", ") || "N/A",
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
                onPay={handleContinueStep4}
                onBack={handleBack}
                payButtonLabel={`PAY NOW - ${formatUsd(total)}`}
                showCoupon
              />
            )}

            {currentStep === 5 && (
              <Step4PolicyDocument
                policyNumber="LPI-09795170"
                fullName={
                  `${formData.firstName} ${formData.lastname}`.trim() ||
                  "Policy Holder"
                }
                insuranceType="Lifestyle Protection Insurance"
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
