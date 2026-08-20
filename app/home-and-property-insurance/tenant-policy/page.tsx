"use client";

import { useTenantPolicyStore } from "@/lib/store/tenantPolicyStore";
import type { TenantPolicyFormData } from "@/lib/store/tenantPolicyStore";
import PropertyHeroSection from "@/components/property-insurance/PropertyHeroSection";
import GenericStepIndicator from "@/components/insurance/GenericStepIndicator";
import Step1ChoosePlan from "@/components/insurance/Step1ChoosePlan";
import Step2ProvideDetails from "@/components/insurance/Step2ProvideDetails";
import Step3ReviewPay from "@/components/insurance/Step3ReviewPay";
import Step4PolicyDocument from "@/components/insurance/Step4PolicyDocument";

const TENANT_PLANS = [
  {
    id: "basic",
    name: "Basic Plan",
    description: "Perfect for protection for you and up to content",
    price: 26275,
    features: [
      "Covers household items and personal effects",
      "Fire and allied perils",
      "Burglary and theft coverage",
      "Personal liability protection",
    ],
  },
  {
    id: "bronze",
    name: "Bronze Plan",
    description: "Better coverage for your home, contents and small gadgets",
    price: 49775,
    features: [
      "All Basic plan benefits",
      "Higher settlement limits",
      "Additional perils coverage",
      "Extended liability",
    ],
  },
  {
    id: "silver",
    name: "Silver Plan",
    description: "Best balance of affordability and complete protection",
    price: 96775,
    features: [
      "All Bronze plan benefits",
      "Comprehensive all-risks coverage",
      "Valuable items protection",
      "Loss of rent coverage",
    ],
  },
  {
    id: "gold",
    name: "Gold Plan",
    description: "Provides even with higher limits for valuables and more",
    price: 143775,
    features: [
      "All Silver plan benefits",
      "Higher valuables limits",
      "Worldwide coverage",
      "Legal assistance",
    ],
  },
  {
    id: "platinum",
    name: "Platinum Plan",
    description: "All-round protection for high-value homes and possessions",
    price: 237775,
    features: [
      "All Gold plan benefits",
      "Unlimited coverage",
      "Premium customer service",
      "First-class claim handling",
    ],
  },
];

function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}


function getPlanLabel(planId: string): string {
  const map: Record<string, string> = {
    basic: "Basic Plan",
    bronze: "Bronze Plan",
    silver: "Silver Plan",
    gold: "Gold Plan",
    platinum: "Platinum Plan",
  };
  return map[planId] || "Tenant Policy";
}

const STEPS = [
  { number: 1, label: "Choose Plan" },
  { number: 2, label: "Provide Details" },
  { number: 3, label: "Review & Pay" },
  { number: 4, label: "Policy Document" },
];

export default function TenantPolicyPage() {
  const { currentStep, setStep, formData, updateField, reset } =
    useTenantPolicyStore();

  const handleContinueStep1 = () => setStep(2);
  const handleContinueStep2 = () => setStep(3);
  const handleContinueStep3 = () => setStep(4);
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
      <PropertyHeroSection
        title="Tenant Insurance"
        subtitle="Protect your household items and personal effects with our comprehensive tenant insurance."
      />

      {/* Steps Content */}
      <section className="bg-[#fdfdfd] pb-16">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-20">
          {/* Step Indicator */}
          <GenericStepIndicator currentStep={currentStep} steps={STEPS} />

          {/* Step Content */}
          <div className="transition-all max-w-[920px] mx-auto duration-300 mt-8">
            {currentStep === 1 && (
              <Step1ChoosePlan<TenantPolicyFormData>
                plans={TENANT_PLANS}
                formatPrice={formatNaira}
                onSelect={handleSelectPlan}
                onContinue={handleContinueStep1}
                insuranceType="tenant-policy"
              />
            )}

            {currentStep === 2 && (
              <Step2ProvideDetails<TenantPolicyFormData>
                personalFields={{
                  firstName: formData.firstName,
                  lastname: formData.lastname,
                  email: formData.email,
                  phone: formData.phone,
                  dateOfBirth: formData.dateOfBirth,
                  nin: formData.nin,
                  state: formData.state,
                  city: formData.city,
                }}
                locationFields={{
                  address: formData.address,
                }}
                onUpdate={updateField}
                onContinue={handleContinueStep2}
                onBack={handleBack}
              />
            )}

            {currentStep === 3 && (
              <Step3ReviewPay
                summaryRows={[
                  {
                    label: "Full Name:",
                    value:
                      `${formData.firstName} ${formData.lastname}`.trim() ||
                      "N/A",
                  },
                  { label: "Insurance Type:", value: "Home Insurance" },
                  {
                    label: "Product:",
                    value: getPlanLabel(formData.selectedPlan),
                  },
                  { label: "Coverage Period:", value: "12 Months" },
                ]}
                costRows={[
                  {
                    label: "Premium Cost:",
                    value: formatNaira(formData.selectedPlanPrice || 26275),
                  },
                  {
                    label: "Extra Fee:",
                    value: `₦10`,
                  },
                ]}
                totalCost={(formData.selectedPlanPrice || 26275) + 10}
                currencyFormatter={formatNaira}
                currencyCode="₦"
                onPay={handleContinueStep3}
                onBack={handleBack}
                payButtonLabel={`PAY NOW - ${formatNaira((formData.selectedPlanPrice || 26275) + 10)}`}
              />
            )}

            {currentStep === 4 && (
              <Step4PolicyDocument
                policyNumber="KA-09795170"
                fullName={
                  `${formData.firstName} ${formData.lastname}`.trim() ||
                  "Policy Holder"
                }
                insuranceType="Home Insurance"
                productName={getPlanLabel(formData.selectedPlan)}
                premiumPaid={formatNaira(formData.selectedPlanPrice || 26275)}
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
