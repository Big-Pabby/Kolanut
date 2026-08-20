"use client";

import { useLandlordPolicyStore } from "@/lib/store/landlordPolicyStore";
import type { LandlordPolicyFormData } from "@/lib/store/landlordPolicyStore";
import PropertyHeroSection from "@/components/property-insurance/PropertyHeroSection";
import GenericStepIndicator from "@/components/insurance/GenericStepIndicator";
import Step1ChoosePlan from "@/components/insurance/Step1ChoosePlan";
import Step2ProvideDetails from "@/components/insurance/Step2ProvideDetails";
import Step3ReviewPay from "@/components/insurance/Step3ReviewPay";
import Step4PolicyDocument from "@/components/insurance/Step4PolicyDocument";

const LANDLORD_PLANS = [
  {
    id: "basic",
    name: "Basic Plan",
    description: "Perfect for protection for you and up to content",
    price: 135000,
    features: [
      "Building coverage up to ₦10 million",
      "Loss of rent protection",
      "Tenant liability coverage",
      "Standard perils included",
    ],
  },
  {
    id: "bronze",
    name: "Bronze Plan",
    description: "Better coverage for your home, contents and small gadgets",
    price: 245000,
    features: [
      "Building coverage up to ₦25 million",
      "Loss of rent protection",
      "Tenant liability coverage",
      "Fire & allied perils",
      "Burglary and theft coverage",
      "Public liability included",
    ],
  },
  {
    id: "silver",
    name: "Silver Plan",
    description: "Best balance of affordability and complete protection",
    price: 465000,
    features: [
      "Unlimited building coverage",
      "Extended loss of rent period",
      "Comprehensive tenant liability",
      "All perils coverage",
      "Legal expense coverage",
      "24/7 claims support",
    ],
  },
  {
    id: "gold",
    name: "Gold Plan",
    description: "Provides even with higher limits for valuables and more",
    price: 685000,
    features: [
      "Unlimited building coverage",
      "Extended loss of rent period",
      "Comprehensive tenant liability",
      "All perils coverage",
      "Legal expense coverage",
      "24/7 claims support",
    ],
  },
  {
    id: "platinum",
    name: "Platinum Plan",
    description: "All-round protection for high-value homes and possessions",
    price: 795000,
    features: [
      "Unlimited building coverage",
      "Extended loss of rent period",
      "Comprehensive tenant liability",
      "All perils coverage",
      "Legal expense coverage",
      "24/7 claims support",
    ],
  },
];

function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}


function getPlanLabel(planId: string): string {
  const map: Record<string, string> = {
    standard: "Standard Plan",
    comprehensive: "Comprehensive Plan",
    premium: "Premium Plan",
  };
  return map[planId] || "Landlord Policy";
}

const STEPS = [
  { number: 1, label: "Choose Plan" },
  { number: 2, label: "Provide Details" },
  { number: 3, label: "Review & Pay" },
  { number: 4, label: "Policy Document" },
];

export default function LandlordPolicyPage() {
  const { currentStep, setStep, formData, updateField, reset } =
    useLandlordPolicyStore();

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
        title="Landlord Insurance"
        subtitle="Protect your rental property, loss of rent, and tenant-related risks."
      />

      {/* Steps Content */}
      <section className="bg-[#fdfdfd] pb-16">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-20">
          {/* Step Indicator */}
          <GenericStepIndicator currentStep={currentStep} steps={STEPS} />

          {/* Step Content */}
          <div className="transition-all duration-300 max-w-[920px] mx-auto mt-8">
            {currentStep === 1 && (
              <Step1ChoosePlan<LandlordPolicyFormData>
                plans={LANDLORD_PLANS}
                formatPrice={formatNaira}
                priceLabel="Annual Premium"
                onSelect={handleSelectPlan}
                onContinue={handleContinueStep1}
                title="Choose the Right Cover for Your Home"
                description="Compare our flexible householder plans and find one that fits your home, your lifestyle, and your budget"
                insuranceType="landlord-policy"
              />
            )}

            {currentStep === 2 && (
              <Step2ProvideDetails<LandlordPolicyFormData>
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
                title="Provide Your Details"
                description="Fill in your information to generate your policy quote"
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
                  { label: "Insurance Type:", value: "Landlord Insurance" },
                  {
                    label: "Product:",
                    value: getPlanLabel(formData.selectedPlan),
                  },
                  { label: "Coverage Period:", value: "12 Months" },
                ]}
                costRows={[
                  {
                    label: "Premium Cost:",
                    value: formatNaira(formData.selectedPlanPrice || 45000),
                  },
                  { label: "Extra Fee:", value: `₦10` },
                ]}
                totalCost={(formData.selectedPlanPrice || 45000) + 10}
                currencyFormatter={formatNaira}
                currencyCode="₦"
                onPay={handleContinueStep3}
                onBack={handleBack}
                payButtonLabel={`PAY NOW - ${formatNaira((formData.selectedPlanPrice || 45000) + 10)}`}
              />
            )}

            {currentStep === 4 && (
              <Step4PolicyDocument
                policyNumber="KA-09795170"
                fullName={
                  `${formData.firstName} ${formData.lastname}`.trim() ||
                  "Landlord Name"
                }
                insuranceType="Landlord Insurance"
                productName={getPlanLabel(formData.selectedPlan)}
                premiumPaid={formatNaira(formData.selectedPlanPrice || 45000)}
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
