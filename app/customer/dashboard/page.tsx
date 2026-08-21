"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Shield, UserLock, FileText, ChevronRight, User } from "lucide-react";
import PremiumCard from "@/components/customer/PremiumCard";
import { premiumsByRecency } from "@/lib/data/premiums";

const quickLinks = [
  {
    icon: Shield,
    title: "Purchase Policy",
    description: "Purchase an insurance policy",
    bg: "bg-[#FEF2F2] border border-[#FEE2E2]",
    iconColor: "text-[#AF060D] bg-[#FEE2E2]",
    href: "/customer/get-insured",
  },
  {
    icon: FileText,
    title: "Your Policies",
    description: "View all your purchased policies",
    bg: "bg-[#F0F8FF] border border-[#DBEEFF]",
    iconColor: "text-[#005AAD] bg-[#DBEEFF]",
    href: "/customer/purchased-premium",
  },
  {
    icon: UserLock,
    title: "Make a claim",
    description: "File a claim on your policy",
    bg: "bg-[#F0FDF4] border border-[#BBF7D0]",
    iconColor: "text-[#005AAD] bg-[#DBEEFF]",
    href: undefined,
  },
];

// The dashboard shows only the newest few, as a compact summary. The full,
// detailed cards live on /customer/purchased-premium.
const recentPremiums = premiumsByRecency().slice(0, 3);

export default function DashboardPage() {
  return (
    <div>
      {/* KYC Banner */}
      <div className="bg-[#273DB4] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-[8px]">
        <div className="flex items-center gap-4 min-w-0">
          <div className="h-12 w-12 rounded-full bg-[#F9FAFB] flex items-center justify-center">
            <User className="h-6 w-6 text-[#AF060D]" />
          </div>
          <div className="min-w-0">
            <h2 className="text-white font-semibold text-lg sm:text-xl leading-tight font-heading">
              Complete Your KYC
            </h2>
            <p className="text-white text-sm mt-0.5">
              Complete your account verification
            </p>
          </div>
        </div>
        <Button
          asChild
          className="w-full sm:w-auto shrink-0 bg-[#AF060D] hover:bg-[#AF060D]/90 text-white text-sm font-medium px-5 py-2 rounded-full h-auto"
        >
          <Link href="/customer/settings?tab=id-card">Complete KYC</Link>
        </Button>
      </div>

      {/* Main Content */}
      <div className="py-8">
        {/* Quick Links */}
        <section>
          <h2 className="text-gray-800 font-heading font-semibold text-base mb-4">
            Quick links
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              const cardClass = `${link.bg} rounded-[8px] px-4 py-6 flex items-center gap-4 text-left hover:opacity-90 transition-opacity w-full`;
              const inner = (
                <>
                  <div
                    className={`${link.iconColor} h-8 w-8 rounded-full flex justify-center items-center`}
                  >
                    <Icon className={`h-5 w-5 `} />
                  </div>
                  <div>
                    <p className="text-[#111827] font-semibold text-base">
                      {link.title}
                    </p>
                    <p className="text-gray-500 text-sm mt-0.5">
                      {link.description}
                    </p>
                  </div>
                </>
              );

              return link.href ? (
                <Link key={link.title} href={link.href} className={cardClass}>
                  {inner}
                </Link>
              ) : (
                <button key={link.title} className={cardClass}>
                  {inner}
                </button>
              );
            })}
          </div>
        </section>

        {/* Recent Premium Purchased */}
        <section className="mt-10 bg-white border border-[#F3F4F6] p-4 rounded-[8px]">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-gray-800 font-semibold text-base font-heading">
              Recent Premium Purchased
            </h2>
            <Link
              href="/customer/purchased-premium"
              className="flex items-center gap-1 text-[#AF060D] text-base font-semibold hover:text-red-700 transition-colors"
            >
              See All
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recentPremiums.map((premium) => (
              <PremiumCard key={premium.policyNumber} premium={premium} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
