"use client";

import { useHomeownerPolicyStore } from "@/lib/store/homeownerPolicyStore";
import type { HomeownerPolicyFormData } from "@/lib/store/homeownerPolicyStore";
import PropertyHeroSection from "@/components/property-insurance/PropertyHeroSection";
import GenericStepIndicator from "@/components/insurance/GenericStepIndicator";
import Step1ChoosePlan from "@/components/insurance/Step1ChoosePlan";
import Step2ProvideDetails from "@/components/insurance/Step2ProvideDetails";
import Step3ReviewPay from "@/components/insurance/Step3ReviewPay";
import Step4PolicyDocument from "@/components/insurance/Step4PolicyDocument";

const HOMEOWNER_PLANS = [
  {
    id: "Basic",
    name: "Basic Plan",
    description: "Perfect for protection for you and up to content",
    price: 124775,
    features: [
      "Building coverage up to ₦15 million",
      "Contents coverage up to ₦5 million",
      "Fire and allied perils",
      "Burglary and theft",
      "Personal liability",
    ],
  },
  {
    id: "bronze",
    name: "Bronze Plan",
    description: "Better coverage for your home, contents and small gadgets",
    price: 221775,
    features: [
      "Building coverage up to ₦50 million",
      "Contents coverage up to ₦20 million",
      "All perils coverage",
      "Valuable items included",
      "Loss of rent",
      "Public liability",
      "Legal expenses",
    ],
  },
  {
    id: "silver",
    name: "Silver Plan",
    description: "Best balance of affordability and complete protection",
    price: 415775,
    features: [
      "Unlimited building coverage",
      "Unlimited contents coverage",
      "Comprehensive all-risks",
      "Worldwide coverage",
      "High-value items",
      "VIP claims service",
      "24/7 support",
    ],
  },
  {
    id: "gold",
    name: "Gold Plan",
    description: "Provides even with higher limits for valuables and more",
    price: 609775,
    features: [
      "Unlimited building coverage",
      "Unlimited contents coverage",
      "Comprehensive all-risks",
      "Worldwide coverage",
      "High-value items",
      "VIP claims service",
      "24/7 support",
    ],
  },
  {
    id: "platinum",
    name: "Platinum Plan",
    description: "All-round protection for high-value homes and possessions",
    price: 706775,
    features: [
      "Unlimited building coverage",
      "Unlimited contents coverage",
      "Comprehensive all-risks",
      "Worldwide coverage",
      "High-value items",
      "VIP claims service",
      "24/7 support",
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
  return map[planId] || "Homeowner Policy";
}

const STEPS = [
  { number: 1, label: "Choose Plan" },
  { number: 2, label: "Provide Details" },
  { number: 3, label: "Review & Pay" },
  { number: 4, label: "Policy Document" },
];

export default function HomeownerPolicyPage() {
  const { currentStep, setStep, formData, updateField, reset } =
    useHomeownerPolicyStore();

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
        title="Homeowner Insurance"
        subtitle="Full protection for your building, contents, and liabilities."
      />

      {/* Steps Content */}
      <section className="bg-[#fdfdfd] pb-16">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-20">
          {/* Step Indicator */}
          <GenericStepIndicator currentStep={currentStep} steps={STEPS} />

          {/* Step Content */}
          <div className="transition-all duration-300 max-w-[920px] mx-auto mt-8">
            {currentStep === 1 && (
              <Step1ChoosePlan<HomeownerPolicyFormData>
                plans={HOMEOWNER_PLANS}
                formatPrice={formatNaira}
                onSelect={handleSelectPlan}
                onContinue={handleContinueStep1}
                title="Choose the Right Cover for Your Home"
                description="Compare our flexible homeowner plans and find one that fits your home, your lifestyle, and your budget"
                insuranceType="homeowner-policy"
              />
            )}

            {currentStep === 2 && (
              <Step2ProvideDetails<HomeownerPolicyFormData>
                 personalFields={{
                   firstName: formData.firstName,
                   lastname: formData.surname,
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
                 onUpdate={(field, value) => {
                   const fieldName = (field as string) === "lastname" ? "surname" : field;
                   updateField(
                     fieldName as keyof HomeownerPolicyFormData,
                     value
                   );
                 }}
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
                      `${formData.firstName} ${formData.surname}`.trim() ||
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
                    value: formatNaira(formData.selectedPlanPrice || 35000),
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
                totalCost={(formData.selectedPlanPrice || 35000) + 100 + 10}
                currencyFormatter={formatNaira}
                currencyCode="₦"
                onPay={handleContinueStep3}
                onBack={handleBack}
                payButtonLabel={`PAY NOW - ${formatNaira((formData.selectedPlanPrice || 35000) + 100 + 10)}`}
                showCoupon
              />
            )}

            {currentStep === 4 && (
              <Step4PolicyDocument
                policyNumber="KA-09795170"
                fullName={
                  `${formData.firstName} ${formData.surname}`.trim() ||
                  "Policy Holder"
                }
                insuranceType="Home Insurance"
                productName={getPlanLabel(formData.selectedPlan)}
                premiumPaid={formatNaira(formData.selectedPlanPrice || 35000)}
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
