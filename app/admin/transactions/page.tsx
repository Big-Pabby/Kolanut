"use client";

import { useState } from "react";
import { Eye, Search, CreditCard, HandCoins } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const premiumPayments = [
  {
    id: "POL-00125",
    customer: "Adeleke Mauteen",
    type: "Home",
    date: "12/03/2024",
    amount: "₦13,567.00",
  },
  {
    id: "POL-00125",
    customer: "Adeleke Mauteen",
    type: "International Travel",
    date: "12/03/2024",
    amount: "₦13,567.00",
  },
  {
    id: "POL-00125",
    customer: "Adeleke Mauteen",
    type: "Marine (Cargo)",
    date: "12/03/2024",
    amount: "₦13,567.00",
  },
  {
    id: "POL-00125",
    customer: "Adeleke Mauteen",
    type: "Motor",
    date: "12/03/2024",
    amount: "₦1,313,567.00",
  },
  {
    id: "POL-00125",
    customer: "Adeleke Mauteen",
    type: "Home",
    date: "12/03/2024",
    amount: "₦1,313,567.00",
  },
];

const claimSettlements = [
  {
    id: "CLM-00201",
    customer: "Chidi Okafor",
    type: "Motor",
    date: "15/03/2024",
    amount: "₦250,000.00",
  },
  {
    id: "CLM-00202",
    customer: "Ngozi Eze",
    type: "Health",
    date: "16/03/2024",
    amount: "₦80,000.00",
  },
  {
    id: "CLM-00203",
    customer: "Emeka Nwosu",
    type: "Home",
    date: "17/03/2024",
    amount: "₦500,000.00",
  },
];

const insuranceTypeBadgeColor: Record<string, string> = {
  Home: "bg-blue-50 text-blue-700 border-blue-200",
  "International Travel": "bg-purple-50 text-purple-700 border-purple-200",
  "Marine (Cargo)": "bg-teal-50 text-teal-700 border-teal-200",
  Motor: "bg-orange-50 text-orange-700 border-orange-200",
  Health: "bg-green-50 text-green-700 border-green-200",
};

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState("premium");
  const [searchQuery, setSearchQuery] = useState("");

  const data = activeTab === "premium" ? premiumPayments : claimSettlements;

  const filtered = data.filter(
    (row) =>
      row.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.type.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen">
      <div className=" mx-auto space-y-6">
        {/* Header */}
        <div className="border border-[#F3F4F6] bg-white p-4 rounded-[8px] space-y-4">
          <div>
            <h1 className="text-2xl font-heading font-bold text-gray-900 tracking-tight">
              Transactions
            </h1>
            <p className="text-sm text-[#6B7280] mt-0.5">
              Track premium transactions and claim settlements
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="border border-[#F3F4F6] p-6 shadow-none rounded-[8px]">
              <CardContent className="flex items-center gap-4 p-0">
                <div className="w-10 h-10 rounded-lg bg-[#FEF2F2] flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className=" text-[#4B5563] tracking-wide">
                    Total Premium Transaction
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-0.5">
                    10,000
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-[#F3F4F6] p-6 shadow-none rounded-[8px]">
              <CardContent className="flex items-center gap-4 p-0">
                <div className="w-10 h-10 rounded-lg bg-[#FEF2F2] flex items-center justify-center">
                  <HandCoins className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className=" text-[#4B5563] tracking-wide">
                    Total Claims Paid
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-0.5">
                    30,000
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Table Card */}
        <Card className="border border-[#F3F4F6] shadow-none rounded-[8px] overflow-hidden">
          <CardContent className="p-4 space-y-4">
            {/* Tabs + Search */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 py-4 border-b border-[#E5E7EB] ">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-[#F9FAFB] gap-1 !p-1 rounded-[8px]">
                  <TabsTrigger
                    value="premium"
                    className="!px-4.5 py-2  text-sm font-medium rounded-[8px] border border-transparent data-[state=active]:border-[#AF060D] data-[state=active]:text-[#AF060D] data-[state=active]:bg-white data-[state=active]:font-semibold text-gray-500 transition-all"
                  >
                    Premium Payments
                  </TabsTrigger>
                  <TabsTrigger
                    value="claims"
                    className="!px-4.5 py-2  text-sm font-medium rounded-[8px] border border-transparent data-[state=active]:border-[#AF060D] data-[state=active]:text-[#AF060D] data-[state=active]:bg-white data-[state=active]:font-semibold text-gray-500 transition-all"
                  >
                    Claim Settlement
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="relative w-full max-w-[600px] ">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-full text-sm border-[#E5E7EB] rounded-lg text-base focus-visible:ring-brand-red/30 focus-visible:border-brand-red"
                />
              </div>
            </div>

            {/* Table */}
            <Table className="border border-[#F3F4F6] !rounded-[8px]">
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide py-3 pl-5">
                    Policy Number
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide py-3">
                    Customer
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide py-3">
                    Insurance Type
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide py-3">
                    Date
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide py-3">
                    Amount
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide py-3 pr-5">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-10 text-sm text-gray-400"
                    >
                      No transactions found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((row, idx) => (
                    <TableRow
                      key={idx}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="py-3.5 pl-5 text-sm font-semibold text-[#374151]">
                        {row.id}
                      </TableCell>
                      <TableCell className="py-3.5 font-semibold text-sm text-[#374151]">
                        {row.customer}
                      </TableCell>
                      <TableCell className="py-3.5 text-sm font-semibold text-[#374151]">
                         {row.type}
                      </TableCell>
                      <TableCell className="py-3.5 text-sm text-gray-600 font-semibold">
                        {row.date}
                      </TableCell>
                      <TableCell className="py-3.5 text-sm font-semibold text-gray-800">
                        {row.amount}
                      </TableCell>
                      <TableCell className="py-3.5 pr-5">
                        <Button
                          variant="ghost"
                          size="sm"
                          className=" gap-1.5 text-sm font-medium h-8 px-2"
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
    </div>
  );
}
