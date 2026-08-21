"use client";

import { useComprehensiveAutoInsuranceStore } from "@/lib/store/comprehensiveAutoInsuranceStore";
import GenericStepIndicator from "@/components/insurance/GenericStepIndicator";
import Step3ReviewPay from "@/components/insurance/Step3ReviewPay";
import Step4PolicyDocument from "@/components/insurance/Step4PolicyDocument";
import PageHero from "@/components/landing/PageHero";
import MotorInsuranceStep2ProvideDetails from "@/components/motor-insurance/MotorInsuranceStep2ProvideDetails";
import type { ComprehensiveAutoInsuranceFormData } from "@/lib/store/comprehensiveAutoInsuranceStore";

const STEPS = [
  { number: 1, label: "Provide Details" },
  { number: 2, label: "Review & Pay" },
  { number: 3, label: "Policy Document" },
];

function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}


function getPlanLabel(planId: string): string {
  const map: Record<string, string> = {
    economy: "Economy Plan",
    standard: "Standard Plan",
    premium: "Premium Plan",
  };
  return map[planId] || "Third Party Autobase Insurance";
}

export default function ThirdPartyAutobaseInsurancePolicyPage() {
  const { currentStep, setStep, formData, updateField, reset } =
    useComprehensiveAutoInsuranceStore();

  const goToReview = () => setStep(2);
  const goToPolicyDocument = () => setStep(3);
  const handleBack = () => setStep(currentStep - 1);

  const handleBackToHome = () => {
    reset();
    window.location.href = "/insured";
  };

  const handleSelectPlan = (planId: string, price: number) => {
    updateField("selectedPlan", planId);
    updateField("selectedPlanPrice", price);
  };

  return (
    <main className="min-h-screen bg-page-bg">
      {/* Hero */}
      <PageHero
        title="Complete your order"
        subtitle="Follow the Kolanut process to get insured and receive your policy instantly."
        image={"/images/motor.jpg"}
      />

      {/* Steps Content */}
      <section className="bg-[#fdfdfd] pb-16">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-20">
          {/* Step Indicator */}
          <GenericStepIndicator currentStep={currentStep} steps={STEPS} />

          {/* Step Content */}
          <div className="transition-all duration-300 max-w-[920px] mx-auto mt-8">
             {currentStep === 1 && (
               <MotorInsuranceStep2ProvideDetails
                 formData={formData}
                 onUpdate={(field, value) =>
                   updateField(field as keyof ComprehensiveAutoInsuranceFormData, value)
                 }
                 onContinue={goToReview}
                 onBack={handleBack}
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
                    value: "Motor Insurance",
                  },
                  {
                    label: "Product:",
                    value: getPlanLabel(formData.selectedPlan),
                  },
                  {
                    label: "Vehicle:",
                    value:  
                      `${formData.vehicleMake} ${formData.vehicleModel}`.trim() ||
                      "N/A",
                  },
                  {
                    label: "Registration:",
                    value: formData.chassisNumber || "N/A",
                  },
                  {
                    label: "Coverage Period:",
                    value: "12 Months",
                  },
                ]}
                costRows={[
                  {
                    label: "Premium Cost:",
                    value: formatNaira(formData.selectedPlanPrice || 50000),
                  },
                  {
                    label: "Tax:",
                    value: formatNaira(100),
                  },
                  {
                    label: "Extra Fee:",
                    value: `₦10`,
                  },
                ]}
                totalCost={(formData.selectedPlanPrice || 50000) + 100 + 10}
                currencyFormatter={formatNaira}
                currencyCode="₦"
                onPay={goToPolicyDocument}
                onBack={handleBack}
                payButtonLabel={`PAY NOW - ${formatNaira((formData.selectedPlanPrice || 50000) + 100 + 10)}`}
                showCoupon
              />
            )}

            {currentStep === 3 && (
              <Step4PolicyDocument
                policyNumber="MTA-09795170"
                fullName={
                  `${formData.firstName} ${formData.lastname}`.trim() ||
                  "Policy Holder"
                }
                insuranceType="Motor Insurance"
                productName={getPlanLabel(formData.selectedPlan)}
                premiumPaid={formatNaira(formData.selectedPlanPrice || 50000)}
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
