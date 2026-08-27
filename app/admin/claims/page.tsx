"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  Search,
  ChevronLeft,
  ChevronRight,
  Shield,
  CircleCheck,
  Clock,
  XCircle,
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
import {
  CLAIM_STATUSES,
  claimCountByStatus,
  claimStats,
  claimsByRecency,
  formatClaimAmount,
  formatClaimDate,
  type ClaimStatus,
} from "@/lib/data/claims";

export default function AdminClaimsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ClaimStatus>("Claim Settled");
  const [search, setSearch] = useState("");

  const stats = useMemo(() => claimStats(), []);

  const rows = useMemo(() => {
    const query = search.trim().toLowerCase();
    return claimsByRecency().filter((claim) => {
      if (claim.status !== activeTab) return false;
      return (
        !query ||
        claim.id.toLowerCase().includes(query) ||
        claim.policyNumber.toLowerCase().includes(query)
      );
    });
  }, [activeTab, search]);

  return (
    <div className="mx-auto space-y-6">
      {/* Header */}
      <div className="border border-[#F3F4F6] bg-white p-4 md:p-6 rounded-[8px]">
        <h1 className="text-2xl font-heading font-bold text-gray-900 tracking-tight">
          Claims
        </h1>
        <p className="text-sm text-[#6B7280] mt-0.5">Manage and monitor claims</p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={<Shield className="w-5 h-5 text-[#2563EB]" />}
          iconBg="#EFF6FF"
          label="Total Claim"
          value={stats.total}
        />
        <MetricCard
          icon={<CircleCheck className="w-5 h-5 text-[#15803D]" />}
          iconBg="#F0FDF4"
          label="Settled Claims"
          value={stats.settled}
        />
        <MetricCard
          icon={<Clock className="w-5 h-5 text-[#B45309]" />}
          iconBg="#FFFBEB"
          label="Pending Claims"
          value={stats.pending}
        />
        <MetricCard
          icon={<XCircle className="w-5 h-5 text-[#B91C1C]" />}
          iconBg="#FEF2F2"
          label="Rejected Claims"
          value={stats.rejected}
        />
      </div>

      {/* Table card */}
      <Card className="border border-[#F3F4F6] shadow-none rounded-[8px] overflow-hidden">
        <CardContent className="p-4 space-y-4">
          {/* Tabs + search */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-[#E5E7EB] pb-4">
            <div className="flex items-center gap-3 lg:gap-5 overflow-x-auto">
              {CLAIM_STATUSES.map((status) => {
                const isActive = activeTab === status;
                const count = claimCountByStatus(status);
                return (
                  <button
                    key={status}
                    onClick={() => setActiveTab(status)}
                    className={`flex items-center gap-2 whitespace-nowrap text-sm font-medium transition-colors ${
                      isActive
                        ? "text-[#AF060D] font-semibold"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {status}
                    <span
                      className={`flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full text-xs ${
                        isActive
                          ? "bg-[#FEF2F2] text-[#AF060D]"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="relative w-full lg:max-w-[320px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="search by claim ID or Policy number"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-10 text-sm border-[#E5E7EB] rounded-lg focus-visible:ring-brand-red/30 focus-visible:border-brand-red"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table className="min-w-[820px]">
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="text-xs font-semibold text-gray-500 py-3 pl-5">
                    Claim ID
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-gray-500 py-3">
                    Policy number
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-gray-500 py-3">
                    Insurance Type
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-gray-500 py-3">
                    Date Filled
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-gray-500 py-3">
                    Amount
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-gray-500 py-3 pr-5">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-12 text-sm text-gray-400"
                    >
                      No claims under {activeTab}.
                    </TableCell>
                  </TableRow>
                ) : (
                  rows.map((claim) => (
                    <TableRow
                      key={claim.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="py-4 pl-5 text-sm font-semibold text-[#374151]">
                        {claim.id}
                      </TableCell>
                      <TableCell className="py-4 text-sm text-[#374151]">
                        {claim.policyNumber}
                      </TableCell>
                      <TableCell className="py-4 text-sm text-[#374151]">
                        {claim.insuranceType}
                      </TableCell>
                      <TableCell className="py-4 text-sm text-gray-600 whitespace-nowrap">
                        {formatClaimDate(claim.dateFiled)}
                      </TableCell>
                      <TableCell className="py-4 text-sm font-semibold text-gray-800 whitespace-nowrap">
                        {formatClaimAmount(claim.amount)}
                      </TableCell>
                      <TableCell className="py-4 pr-5">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1.5 text-sm font-medium h-8 px-2"
                          onClick={() =>
                            router.push(`/admin/claims/${claim.id}`)
                          }
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
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-2">
            <p className="text-sm text-[#6B7280]">
              Showing {rows.length === 0 ? 0 : 1} to {rows.length} of{" "}
              {rows.length} results
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled
                className="flex items-center justify-center w-9 h-9 rounded-lg border border-[#E5E7EB] text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled
                className="flex items-center justify-center w-9 h-9 rounded-lg border border-[#E5E7EB] text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
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
  value: number;
}) {
  return (
    <Card className="border border-[#F3F4F6] p-6 shadow-none rounded-[8px]">
      <CardContent className="flex flex-col gap-4 p-0">
        <div
          className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: iconBg }}
        >
          {icon}
        </div>
        <div>
          <p className="text-[#4B5563] text-sm">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-0.5">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
