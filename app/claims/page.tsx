import React from 'react'
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import ClaimsHeroSection from '@/components/claimspage/ClaimsHeroSection';
import ClaimsJourneySection from '@/components/claimspage/ClaimsJourneySection';
import ClaimRequestSection from '@/components/claimspage/ClaimRequestSection';
import ClaimsCtaSection from '@/components/claimspage/ClaimsCtaSection';


export default function claimspage() {
    return (
        <main className="min-h-screen bg-page-bg">
            <ClaimsHeroSection />
            <ClaimsJourneySection />
            <ClaimRequestSection />
            <ClaimsCtaSection />
        </main>
    );
}