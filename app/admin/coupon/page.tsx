"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Search, BadgePercent, CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

type CouponStatus = "redeemed" | "not_redeemed";

interface Coupon {
  id: string;
  code: string;
  generator: string;
  customer: string;
  insuranceType: string;
  amount: string;
  date: string;
  status: CouponStatus;
}

const coupons: Coupon[] = [
  {
    id: "1",
    code: "COP-E6LAA",
    generator: "Adeleke Mauteen",
    customer: "Noah Ibrahim",
    insuranceType: "Comprehensive Motor",
    amount: "₦13,567.00",
    date: "12/03/2024",
    status: "redeemed",
  },
  {
    id: "2",
    code: "COP-E6LAA",
    generator: "Adeleke Mauteen",
    customer: "Noah Ibrahim",
    insuranceType: "Landlord Policy Insurance",
    amount: "₦13,567.00",
    date: "12/03/2024",
    status: "redeemed",
  },
  {
    id: "3",
    code: "COP-E6LAA",
    generator: "Adeleke Mauteen",
    customer: "Noah Ibrahim",
    insuranceType: "Tenant Policy Insurance",
    amount: "₦1,313,567.00",
    date: "12/03/2024",
    status: "not_redeemed",
  },
  {
    id: "4",
    code: "COP-E6LAA",
    generator: "Adeleke Mauteen",
    customer: "Noah Ibrahim",
    insuranceType: "Home & Property",
    amount: "₦1,313,567.00",
    date: "12/03/2024",
    status: "not_redeemed",
  },
];

const TABS = [
  { value: "all", label: "All Coupon Generated" },
  { value: "redeemed", label: "Coupon Redeem" },
  { value: "not_redeemed", label: "Coupon Not Redeem" },
] as const;

type TabValue = (typeof TABS)[number]["value"];

export default function AdminCouponPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabValue>("all");
  const [search, setSearch] = useState("");

  const counts = useMemo(
    () => ({
      all: coupons.length,
      redeemed: coupons.filter((c) => c.status === "redeemed").length,
      not_redeemed: coupons.filter((c) => c.status === "not_redeemed").length,
    }),
    [],
  );

  const filtered = coupons.filter((c) => {
    const matchesTab = activeTab === "all" || c.status === activeTab;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      c.code.toLowerCase().includes(q) ||
      c.customer.toLowerCase().includes(q);
    return matchesTab && matchesSearch;
  });

  return (
    <div className="mx-auto space-y-6">
      {/* Header + metrics */}
      <div className="border border-[#F3F4F6] bg-white p-4 rounded-[8px] space-y-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900 tracking-tight">
            Coupon Management
          </h1>
          <p className="text-sm text-[#6B7280] mt-0.5">
            Track and manage coupons
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <MetricCard
            icon={<BadgePercent className="w-5 h-5 text-red-500" />}
            iconBg="#FEF2F2"
            label="Coupon Generated"
            value="1000"
          />
          <MetricCard
            icon={<CircleCheck className="w-5 h-5 text-green-600" />}
            iconBg="#F0FDF4"
            label="Redeemed Coupons"
            value="500"
          />
          <MetricCard
            icon={<CircleCheck className="w-5 h-5 text-green-600" />}
            iconBg="#F0FDF4"
            label="Not Redeemed Coupons"
            value="500"
          />
        </div>
      </div>

      {/* Table card */}
      <Card className="border border-[#F3F4F6] shadow-none rounded-[8px] overflow-hidden">
        <CardContent className="p-4 space-y-4">
          {/* Tabs + search */}
          <div className="flex flex-col lg:flex-row justify-between gap-3 py-4 border-b border-[#E5E7EB]">
            <div className="flex items-center gap-4 flex-wrap">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.value;
                return (
                  <button
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                      isActive ? "text-[#AF060D] font-semibold" : "text-gray-500"
                    }`}
                  >
                    <span className="whitespace-nowrap">{tab.label}</span>
                    <span
                      className={`flex items-center justify-center min-w-[26px] h-6 px-1.5 rounded-full text-xs ${
                        isActive
                          ? "bg-[#FEF2F2] text-[#AF060D]"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {counts[tab.value]}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="relative w-full lg:max-w-[420px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by coupon code or customer name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-11 text-sm border-[#E5E7EB] rounded-lg focus-visible:ring-brand-red/30 focus-visible:border-brand-red"
              />
            </div>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="text-xs font-semibold text-gray-500 py-3 pl-5">
                  Coupon Code
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 py-3">
                  Coupon Generator
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 py-3">
                  Customer Name
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 py-3">
                  Insurance Type
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 py-3">
                  Amount
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 py-3">
                  Date Created
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 py-3 pr-5">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-10 text-sm text-gray-400"
                  >
                    No coupons found.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((c) => (
                  <TableRow
                    key={c.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="py-4 pl-5 text-sm font-semibold text-[#374151]">
                      {c.code}
                    </TableCell>
                    <TableCell className="py-4 text-sm font-semibold text-[#374151]">
                      {c.generator}
                    </TableCell>
                    <TableCell className="py-4 text-sm text-[#374151]">
                      {c.customer}
                    </TableCell>
                    <TableCell className="py-4 text-sm font-semibold text-[#374151]">
                      {c.insuranceType}
                    </TableCell>
                    <TableCell className="py-4 text-sm font-semibold text-gray-800">
                      {c.amount}
                    </TableCell>
                    <TableCell className="py-4 text-sm text-gray-600">
                      {c.date}
                    </TableCell>
                    <TableCell className="py-4 pr-5">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1.5 text-sm font-medium h-8 px-2"
                        onClick={() => router.push(`/admin/coupon/${c.id}`)}
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function MetricCard({
  icon,
  iconBg,
  label,
  value,
}: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string;
}) {
  return (
    <Card className="border border-[#F3F4F6] p-6 shadow-none rounded-[8px]">
      <CardContent className="flex items-center gap-4 p-0">
        <div
          className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: iconBg }}
        >
          {icon}
        </div>
        <div>
          <p className="text-[#4B5563]">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-0.5">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
