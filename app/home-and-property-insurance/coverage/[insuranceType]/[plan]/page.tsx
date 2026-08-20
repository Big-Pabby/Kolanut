"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { coverageData } from "@/lib/coverageData";
import CoverageDetails from "@/components/property-insurance/CoverageDetails";

export default function CoverageDetailsPage() {
  const params = useParams();
  const insuranceType = params.insuranceType as string;
  const planId = params.plan as string;

  const plan = coverageData[insuranceType]?.[planId];

  if (!plan) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Coverage Details Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          We couldn&apos;t find the coverage details for this plan.
        </p>
        <Link
          href="/home-and-property-insurance"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-full"
        >
          Back to Insurance
        </Link>
      </div>
    );
  }

  const getBackLink = () => {
    const typeMap: Record<string, string> = {
      "tenant-policy": "/home-and-property-insurance/tenant-policy",
      "homeowner-policy": "/home-and-property-insurance/homeowner-policy",
      "landlord-policy": "/home-and-property-insurance/landlord-policy",
    };
    return typeMap[insuranceType] || "/home-and-property-insurance";
  };

  return (
    <CoverageDetails
      planId={planId}
      planName={plan.planName}
      description={plan.description}
      price={plan.price}
      excess={plan.excess}
      allRiskCap={plan.allRiskCap}
      covered={plan.covered}
      notCovered={plan.notCovered}
      backLink={getBackLink()}
      insuranceType={insuranceType}
    />
  );
}
