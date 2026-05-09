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

const recentPolicies = [
  {
    id: "POL-00125",
    customer: "Adeleke Mauteen",
    type: "Comprehensive Motor",
    date: "12/03/2024",
    amount: "₦13,567.00",
  },
  {
    id: "POL-00125",
    customer: "Adeleke Mauteen",
    type: "Landlord Policy Insurance",
    date: "12/03/2024",
    amount: "₦13,567.00",
  },
  {
    id: "POL-00125",
    customer: "Adeleke Mauteen",
    type: "Tenant Policy Insurance",
    date: "12/03/2024",
    amount: "₦1,313,567.00",
  },
  {
    id: "POL-00125",
    customer: "Adeleke Mauteen",
    type: "Home & Property",
    date: "12/03/2024",
    amount: "₦1,313,567.00",
  },
];

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
              label="Policy"
              value="2000"
            />
            <StatCard
              icon={<Users className="w-5 h-5" />}
              label="Customers"
              value="1200"
            />
            <StatCard
              icon={<HandCoins className="w-5 h-5" />}
              label="Claims"
              value="30"
            />
            <StatCard
              icon={<Wallet className="w-5 h-5" />}
              label="Payment"
              value="30,000,000"
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

          <Table>
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
                <TableHead className="text-sm font-medium text-[#6B7280] py-3 pr-5">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentPolicies.map((row, idx) => (
                <TableRow
                  key={idx}
                  className="hover:bg-gray-50 transition-colors border-b border-[#F3F4F6] last:border-0"
                >
                  <TableCell className="py-4 pl-5 text-sm text-[#374151]">
                    {row.id}
                  </TableCell>
                  <TableCell className="py-4 text-sm text-[#374151]">
                    {row.customer}
                  </TableCell>
                  <TableCell className="py-4 text-sm text-[#374151]">
                    {row.type}
                  </TableCell>
                  <TableCell className="py-4 text-sm text-[#374151]">
                    {row.date}
                  </TableCell>
                  <TableCell className="py-4 text-sm text-[#374151]">
                    {row.amount}
                  </TableCell>
                  <TableCell className="py-4 pr-5">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1.5 text-sm font-medium h-8 px-2 text-[#374151] hover:text-[#AF060D]"
                      onClick={() => handleViewPolicy(row.id)}
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
