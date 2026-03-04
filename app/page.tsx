import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import WhyChooseSection from "@/components/landing/WhyChooseSection";
import InsuranceProductsSection from "@/components/landing/InsuranceProductsSection";
import ProcessSection from "@/components/landing/ProcessSection";
import KolanutWaySection from "@/components/landing/KolanutWaySection";
import BlogSection from "@/components/landing/BlogSection";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <FeaturesSection />
      <WhyChooseSection />
      <InsuranceProductsSection />
      <ProcessSection />
      <KolanutWaySection />
      <BlogSection />
      <FAQSection />
    </main>
  );
}
