import React from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import ApiHeroSection from "@/components/apipage/ApiHeroSection";
import HowApiWorksSection from "@/components/apipage/HowApiWorkSection";
import RoadmapChecklistSection from "@/components/apipage/RoadMapChecklistSection";
import RailsComparisonSection from "@/components/apipage/RailsComparisonSection";
import ApiPartnerRegistrationSection from "@/components/apipage/ApiPartnerRegistrationSection";

export default function apipage() {
  return (
    <main className="min-h-screen bg-page-bg">
      <ApiHeroSection />
      <HowApiWorksSection />
      <RoadmapChecklistSection />
      <RailsComparisonSection />
      <ApiPartnerRegistrationSection />
    </main>
  );
}
