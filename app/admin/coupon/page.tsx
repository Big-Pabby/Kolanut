"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  Search,
  BadgePercent,
  CircleCheck,
  ChevronDown,
} from "lucide-react";
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
import { adminCouponsByRecency, couponStats } from "@/lib/data/coupons";
import { formatAdminAmount, formatAdminDate } from "@/lib/data/admin";

const TABS = [
  { value: "all", label: "All Coupon Generated" },
  { value: "redeemed", label: "Coupon Redeem" },
  { value: "not_redeemed", label: "Coupon Not Redeem" },
] as const;

type TabValue = (typeof TABS)[number]["value"];

export default function AdminCouponPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabValue>("all");
  const [tabOpen, setTabOpen] = useState(false);
  const [search, setSearch] = useState("");

  const stats = useMemo(() => couponStats(), []);
  const coupons = useMemo(() => adminCouponsByRecency(), []);

  const counts = useMemo(
    () => ({
      all: stats.generated,
      redeemed: stats.redeemed,
      not_redeemed: stats.notRedeemed,
    }),
    [stats],
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
            value={String(stats.generated)}
          />
          <MetricCard
            icon={<CircleCheck className="w-5 h-5 text-green-600" />}
            iconBg="#F0FDF4"
            label="Redeemed Coupons"
            value={String(stats.redeemed)}
          />
          <MetricCard
            icon={<CircleCheck className="w-5 h-5 text-green-600" />}
            iconBg="#F0FDF4"
            label="Not Redeemed Coupons"
            value={String(stats.notRedeemed)}
          />
        </div>
      </div>

      {/* Table card */}
      <Card className="border border-[#F3F4F6] shadow-none rounded-[8px] overflow-hidden">
        <CardContent className="p-4 space-y-4">
          {/* Tabs + search */}
          <div className="flex flex-col lg:flex-row justify-between gap-3 py-4 border-b border-[#E5E7EB]">
            <div className="relative w-full lg:w-auto">
              <button
                onClick={() => setTabOpen((prev) => !prev)}
                className="flex items-center justify-between gap-3 w-full lg:w-auto px-4 h-11 rounded-lg border border-[#E5E7EB] bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#374151] whitespace-nowrap">
                    {TABS.find((t) => t.value === activeTab)?.label}
                  </span>
                  <span className="flex items-center justify-center min-w-[26px] h-6 px-1.5 rounded-full text-xs bg-[#FEF2F2] text-[#AF060D]">
                    {counts[activeTab]}
                  </span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform ${
                    tabOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {tabOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setTabOpen(false)}
                  />
                  <div className="absolute left-0 top-full z-20 mt-1 min-w-[240px] flex flex-col overflow-hidden bg-white border border-[#E5E7EB] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                    {TABS.map((tab) => {
                      const isActive = activeTab === tab.value;
                      return (
                        <button
                          key={tab.value}
                          onClick={() => {
                            setActiveTab(tab.value);
                            setTabOpen(false);
                          }}
                          className="flex items-center justify-between gap-2 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors"
                        >
                          <span
                            className={`whitespace-nowrap ${
                              isActive
                                ? "text-[#AF060D] font-semibold"
                                : "text-[#374151]"
                            }`}
                          >
                            {tab.label}
                          </span>
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
                </>
              )}
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
                      {formatAdminAmount(c.amount)}
                    </TableCell>
                    <TableCell className="py-4 text-sm text-gray-600">
                      {formatAdminDate(c.dateCreated)}
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
