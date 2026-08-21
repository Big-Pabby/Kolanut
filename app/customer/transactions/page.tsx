"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  CATEGORY_BADGE_CLASS,
  TRANSACTION_CATEGORIES,
  TRANSACTION_STATUSES,
  TRANSACTION_STATUS_CLASS,
  formatTransactionAmount,
  formatTransactionDate,
  transactionsByRecency,
  type TransactionKind,
} from "@/lib/data/transactions";

const ALL = "all";

const tabTriggerClass =
  "!px-4.5 py-2 text-sm font-medium rounded-[8px] border border-transparent data-[state=active]:border-[#AF060D] data-[state=active]:text-[#AF060D] data-[state=active]:bg-white data-[state=active]:font-semibold text-gray-500 transition-all";

const selectTriggerClass =
  "h-10 w-full sm:w-[190px] rounded-lg border-[#E5E7EB] text-sm text-[#374151] focus:ring-brand-red/30 focus:border-brand-red";

export default function TransactionsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TransactionKind>("premium");
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<string>(ALL);
  const [status, setStatus] = useState<string>(ALL);

  const rows = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return transactionsByRecency(activeTab).filter((row) => {
      const matchesQuery =
        !query ||
        row.paymentId.toLowerCase().includes(query) ||
        (row.policyNumber?.toLowerCase().includes(query) ?? false) ||
        row.product.toLowerCase().includes(query) ||
        row.category.toLowerCase().includes(query);

      const matchesCategory = category === ALL || row.category === category;
      const matchesStatus = status === ALL || row.status === status;

      return matchesQuery && matchesCategory && matchesStatus;
    });
  }, [activeTab, searchQuery, category, status]);

  const totalForTab = transactionsByRecency(activeTab).length;
  const hasFilters = !!searchQuery || category !== ALL || status !== ALL;

  const clearFilters = () => {
    setSearchQuery("");
    setCategory(ALL);
    setStatus(ALL);
  };

  const switchTab = (value: string) => {
    setActiveTab(value as TransactionKind);
    clearFilters();
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div className="border border-[#F3F4F6] bg-white p-4 rounded-[8px]">
          <h1 className="text-xl md:text-2xl font-heading font-bold text-gray-900 tracking-tight">
            Transactions
          </h1>
          <p className="text-sm text-[#6B7280] mt-0.5">
            Here is a list of all transactions
          </p>
        </div>

        {/* Table Card */}
        <Card className="border border-[#F3F4F6] shadow-none rounded-[8px] overflow-hidden">
          <CardContent className="p-4 space-y-4">
            {/* Tabs */}
            <Tabs
              value={activeTab}
              onValueChange={switchTab}
              className="max-w-full overflow-x-auto"
            >
              <TabsList className="bg-[#F9FAFB] gap-1 !p-1 rounded-[8px]">
                <TabsTrigger value="premium" className={tabTriggerClass}>
                  Premium Payments
                </TabsTrigger>
                <TabsTrigger value="claim" className={tabTriggerClass}>
                  Claim Settlement
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Search + filters */}
            <div className="flex flex-col gap-3 border-b border-[#E5E7EB] pb-4 lg:flex-row lg:items-center">
              <div className="relative w-full lg:max-w-[380px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by payment ID, policy number or product"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-10 text-sm border-[#E5E7EB] rounded-lg focus-visible:ring-brand-red/30 focus-visible:border-brand-red"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:ml-auto">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Insurance type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ALL}>All insurance types</SelectItem>
                    {TRANSACTION_CATEGORIES.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ALL}>All statuses</SelectItem>
                    {TRANSACTION_STATUSES.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {hasFilters && (
                  <Button
                    variant="ghost"
                    onClick={clearFilters}
                    className="h-10 gap-1.5 px-3 text-sm font-medium text-[#AF060D] hover:bg-red-50 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                    Clear
                  </Button>
                )}
              </div>
            </div>

            {/* Result count */}
            <p className="text-sm text-[#6B7280]">
              Showing {rows.length} of {totalForTab}{" "}
              {activeTab === "premium"
                ? "premium payments"
                : "claim settlements"}
            </p>

            {/* Table with horizontal scroll */}
            <div className="overflow-x-auto">
              <Table className="border border-[#F3F4F6] !rounded-[8px] min-w-[860px]">
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide py-3 pl-5">
                      Payment ID
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide py-3">
                      Policy Number
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
                    <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide py-3">
                      Status
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide py-3 pr-5">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center py-10 text-sm text-gray-400"
                      >
                        No transactions match your search or filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    rows.map((row) => (
                      <TableRow
                        key={row.paymentId}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <TableCell className="py-3.5 pl-5 text-sm font-semibold text-[#374151]">
                          {row.paymentId}
                        </TableCell>
                        <TableCell className="py-3.5 text-sm font-semibold text-[#AF060D]">
                          {row.policyNumber ?? (
                            <span className="font-normal text-gray-400">
                              Not issued yet
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="py-3.5">
                          <span
                            className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${CATEGORY_BADGE_CLASS[row.category]}`}
                          >
                            {row.category}
                          </span>
                          <p className="mt-1 text-xs text-gray-500">
                            {row.product}
                          </p>
                        </TableCell>
                        <TableCell className="py-3.5 text-sm text-gray-600 font-semibold whitespace-nowrap">
                          {formatTransactionDate(row.date)}
                        </TableCell>
                        <TableCell className="py-3.5 text-sm font-semibold text-gray-800 whitespace-nowrap">
                          {formatTransactionAmount(row.amount)}
                        </TableCell>
                        <TableCell className="py-3.5">
                          <span
                            className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${TRANSACTION_STATUS_CLASS[row.status]}`}
                          >
                            {row.status}
                          </span>
                        </TableCell>
                        <TableCell className="py-3.5 pr-5">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1.5 text-sm font-medium h-8 px-2"
                            onClick={() =>
                              router.push(
                                `/customer/transactions/${row.paymentId}`,
                              )
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
