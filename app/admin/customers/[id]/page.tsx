"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ChevronDown, ArrowLeft, Download, FileText } from "lucide-react";
import {
  formatAdminAmount,
  formatAdminDate,
  getAdminCustomerById,
  policiesForCustomer,
} from "@/lib/data/admin";
import { PREMIUM_STATUS_CLASS } from "@/lib/data/premiums";

export default function CustomerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const customerId = Number(params?.id);
  const customer = Number.isFinite(customerId)
    ? getAdminCustomerById(customerId)
    : undefined;

  const [customerOpen, setCustomerOpen] = useState(true);
  const [policiesOpen, setPoliciesOpen] = useState(true);

  const backButton = (
    <button
      onClick={() => router.push("/admin/customers")}
      className="flex cursor-pointer items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
    >
      <ArrowLeft size={16} />
      Back to Customers
    </button>
  );

  if (!customer) {
    return (
      <div className="min-h-screen space-y-6">
        {backButton}
        <div className="rounded-[8px] border border-[#F3F4F6] bg-white p-10 text-center">
          <h1 className="text-lg font-semibold text-gray-800">
            Customer not found
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            No customer matches this ID.
          </p>
        </div>
      </div>
    );
  }

  const policies = policiesForCustomer(customer.name);
  const idCard = customer.identityCard;
  const kycCompleted = customer.kycStatus === "Completed";

  return (
    <div className="min-h-screen space-y-6">
      {/* Top Nav */}
      {backButton}

      {/* Page Content */}
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-[8px] border border-[#F3F4F6] p-4">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight font-heading">
            {customer.name}
          </h1>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="text-sm text-gray-500">KYC Status:</span>
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${
                kycCompleted
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-orange-50 text-orange-600 border-orange-200"
              }`}
            >
              {customer.kycStatus}
            </span>
            <span className="text-sm text-gray-400">
              · Onboarded {formatAdminDate(customer.onboardedDate)}
            </span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 bg-white border border-[#F3F4F6] p-4 rounded-[10px] space-y-6">
            {/* Customer Details */}
            <div className="bg-[#FEFEFE] rounded-[10px] border border-[#F3F4F6] p-3 overflow-hidden">
              <button
                onClick={() => setCustomerOpen(!customerOpen)}
                className="w-full flex items-center justify-between pb-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-base font-heading font-semibold text-gray-800">
                  Customer Details
                </h2>
                <ChevronDown
                  size={24}
                  className={`text-[#111827] transition-transform duration-200 ${customerOpen ? "rotate-180" : ""}`}
                />
              </button>

              {customerOpen && (
                <div className="py-6 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
                  <Field label="Customer Name" value={customer.name} />
                  <Field label="Email Address" value={customer.email} />
                  <Field label="NIN Number" value={customer.nin} />
                  <Field label="Phone Number" value={customer.phone} />
                  <Field label="State" value={customer.state} />
                  <Field label="Country" value={customer.country} />
                  <Field
                    label="Street"
                    value={customer.street}
                    className="sm:col-span-2"
                  />
                </div>
              )}
            </div>

            {/* Policies */}
            <div className="bg-[#FEFEFE] rounded-[10px] border border-[#F3F4F6] p-3 overflow-hidden">
              <button
                onClick={() => setPoliciesOpen(!policiesOpen)}
                className="w-full flex items-center justify-between pb-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-base font-heading font-semibold text-gray-800">
                  Policies ({policies.length})
                </h2>
                <ChevronDown
                  size={24}
                  className={`text-[#111827] transition-transform duration-200 ${policiesOpen ? "rotate-180" : ""}`}
                />
              </button>

              {policiesOpen && (
                <div className="pt-6">
                  {policies.length === 0 ? (
                    <p className="py-4 text-center text-sm text-gray-400">
                      This customer has not purchased a policy yet.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {policies.map((policy) => (
                        <div
                          key={
                            policy.policyNumber ??
                            `${policy.product}-${policy.datePurchased}`
                          }
                          className="rounded-[10px] border border-[#F3F4F6] bg-[#FFFFFF] p-3 space-y-4"
                        >
                          <div className="flex items-start justify-between gap-3 border-b border-[#F3F4F6] pb-4">
                            <div className="min-w-0">
                              <p className="text-sm text-[#4B5563]">
                                Policy Number:
                              </p>
                              <p className="text-sm font-semibold text-[#161616] mt-1">
                                {policy.policyNumber ?? (
                                  <span className="font-normal text-gray-400">
                                    Not issued yet
                                  </span>
                                )}
                              </p>
                            </div>
                            <span
                              className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium ${PREMIUM_STATUS_CLASS[policy.status]}`}
                            >
                              {policy.status}
                            </span>
                          </div>

                          <PolicyRow
                            label="Insurance Type:"
                            value={`${policy.category} Insurance`}
                          />
                          <PolicyRow label="Product:" value={policy.product} />
                          <PolicyRow
                            label="Premium Paid:"
                            value={formatAdminAmount(policy.premiumPaid)}
                          />
                          <PolicyRow
                            label="Date Purchased:"
                            value={formatAdminDate(policy.datePurchased)}
                          />

                          {policy.policyNumber ? (
                            <Link
                              href={`/admin/policies/${policy.policyNumber}`}
                              className="inline-block text-base font-semibold text-[#AF060D] hover:text-[#AF060D]/80 transition-colors pt-1"
                            >
                              View Details
                            </Link>
                          ) : (
                            <p className="pt-1 text-xs text-gray-400">
                              Details available once the policy is issued.
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column — ID Card */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#F3F4F6] p-4 rounded-[10px] space-y-6 sticky top-6">
              <div className="bg-[#FEFEFE] rounded-[10px] border border-[#F3F4F6] p-3 overflow-hidden space-y-4">
                <h2 className="text-base font-heading font-semibold text-gray-800 border-b border-gray-100 pb-3">
                  Identification Card
                </h2>

                {idCard ? (
                  <>
                    <IDField label="ID type" value={idCard.idType} />
                    <IDField
                      label="Identification Number"
                      value={idCard.identificationNumber}
                    />
                    <IDField
                      label="Date of Issue"
                      value={formatAdminDate(idCard.dateIssued)}
                    />
                    <IDField
                      label="Expiry date"
                      value={formatAdminDate(idCard.expiryDate)}
                    />

                    {/* ID Image Row */}
                    <div className="flex items-center justify-between bg-[#F9FAFB] rounded-[10px] border border-[#F3F4F6] p-4 mt-2">
                      <div className="flex items-center gap-3">
                        <FileText size={24} className="text-[#4B5563]" />
                        <div>
                          <p className="text-sm font-medium text-[#111827]">
                            ID Image
                          </p>
                          <p className="text-xs text-[#4B5563]">
                            {idCard.fileSize}
                          </p>
                        </div>
                      </div>
                      <button
                        disabled
                        title="Document download is not available yet"
                        className="text-gray-400 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <Download size={16} />
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="py-2 text-sm text-gray-400">
                    This customer has not submitted an identification card yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-sm text-[#4B5563] mb-1">{label}</p>
      <p className="text-sm font-medium text-[#161616]">{value}</p>
    </div>
  );
}

function IDField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-[#4B5563] mb-1">{label}</p>
      <p className="text-sm font-semibold text-[#161616]">{value}</p>
    </div>
  );
}

function PolicyRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-[#F3F4F6] pb-4">
      <p className="text-sm text-[#4B5563]">{label}</p>
      <p className="text-sm font-semibold text-[#161616] mt-1">{value}</p>
    </div>
  );
}
