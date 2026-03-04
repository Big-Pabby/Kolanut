
import HeroSection from "@/components/insured/InsuredHero";
import ProcessSection from "@/components/landing/ProcessSection";
import InsuranceProductsSection from "@/components/landing/InsuranceProductsSection";
import KolanutWaySection from "@/components/insured/WaySection";

export default function InsuredPage() {
  return (
    <main className="min-h-screen bg-page-bg">
      <HeroSection />
      <ProcessSection />
      <InsuranceProductsSection />
      <KolanutWaySection />
    </main>
  );
}
