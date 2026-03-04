import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import MissionVision from "@/components/about/MissionVision";
import CoreValues from "@/components/about/CoreValues";
import LicensingPartnership from "@/components/about/LicensingPartnership";
import OurTeam from "@/components/about/OurTeam";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-page-bg">
     
      <AboutHero />
      <OurStory />
      <MissionVision />
      <CoreValues />
      <LicensingPartnership />
      <OurTeam />
      
    </main>
  );
}
