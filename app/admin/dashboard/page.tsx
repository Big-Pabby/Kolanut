"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight,
  Eye,
  FileText,
  Users,
  HandCoins,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  adminPoliciesByRecency,
  adminStats,
  formatAdminAmount,
  formatAdminDate,
} from "@/lib/data/admin";
import { PREMIUM_STATUS_CLASS } from "@/lib/data/premiums";
import { CATEGORY_BADGE_CLASS } from "@/lib/data/transactions";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <Card className="border border-[#F3F4F6] shadow-none rounded-[12px]">
      <CardContent className="p-5 flex items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-[10px] bg-[#FDECEE] text-[#AF060D] shrink-0">
          {icon}
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-[#6B7280]">{label}</span>
          <span className="text-2xl font-semibold text-[#111827] mt-0.5">
            {value}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

// The five most recent policies; the full list lives on /admin/policies.
const recentPolicies = adminPoliciesByRecency().slice(0, 5);
const stats = adminStats();

export default function AdminDashboardPage() {
  const router = useRouter();

  const handleViewPolicy = (id: string) => {
    router.push(`/admin/policies/${id}`);
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Overview */}
      <Card className="border border-[#F3F4F6] shadow-none rounded-[12px]">
        <CardContent className="p-5 space-y-4">
          <h2 className="text-lg font-semibold text-[#111827]">
            Dashboard Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={<FileText className="w-5 h-5" />}
              label="Policies"
              value={String(stats.policies)}
            />
            <StatCard
              icon={<Users className="w-5 h-5" />}
              label="Customers"
              value={String(stats.customers)}
            />
            <StatCard
              icon={<HandCoins className="w-5 h-5" />}
              label="Claims"
              value={String(stats.claims)}
            />
            <StatCard
              icon={<Wallet className="w-5 h-5" />}
              label="Premiums processed"
              value={formatAdminAmount(stats.collected)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Recent Policies */}
      <Card className="border border-[#F3F4F6] shadow-none rounded-[12px]">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#111827]">
              Recent Polices
            </h2>
            <Link
              href="/admin/policies"
              className="flex items-center gap-1 text-sm font-semibold text-[#AF060D] hover:text-[#AF060D]/80 transition-colors"
            >
              See All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Scrolls instead of overflowing on small screens */}
          <div className="overflow-x-auto">
            <Table className="min-w-[900px]">
              <TableHeader>
                <TableRow className="bg-[#F9FAFB] hover:bg-[#F9FAFB] border-b border-[#F3F4F6]">
                  <TableHead className="text-sm font-medium text-[#6B7280] py-3 pl-5">
                    Policy Number
                  </TableHead>
                  <TableHead className="text-sm font-medium text-[#6B7280] py-3">
                    Customer
                  </TableHead>
                  <TableHead className="text-sm font-medium text-[#6B7280] py-3">
                    Insurance Type
                  </TableHead>
                  <TableHead className="text-sm font-medium text-[#6B7280] py-3">
                    Date
                  </TableHead>
                  <TableHead className="text-sm font-medium text-[#6B7280] py-3">
                    Amount
                  </TableHead>
                  <TableHead className="text-sm font-medium text-[#6B7280] py-3">
                    Status
                  </TableHead>
                  <TableHead className="text-sm font-medium text-[#6B7280] py-3 pr-5">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPolicies.map((row) => (
                  <TableRow
                    key={
                      row.policyNumber ?? `${row.customer}-${row.datePurchased}`
                    }
                    className="hover:bg-gray-50 transition-colors border-b border-[#F3F4F6] last:border-0"
                  >
                    <TableCell className="py-4 pl-5 text-sm font-semibold text-[#AF060D]">
                      {row.policyNumber ?? (
                        <span className="font-normal text-gray-400">
                          Not issued yet
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="py-4 text-sm text-[#374151] whitespace-nowrap">
                      {row.customer}
                    </TableCell>
                    <TableCell className="py-4">
                      <span
                        className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${CATEGORY_BADGE_CLASS[row.category]}`}
                      >
                        {row.category}
                      </span>
                      <p className="mt-1 text-xs text-gray-500">
                        {row.product}
                      </p>
                    </TableCell>
                    <TableCell className="py-4 text-sm text-[#374151] whitespace-nowrap">
                      {formatAdminDate(row.datePurchased)}
                    </TableCell>
                    <TableCell className="py-4 text-sm font-semibold text-[#374151] whitespace-nowrap">
                      {formatAdminAmount(row.premiumPaid)}
                    </TableCell>
                    <TableCell className="py-4">
                      <span
                        className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${PREMIUM_STATUS_CLASS[row.status]}`}
                      >
                        {row.status}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 pr-5">
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={!row.policyNumber}
                        title={
                          row.policyNumber
                            ? undefined
                            : "Available once the policy is issued"
                        }
                        className="gap-1.5 text-sm font-medium h-8 px-2 text-[#374151] hover:text-[#AF060D]"
                        onClick={() =>
                          handleViewPolicy(row.policyNumber as string)
                        }
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
