"use client";

import { useHomeInsuranceStore } from '@/lib/store/homeInsuranceStore';
import HeroSection from '@/components/home-insurance/HeroSection';
import StepIndicator from '@/components/home-insurance/StepIndicator';
import Step1ChooseProduct from '@/components/home-insurance/Step1ChooseProduct';
import Step2ProvideDetails from '@/components/home-insurance/Step2ProvideDetails';
import Step3ReviewPay from '@/components/home-insurance/Step3ReviewPay';
import Step4PolicyDocument from '@/components/home-insurance/Step4PolicyDocument';

export default function HomeInsurancePage() {
  const { currentStep, setStep, reset } = useHomeInsuranceStore();

  const handleContinueStep1 = () => setStep(2);
  const handleContinueStep2 = () => setStep(3);
  const handleContinueStep3 = () => setStep(4);

  const handleBack = () => setStep(currentStep - 1);
  const handleBackToHome = () => {
    reset();
    window.location.href = '/';
  };

  return (
    <main className="min-h-screen bg-[#fbfbfb]">
      {/* Hero */}
      <HeroSection />

      {/* Steps Content */}
      <section className="bg-[#fdfdfd] pb-16">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-20">
          {/* Step Indicator */}
          <StepIndicator currentStep={currentStep} />

          {/* Step Content */}
          {currentStep === 1 && <Step1ChooseProduct onContinue={handleContinueStep1} />}
          {currentStep === 2 && (
            <Step2ProvideDetails onContinue={handleContinueStep2} onBack={handleBack} />
          )}
          {currentStep === 3 && (
            <Step3ReviewPay onPay={handleContinueStep3} onBack={handleBack} />
          )}
          {currentStep === 4 && <Step4PolicyDocument onBackToHome={handleBackToHome} />}
        </div>
      </section>
    </main>
  );
}
