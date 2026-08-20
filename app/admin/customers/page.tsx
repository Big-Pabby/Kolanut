"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, Search, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

type KYCStatus = "Completed" | "Incomplete";

interface Customer {
  id: number;
  name: string;
  email: string;
  policies: string;
  kycStatus: KYCStatus;
  onboardedDate: string;
}

const mockCustomers: Customer[] = [
  {
    id: 1,
    name: "Adeleke Mauteen",
    email: "mauteen11@gmail.com",
    policies: "2 Policies",
    kycStatus: "Completed",
    onboardedDate: "12/03/2024",
  },
  {
    id: 2,
    name: "Adeleke Mauteen",
    email: "mauteen11@gmail.com",
    policies: "No Policy",
    kycStatus: "Incomplete",
    onboardedDate: "12/03/2024",
  },
   {
    id: 3,
    name: "Adeleke Mauteen",
    email: "mauteen11@gmail.com",
    policies: "2 Policies",
    kycStatus: "Completed",
    onboardedDate: "12/03/2024",
  },
  {
    id: 4,
    name: "Adeleke Mauteen",
    email: "mauteen11@gmail.com",
    policies: "No Policy",
    kycStatus: "Incomplete",
    onboardedDate: "17/03/2024",
  },
  
   {
    id: 5,
    name: "Adeleke Mauteen",
    email: "mauteen11@gmail.com",
    policies: "1 Policies",
    kycStatus: "Completed",
    onboardedDate: "12/03/2024",
  },
];

const ITEMS_PER_PAGE = 10;

export default function CustomerManagementPage() {
  const [search, setSearch] = useState("");
  const [kycFilter, setKycFilter] = useState<"All" | KYCStatus>("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = mockCustomers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchesKyc = kycFilter === "All" || c.kycStatus === kycFilter;
    return matchesSearch && matchesKyc;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;

  return (
    <div className="min-h-screen ">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:items-start sm:justify-between gap-2 p-4 bg-white border border-[#F3F4F6] rounded-[8px]">
          <h1 className="text-2xl font-heading font-semibold text-gray-900 tracking-tight">
            Customer Management
          </h1>
          <p className="text-sm text-gray-500">
            Manage and monitor customer accounts
          </p>
        </div>
        <div className="bg-white border border-[#F3F4F6] rounded-[8px]">
          {/* Filters */}
          <div className="px-4 py-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            {/* KYC Status Filter */}
            <Select
              value={kycFilter}
              onValueChange={(value) =>
                setKycFilter(value as "All" | KYCStatus)
              }
            >
              <SelectTrigger className="w-48 text-gray-600 border-gray-200 bg-white hover:bg-gray-50">
                <SelectValue placeholder="KYC Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Incomplete">Incomplete</SelectItem>
              </SelectContent>
            </Select>

            {/* Search */}
            <div className="relative flex-1 ">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 border-gray-200 bg-white text-gray-700 placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-gray-300"
              />
            </div>
          </div>

          {/* Table */}
          <div className="">
            <Table>
              <TableHeader>
                <TableRow className="border-[#E5E7EB] bg-[#F9FAFB]">
                  <TableHead className="text-gray-500 font-medium text-sm  py-3 px-4 h-11">
                    Name
                  </TableHead>
                  <TableHead className="text-gray-500 font-medium text-sm py-3 px-4 h-11">
                    Email
                  </TableHead>
                  <TableHead className="text-gray-500 font-medium text-sm py-3 px-4 h-11">
                    Policies
                  </TableHead>
                  <TableHead className="text-gray-500 font-medium text-sm py-3 px-4 h-11">
                    KYC Status
                  </TableHead>
                  <TableHead className="text-gray-500 font-medium text-sm py-3 px-4 h-11">
                    Onboarded Date
                  </TableHead>
                  <TableHead className="text-gray-500 font-medium text-sm py-3 px-4 h-11">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((customer) => (
                  <TableRow
                    key={customer.id}
                    className="border-gray-100 hover:bg-gray-50/50 transition-colors"
                  >
                    <TableCell className="text-gray-800 font-semibold text-sm py-3 px-4 h-15.5">
                      {customer.name}
                    </TableCell>
                    <TableCell className="text-[#374151] font-medium text-sm py-3 px-4 h-15.5">
                      {customer.email}
                    </TableCell>
                    <TableCell className="text-gray-600 text-sm py-3 px-4 h-15.5">
                      {customer.policies}
                    </TableCell>
                    <TableCell className="py-3 px-4 h-15.5">
                      <KYCBadge status={customer.kycStatus} />
                    </TableCell>
                    <TableCell className="text-gray-600 text-sm py-3 px-4 h-15.5">
                      {customer.onboardedDate}
                    </TableCell>
                    <TableCell className="py-3 px-4 h-15.5">
                      <Link
                        href={`/admin/customers/${customer.id}`}
                        className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors group"
                      >
                        <Eye className="h-4 w-4 group-hover:scale-110 transition-transform" />
                        View
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="px-4 md:px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Showing{" "}
              {filtered.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0}{" "}
              to {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of{" "}
              {filtered.length} results
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 border-gray-200 text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 border-gray-200 text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KYCBadge({ status }: { status: KYCStatus }) {
  if (status === "Completed") {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
        Completed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-50 text-orange-600 border border-orange-200">
      Incomplete
    </span>
  );
}
