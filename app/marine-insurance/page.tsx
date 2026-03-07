"use client";

import { useMarineInsuranceStore } from '@/lib/store/marineInsuranceStore';
import MarineHeroSection from '@/components/marine-insurance/HeroSection';
import StepIndicator from '@/components/home-insurance/StepIndicator';
import MarineStep1ChooseProduct from '@/components/marine-insurance/Step1ChooseProduct';
import MarineStep2ProvideDetails from '@/components/marine-insurance/Step2ProvideDetails';
import MarineStep3ReviewPay from '@/components/marine-insurance/Step3ReviewPay';
import MarineStep4PolicyDocument from '@/components/marine-insurance/Step4PolicyDocument';

export default function MarineInsurancePage() {
  const { currentStep, setStep, reset } = useMarineInsuranceStore();

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
      <MarineHeroSection />

      {/* Steps Content */}
      <section className="bg-[#fdfdfd] pb-16">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-20">
          {/* Step Indicator — reuse from home-insurance */}
          <StepIndicator currentStep={currentStep} />

          {/* Step Content */}
          {currentStep === 1 && (
            <MarineStep1ChooseProduct onContinue={handleContinueStep1} />
          )}
          {currentStep === 2 && (
            <MarineStep2ProvideDetails onContinue={handleContinueStep2} onBack={handleBack} />
          )}
          {currentStep === 3 && (
            <MarineStep3ReviewPay onPay={handleContinueStep3} onBack={handleBack} />
          )}
          {currentStep === 4 && (
            <MarineStep4PolicyDocument onBackToHome={handleBackToHome} />
          )}
        </div>
      </section>
    </main>
  );
}
