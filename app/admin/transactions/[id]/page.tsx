"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronLeft, Download } from "lucide-react";

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

function OverviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-stone-400 font-medium uppercase tracking-widest">
        {label}
      </span>
      <span className="text-sm font-semibold text-stone-800">{value}</span>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function TransactionDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen">
      {/* Top Nav */}
      <div className=" pb-4">
        <button
          onClick={() => router.push("/admin/transactions")}
          className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-800 transition-colors font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Transactions
        </button>
      </div>

      <div className=" space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 p-4 bg-white border border-[#F3F4F6] rounded-[8px]">
          <div>
            <h1 className="text-2xl font-bold font-heading tracking-tight">
              Transaction Details
            </h1>
            <p className="text-sm text-stone-500 mt-1">
              Transaction ID:{" "}
              <span className="text-[#AF060D] font-semibold tracking-wide">
                KA-09795170
              </span>
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button className="flex items-center gap-2 px-4 py-2.5 border-1 border-[#AF060D] text-[#AF060D] text-sm font-semibold rounded-full hover:bg-rose-50 transition-colors">
              <Download className="w-4 h-4" />
              Download Receipt
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#AF060D] text-white text-sm font-semibold rounded-full hover:bg-rose-700 transition-colors shadow-md shadow-rose-200">
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
                <FieldPair label="First Name" value="Mauteen" />
                <FieldPair label="Last Name" value="Adeleke" />
                <FieldPair label="Email Address" value="Mauteen11@gmail.com" />
                
                <FieldPair label="Phone Number" value="1234567890" />
                <FieldPair label="State" value="Lagos" />
                <FieldPair label="City/LGA" value="Ikeja" />
                <FieldPair label="Date of Birth" value="01/01/1990" />
                <FieldPair label="NIN Number" value="1234567890" />
                <FieldPair label="Street" value="45 Motunde street, Odo road" />
              </div>
            </AccordionSection>

         

          
          </div>

          {/* Right Column — Transaction Overview */}
          <div className="space-y-4 bg-white border border-[#F3F4F6] p-4 rounded-[10px]">
            <AccordionSection title="Transaction Overview">
              <div className="grid grid-cols-1 gap-x-8 gap-y-5">
                <FieldPair label="Policy Holder:" value="Mauteen Adeleke" />
                <FieldPair
                  label="Insurance Type:"
                  value="Home & Property Insurance"
                />
                <FieldPair label="Product:" value="Tenant Policy " />
                <FieldPair label="Premium Amount:" value="N10,000" />
                <FieldPair label="Date Purchased:" value="12/8/2025" />
                <FieldPair label="Coverage Period:" value="12 Months" />
              </div>
            </AccordionSection>
          </div>
        </div>
      </div>
    </div>
  );
}
