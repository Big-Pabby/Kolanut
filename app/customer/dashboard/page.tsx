"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, UserLock, FileText, ChevronRight, User } from "lucide-react";

const quickLinks = [
  {
    icon: Shield,
    title: "Purchase Policy",
    description: "Purchase an insurance policy",
    bg: "bg-[#FEF2F2] border border-[#FEE2E2]",
    iconColor: "text-[#AF060D] bg-[#FEE2E2]",
    href: "/customer/purchased-premium",
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

const recentPremiums = [
  {
    policyNumber: "KA-09795170",
    insuranceType: "Tenant Policy Insurance",
    premiumPaid: "N10,000",
    datePurchased: "12/8/2025",
  },
  {
    policyNumber: "KA-09795170",
    insuranceType: "Landlord’s Policy Insurance",
    premiumPaid: "N10,000",
    datePurchased: "12/8/2025",
  },
  {
    policyNumber: "KA-09795170",
    insuranceType: "Comprehensive Auto Insurance",
    premiumPaid: "N10,000",
    datePurchased: "12/8/2025",
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      {/* KYC Banner */}
      <div className="bg-[#273DB4] p-4 flex items-center justify-between rounded-[8px]">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-[#F9FAFB] flex items-center justify-center">
            <User className="h-6 w-6 text-[#AF060D]" />
          </div>
          <div>
            <h2 className="text-white font-semibold text-xl leading-tight font-heading">
              Complete Your KYC
            </h2>
            <p className="text-white text-sm mt-0.5">
              Complete your account verification
            </p>
          </div>
        </div>
        <Button className="bg-[#AF060D] hover:bg-[#AF060D]/90 text-white text-sm font-medium px-5 py-2 rounded-full h-auto">
          Complete KYC
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
            <button className="flex items-center gap-1 text-[#AF060D] text-base font-semibold hover:text-red-700 transition-colors">
              See All
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recentPremiums.map((premium, i) => (
              <Card
                key={i}
                className="border border-[#F3F4F6] bg-[#FEFEFE] rounded-[10px] shadow-none hover:shadow-sm transition-shadow"
              >
                <CardContent className="p-3 space-y-4">
                  <div>
                    <p className="text-[#4B5563] text-sm">Policy Number:</p>
                    <p className="text-[#AF060D] font-semibold text-sm mt-0.5">
                      {premium.policyNumber}
                    </p>
                  </div>

                  <div className="border-t border-gray-100 pt-3">
                    <p className="text-[#4B5563] text-sm">Insurance Type:</p>
                    <p className="text-gray-800 font-semibold text-sm mt-0.5">
                      {premium.insuranceType}
                    </p>
                  </div>

                  <div className="border-t border-gray-100 pt-3">
                    <p className="text-[#4B5563] text-sm">Premium Paid:</p>
                    <p className="text-gray-800 font-semibold text-sm mt-0.5">
                      {premium.premiumPaid}
                    </p>
                  </div>

                  <div className="border-t border-gray-100 pt-3">
                    <p className="text-[#4B5563] text-sm">Date Purchased:</p>
                    <p className="text-gray-800 font-semibold text-sm mt-0.5">
                      {premium.datePurchased}
                    </p>
                  </div>

                  <Link
                    href={`/customer/purchased-premium/${premium.policyNumber}`}
                    passHref
                  >
                    <Button
                      variant="outline"
                      className="w-full border-[#AF060D] text-[#AF060D] hover:bg-red-50 hover:text-red-700 rounded-full text-sm font-semibold h-10 mt-1"
                    >
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
