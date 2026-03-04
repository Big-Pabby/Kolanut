import type { PropertyType, PricingPlan, FAQItem, SocialLink, Step, Location } from "./types";

export const ACCESS_TOKEN = "access-token";
export const REFRESH_TOKEN = "refresh-token";
// Currency formatter for Nigerian Naira
export const formatNGN = (amount: number): string => {
  return `₦${amount.toLocaleString('en-NG')}`;
};

// Step formatter
export const formatStep = (step: number): string => {
  return `Step ${step}`;
};

export const PROPERTY_TYPES: PropertyType[] = [
  {
    type: "houses",
    title: "Houses",
    imageUrl: "https://images.pexels.com/photos/8134750/pexels-photo-8134750.jpeg",
    icon: "house"
  },
  {
    type: "lands",
    title: "Lands",
    imageUrl: "https://images.pexels.com/photos/4525178/pexels-photo-4525178.jpeg",
    icon: "land"
  },
  {
    type: "apartments",
    title: "Apartments",
    imageUrl: "https://images.pexels.com/photos/3010014/pexels-photo-3010014.jpeg",
    icon: "apartment"
  }
];

export const LOCATIONS: Location[] = [
  { city: "Melbourne", avatarUrl: "https://images.pexels.com/photos/8353832/pexels-photo-8353832.jpeg" },
  { city: "Frankfurt", avatarUrl: "https://images.pexels.com/photos/12437056/pexels-photo-12437056.jpeg" },
  { city: "Lisbon", avatarUrl: "https://images.unsplash.com/photo-1766228609519-00a16d4064a8" },
  { city: "Johannesburg", avatarUrl: "https://images.unsplash.com/photo-1736939666660-d4c776e0532c" },
  { city: "London", avatarUrl: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg" }
];

export const STEPS: Step[] = [
  {
    number: 1,
    title: "Create an Account",
    description: "Sign up with your email or phone and get access to verified property listings."
  },
  {
    number: 2,
    title: "Browse & Purchase Properties",
    description: "Explore properties, choose your preferred payment plan, and purchase securely."
  },
  {
    number: 3,
    title: "Track & Monitor Investments",
    description: "Monitor your properties, check payment progress, and list properties for resale."
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Free",
    price: 0,
    period: "/user per year",
    description: "Everything you need to invest safely",
    features: [
      { text: "Full escrow protection for all payments", included: true },
      { text: "Milestone Verification before payout", included: true },
      { text: "Document storage & management", included: true },
      { text: "Payment tracking dashboard", included: true },
      { text: "Stay updated on milestones and alerts", included: true }
    ]
  },
  {
    name: "AI Premium",
    price: 100000,
    period: "/user per year",
    description: "AI-powered insights & Recommendations",
    highlighted: true,
    features: [
      { text: "All Free Plan features", included: true },
      { text: "AI-powered market insights", included: true },
      { text: "Smart Property Recommedations", included: true },
      { text: "Portfolio performance insights", included: true },
      { text: "Smart alerts for opportunities", included: true }
    ]
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How does Homebridge protect my money?",
    answer: "Your payments go into a secure third-party escrow account, NOT directly to the developer. Funds are only released when milestones are verified and proven complete. If a developer doesn't deliver, they don't get paid. Your money stays protected until work is done."
  },
  {
    question: "Can I track my property progress after purchase?",
    answer: "Yes, you can track your property progress in real-time through our dashboard."
  },
  {
    question: "How do you verify developers?",
    answer: "We conduct thorough background checks and verification of all developers on our platform."
  },
  {
    question: "Can I resell properties?",
    answer: "Yes, you can list your property on our secondary marketplace for resale."
  },
  {
    question: "How do I know my payment is secure?",
    answer: "All payments are protected through our escrow system and verified milestone tracking."
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "twitter", url: "#" },
  { platform: "facebook", url: "#" },
  { platform: "linkedin", url: "#" }
];