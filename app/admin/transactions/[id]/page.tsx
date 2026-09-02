"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronDown, ChevronLeft, Download } from "lucide-react";
import VehicleDetailsFields from "@/components/customer/VehicleDetailsFields";
import {
  formatAdminAmount,
  formatAdminDate,
  getAdminCustomerByName,
  getAdminPolicyByNumber,
  getAdminTransactionByPaymentId,
} from "@/lib/data/admin";
import { getPremiumByPolicyNumber } from "@/lib/data/premiums";
import { TRANSACTION_STATUS_CLASS } from "@/lib/data/transactions";
import { useAdminAccess } from "@/lib/auth/useAdminAccess";
import { DocumentList } from "@/components/ui/document-list";

// ── Types ────────────────────────────────────────────────────────────────────

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

// ── Sub-components ───────────────────────────────────────────────────────────

function AccordionSection({
  title,
  children,
  defaultOpen = true,
}: AccordionSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-[#F3F4F6] rounded-[10px] overflow-hidden bg-[#FEFEFE] p-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left hover:bg-stone-50 pb-3 transition-colors"
      >
        <span className="text-base font-heading font-semibold text-stone-800 tracking-tight">
          {title}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-stone-400 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`transition-all duration-300 ease-in-out ${
          open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className=" border-t border-stone-100 pt-5">{children}</div>
      </div>
    </div>
  );
}

function FieldPair({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-[#4B5563] uppercase">{label}</span>
      <span className="text-sm text-[#161616]">{value}</span>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function TransactionDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { canDownload } = useAdminAccess();
  const paymentId = decodeURIComponent((params?.id as string) ?? "");
  const transaction = getAdminTransactionByPaymentId(paymentId);
  const customer = transaction
    ? getAdminCustomerByName(transaction.customer)
    : undefined;
  const policy = transaction?.policyNumber
    ? getAdminPolicyByNumber(transaction.policyNumber)
    : undefined;
  const premium = transaction?.policyNumber
    ? getPremiumByPolicyNumber(transaction.policyNumber)
    : undefined;

  const backButton = (
    <button
      onClick={() => router.push("/admin/transactions")}
      className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-800 transition-colors font-medium"
    >
      <ChevronLeft className="w-4 h-4" />
      Back to Transactions
    </button>
  );

  if (!transaction) {
    return (
      <div className="min-h-screen">
        <div className="pb-4">{backButton}</div>
        <div className="rounded-[8px] border border-[#F3F4F6] bg-white p-10 text-center">
          <h1 className="text-lg font-semibold text-stone-800">
            Transaction not found
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            We couldn&apos;t find a transaction with the ID {paymentId}.
          </p>
        </div>
      </div>
    );
  }

  const [firstName, ...rest] = transaction.customer.split(" ");

  return (
    <div className="min-h-screen">
      {/* Top Nav */}
      <div className="pb-4">{backButton}</div>

      <div className=" space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 p-4 bg-white border border-[#F3F4F6] rounded-[8px]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold font-heading tracking-tight">
                Transaction Details
              </h1>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${TRANSACTION_STATUS_CLASS[transaction.status]}`}
              >
                {transaction.status}
              </span>
            </div>
            <p className="text-sm text-stone-500 mt-1">
              Transaction ID:{" "}
              <span className="text-[#AF060D] font-semibold tracking-wide">
                {transaction.paymentId}
              </span>
            </p>
            <p className="text-sm text-stone-500 mt-1">
              {transaction.kind === "claim" ? "Claim" : "Premium payment"} via{" "}
              {transaction.channel}
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button
              disabled={!canDownload}
              title={
                canDownload ? undefined : "Your role cannot download documents"
              }
              className="flex items-center gap-2 px-4 py-2.5 border-1 border-[#AF060D] text-[#AF060D] text-sm font-semibold rounded-full hover:bg-rose-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              Download Receipt
            </button>
            <button
              disabled={!canDownload}
              title={
                canDownload ? undefined : "Your role cannot download documents"
              }
              className="flex items-center gap-2 px-4 py-2.5 bg-[#AF060D] text-white text-sm font-semibold rounded-full hover:bg-rose-700 transition-colors shadow-md shadow-rose-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              Download Policy
            </button>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
          {/* Left Column */}
          <div className="space-y-4 bg-white border border-[#F3F4F6] p-4 rounded-[10px]">
            {/* Customer Details */}
            <AccordionSection title="Personal Details">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                <FieldPair label="First Name" value={firstName} />
                <FieldPair label="Last Name" value={rest.join(" ") || "—"} />
                <FieldPair
                  label="Email Address"
                  value={customer?.email ?? "—"}
                />
                <FieldPair
                  label="Phone Number"
                  value={customer?.phone ?? "—"}
                />
                <FieldPair label="State" value={customer?.state ?? "—"} />
                <FieldPair label="Country" value={customer?.country ?? "—"} />
                <FieldPair label="NIN Number" value={customer?.nin ?? "—"} />
                <FieldPair label="Street" value={customer?.street ?? "—"} />
              </div>
            </AccordionSection>

            {premium?.vehicle && (
              <AccordionSection title="Vehicle Details">
                <VehicleDetailsFields vehicle={premium.vehicle} />
              </AccordionSection>
            )}

            <AccordionSection title="Transaction Documents">
              <DocumentList
                documents={[
                  {
                    name: "payment_receipt.pdf",
                    size: "210 KB",
                    url: "/documents/payment_receipt.pdf",
                  },
                  {
                    name: "transaction_summary.pdf",
                    size: "326 KB",
                    url: "/documents/transaction_summary.pdf",
                  },
                ]}
                emptyMessage="No transaction documents available."
              />
            </AccordionSection>
          </div>

          {/* Right Column — Transaction Overview */}
          <div className="space-y-4 bg-white border border-[#F3F4F6] p-4 rounded-[10px]">
            <AccordionSection title="Transaction Overview">
              <div className="grid grid-cols-1 gap-x-8 gap-y-5">
                <FieldPair label="Payment ID:" value={transaction.paymentId} />
                <FieldPair
                  label="Policy Number:"
                  value={transaction.policyNumber ?? "Not issued yet"}
                />
                <FieldPair
                  label="Policy Holder:"
                  value={transaction.customer}
                />
                <FieldPair
                  label="Insurance Type:"
                  value={`${transaction.category} Insurance`}
                />
                <FieldPair label="Product:" value={transaction.product} />
                <FieldPair
                  label="Amount:"
                  value={formatAdminAmount(transaction.amount)}
                />
                <FieldPair
                  label="Payment Channel:"
                  value={transaction.channel}
                />
                <FieldPair
                  label="Date:"
                  value={formatAdminDate(transaction.date)}
                />
                <FieldPair
                  label="Coverage Period:"
                  value={premium?.coveragePeriod ?? "Not applicable"}
                />
                <FieldPair label="Status:" value={transaction.status} />
                {policy && (
                  <FieldPair label="Policy Status:" value={policy.status} />
                )}
              </div>
            </AccordionSection>
          </div>
        </div>
      </div>
    </div>
  );
}
