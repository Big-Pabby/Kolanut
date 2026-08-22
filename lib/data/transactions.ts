import { formatNaira } from "@/utils/textHelper";
import { PREMIUM_CATEGORIES, type PremiumCategory } from "./premiums";

export type TransactionKind = "premium" | "claim";
export type TransactionStatus = "Successful" | "Pending" | "Failed";
export type PaymentChannel = "Card" | "Bank Transfer" | "USSD";

export interface CustomerTransaction {
  paymentId: string;
  /** Null until the policy has been issued (e.g. payment still processing). */
  policyNumber: string | null;
  product: string;
  category: PremiumCategory;
  /** ISO date, so the list can be sorted before it is formatted. */
  date: string;
  amount: number;
  status: TransactionStatus;
  channel: PaymentChannel;
  kind: TransactionKind;
}

export const CUSTOMER_TRANSACTIONS: CustomerTransaction[] = [
  {
    paymentId: "TRX-100418",
    policyNumber: "KA-09795170",
    product: "Tenant Policy Insurance",
    category: "Home & Property",
    date: "2025-08-12",
    amount: 26275,
    status: "Successful",
    channel: "Card",
    kind: "premium",
  },
  {
    paymentId: "TRX-100392",
    policyNumber: "KA-09795184",
    product: "Comprehensive Auto Insurance",
    category: "Motor",
    date: "2025-07-03",
    amount: 50110,
    status: "Successful",
    channel: "Bank Transfer",
    kind: "premium",
  },
  // {
  //   paymentId: "TRX-100377",
  //   policyNumber: null,
  //   product: "Family Benefits Plan",
  //   category: "Life & Family",
  //   date: "2025-06-21",
  //   amount: 18000,
  //   status: "Pending",
  //   channel: "Card",
  //   kind: "premium",
  // },
  {
    paymentId: "TRX-100341",
    policyNumber: "KA-09795226",
    product: "Landlord's Policy Insurance",
    category: "Home & Property",
    date: "2025-03-09",
    amount: 45010,
    status: "Successful",
    channel: "USSD",
    kind: "premium",
  },
  // {
  //   paymentId: "TRX-100298",
  //   policyNumber: "KA-09795241",
  //   product: "Third Party Auto Insurance",
  //   category: "Motor",
  //   date: "2024-11-18",
  //   amount: 15110,
  //   status: "Failed",
  //   channel: "Card",
  //   kind: "premium",
  // },
  {
    paymentId: "TRX-100255",
    policyNumber: "KA-09795263",
    product: "Term Life Plan Insurance",
    category: "Life & Family",
    date: "2024-09-02",
    amount: 32000,
    status: "Successful",
    channel: "Bank Transfer",
    kind: "premium",
  },
  {
    paymentId: "CLM-004411",
    policyNumber: "KA-09795184",
    product: "Comprehensive Auto Insurance",
    category: "Motor",
    date: "2025-09-05",
    amount: 250000,
    status: "Successful",
    channel: "Bank Transfer",
    kind: "claim",
  },
  // {
  //   paymentId: "CLM-004380",
  //   policyNumber: "KA-09795170",
  //   product: "Tenant Policy Insurance",
  //   category: "Home & Property",
  //   date: "2025-08-30",
  //   amount: 80000,
  //   status: "Pending",
  //   channel: "Bank Transfer",
  //   kind: "claim",
  // },
  {
    paymentId: "CLM-004302",
    policyNumber: "KA-09795226",
    product: "Landlord's Policy Insurance",
    category: "Home & Property",
    date: "2025-05-14",
    amount: 500000,
    status: "Successful",
    channel: "Bank Transfer",
    kind: "claim",
  },
  // {
  //   paymentId: "CLM-004265",
  //   policyNumber: "KA-09795263",
  //   product: "Term Life Plan Insurance",
  //   category: "Life & Family",
  //   date: "2025-01-27",
  //   amount: 120000,
  //   status: "Failed",
  //   channel: "Bank Transfer",
  //   kind: "claim",
  // },
];

export const TRANSACTION_STATUSES: TransactionStatus[] = [
  "Successful",
  "Pending",
  "Failed",
];

export const TRANSACTION_CATEGORIES = PREMIUM_CATEGORIES;

export const TRANSACTION_STATUS_CLASS: Record<TransactionStatus, string> = {
  Successful: "bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]",
  Pending: "bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]",
  Failed: "bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]",
};

export const CATEGORY_BADGE_CLASS: Record<PremiumCategory, string> = {
  "Home & Property": "bg-blue-50 text-blue-700 border-blue-200",
  Motor: "bg-orange-50 text-orange-700 border-orange-200",
  "Life & Family": "bg-purple-50 text-purple-700 border-purple-200",
};

/** Newest first. */
export const transactionsByRecency = (kind: TransactionKind) =>
  CUSTOMER_TRANSACTIONS.filter((t) => t.kind === kind).sort(
    (a, b) => Date.parse(b.date) - Date.parse(a.date),
  );

export const formatTransactionAmount = (amount: number) => formatNaira(amount);

export const formatTransactionDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export const getTransactionByPaymentId = (
  paymentId: string,
): CustomerTransaction | undefined =>
  CUSTOMER_TRANSACTIONS.find(
    (transaction) => transaction.paymentId === paymentId,
  );
