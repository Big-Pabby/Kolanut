import { formatNaira } from "@/utils/textHelper";
import {
  PREMIUM_CATEGORIES,
  type PremiumCategory,
  type PremiumStatus,
} from "./premiums";
import {
  type PaymentChannel,
  type TransactionKind,
  type TransactionStatus,
} from "./transactions";

export const ADMIN_CATEGORIES = PREMIUM_CATEGORIES;

export interface AdminPolicy {
  /** Null until the policy has been issued (e.g. payment still processing). */
  policyNumber: string | null;
  customer: string;
  product: string;
  category: PremiumCategory;
  premiumPaid: number;
  /** ISO date, so the list can be sorted before it is formatted. */
  datePurchased: string;
  expiryDate: string;
  status: PremiumStatus;
}

export const ADMIN_POLICIES: AdminPolicy[] = [
  {
    policyNumber: "KA-09795170",
    customer: "Mauteen Adeleke",
    product: "Tenant Policy Insurance",
    category: "Home & Property",
    premiumPaid: 26275,
    datePurchased: "2025-08-12",
    expiryDate: "2026-08-11",
    status: "Active",
  },
  {
    policyNumber: "KA-09795184",
    customer: "Mauteen Adeleke",
    product: "Comprehensive Auto Insurance",
    category: "Motor",
    premiumPaid: 50110,
    datePurchased: "2025-07-03",
    expiryDate: "2026-07-02",
    status: "Active",
  },
  {
    policyNumber: "KA-09795191",
    customer: "Chidi Okafor",
    product: "Homeowner Policy Insurance",
    category: "Home & Property",
    premiumPaid: 35110,
    datePurchased: "2025-07-28",
    expiryDate: "2026-07-27",
    status: "Active",
  },
  {
    policyNumber: null,
    customer: "Ngozi Eze",
    product: "Family Benefits Plan",
    category: "Life & Family",
    premiumPaid: 18000,
    datePurchased: "2025-06-21",
    expiryDate: "2026-06-20",
    status: "Processing",
  },
  {
    policyNumber: "KA-09795226",
    customer: "Mauteen Adeleke",
    product: "Landlord's Policy Insurance",
    category: "Home & Property",
    premiumPaid: 45010,
    datePurchased: "2025-03-09",
    expiryDate: "2026-03-08",
    status: "Active",
  },
  {
    policyNumber: "KA-09795238",
    customer: "Emeka Nwosu",
    product: "Third Party Autobase Insurance",
    category: "Motor",
    premiumPaid: 22110,
    datePurchased: "2025-02-14",
    expiryDate: "2026-02-13",
    status: "Active",
  },
  {
    policyNumber: "KA-09795241",
    customer: "Mauteen Adeleke",
    product: "Third Party Auto Insurance",
    category: "Motor",
    premiumPaid: 15110,
    datePurchased: "2024-11-18",
    expiryDate: "2025-11-17",
    status: "Expired",
  },
  {
    policyNumber: "KA-09795263",
    customer: "Mauteen Adeleke",
    product: "Term Life Plan Insurance",
    category: "Life & Family",
    premiumPaid: 32000,
    datePurchased: "2024-09-02",
    expiryDate: "2025-09-01",
    status: "Expired",
  },
  {
    policyNumber: "KA-09795277",
    customer: "Chidi Okafor",
    product: "Personal Accident Insurance",
    category: "Life & Family",
    premiumPaid: 12500,
    datePurchased: "2024-08-19",
    expiryDate: "2025-08-18",
    status: "Expired",
  },
];

export interface AdminTransaction {
  paymentId: string;
  /** Null until the policy has been issued. */
  policyNumber: string | null;
  customer: string;
  product: string;
  category: PremiumCategory;
  date: string;
  amount: number;
  status: TransactionStatus;
  channel: PaymentChannel;
  kind: TransactionKind;
}

export const ADMIN_TRANSACTIONS: AdminTransaction[] = [
  {
    paymentId: "TRX-100418",
    policyNumber: "KA-09795170",
    customer: "Mauteen Adeleke",
    product: "Tenant Policy Insurance",
    category: "Home & Property",
    date: "2025-08-12",
    amount: 26275,
    status: "Successful",
    channel: "Card",
    kind: "premium",
  },
  {
    paymentId: "TRX-100405",
    policyNumber: "KA-09795191",
    customer: "Chidi Okafor",
    product: "Homeowner Policy Insurance",
    category: "Home & Property",
    date: "2025-07-28",
    amount: 35110,
    status: "Successful",
    channel: "Bank Transfer",
    kind: "premium",
  },
  {
    paymentId: "TRX-100392",
    policyNumber: "KA-09795184",
    customer: "Mauteen Adeleke",
    product: "Comprehensive Auto Insurance",
    category: "Motor",
    date: "2025-07-03",
    amount: 50110,
    status: "Successful",
    channel: "Bank Transfer",
    kind: "premium",
  },
  {
    paymentId: "TRX-100377",
    policyNumber: null,
    customer: "Ngozi Eze",
    product: "Family Benefits Plan",
    category: "Life & Family",
    date: "2025-06-21",
    amount: 18000,
    status: "Pending",
    channel: "Card",
    kind: "premium",
  },
  {
    paymentId: "TRX-100341",
    policyNumber: "KA-09795226",
    customer: "Mauteen Adeleke",
    product: "Landlord's Policy Insurance",
    category: "Home & Property",
    date: "2025-03-09",
    amount: 45010,
    status: "Successful",
    channel: "USSD",
    kind: "premium",
  },
  {
    paymentId: "TRX-100310",
    policyNumber: "KA-09795238",
    customer: "Emeka Nwosu",
    product: "Third Party Autobase Insurance",
    category: "Motor",
    date: "2025-02-14",
    amount: 22110,
    status: "Successful",
    channel: "Card",
    kind: "premium",
  },
  {
    paymentId: "TRX-100298",
    policyNumber: "KA-09795241",
    customer: "Mauteen Adeleke",
    product: "Third Party Auto Insurance",
    category: "Motor",
    date: "2024-11-18",
    amount: 15110,
    status: "Failed",
    channel: "Card",
    kind: "premium",
  },
  {
    paymentId: "CLM-004411",
    policyNumber: "KA-09795184",
    customer: "Mauteen Adeleke",
    product: "Comprehensive Auto Insurance",
    category: "Motor",
    date: "2025-09-05",
    amount: 250000,
    status: "Successful",
    channel: "Bank Transfer",
    kind: "claim",
  },
  {
    paymentId: "CLM-004380",
    policyNumber: "KA-09795170",
    customer: "Mauteen Adeleke",
    product: "Tenant Policy Insurance",
    category: "Home & Property",
    date: "2025-08-30",
    amount: 80000,
    status: "Pending",
    channel: "Bank Transfer",
    kind: "claim",
  },
  {
    paymentId: "CLM-004302",
    policyNumber: "KA-09795191",
    customer: "Chidi Okafor",
    product: "Homeowner Policy Insurance",
    category: "Home & Property",
    date: "2025-05-14",
    amount: 500000,
    status: "Successful",
    channel: "Bank Transfer",
    kind: "claim",
  },
  {
    paymentId: "CLM-004265",
    policyNumber: "KA-09795277",
    customer: "Chidi Okafor",
    product: "Personal Accident Insurance",
    category: "Life & Family",
    date: "2025-01-27",
    amount: 120000,
    status: "Failed",
    channel: "Bank Transfer",
    kind: "claim",
  },
];

/** Newest first. */
export const adminPoliciesByRecency = () =>
  [...ADMIN_POLICIES].sort(
    (a, b) => Date.parse(b.datePurchased) - Date.parse(a.datePurchased),
  );

export const adminTransactionsByRecency = (kind: TransactionKind) =>
  ADMIN_TRANSACTIONS.filter((t) => t.kind === kind).sort(
    (a, b) => Date.parse(b.date) - Date.parse(a.date),
  );

export const formatAdminAmount = (amount: number) => formatNaira(amount);

export const formatAdminDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

/** Headline figures for the admin dashboard, derived from the lists above. */
export const adminStats = () => {
  const customers = new Set(ADMIN_POLICIES.map((policy) => policy.customer));
  const claims = ADMIN_TRANSACTIONS.filter((t) => t.kind === "claim");
  const collected = ADMIN_TRANSACTIONS.filter(
    (t) => t.kind === "premium" && t.status === "Successful",
  ).reduce((total, t) => total + t.amount, 0);

  return {
    policies: ADMIN_POLICIES.length,
    customers: customers.size,
    claims: claims.length,
    collected,
  };
};

export type KYCStatus = "Completed" | "Incomplete";

export interface AdminIdentityCard {
  idType: string;
  identificationNumber: string;
  /** ISO dates. */
  dateIssued: string;
  expiryDate: string;
  fileSize: string;
}

export interface AdminCustomer {
  id: number;
  name: string;
  email: string;
  phone: string;
  nin: string;
  street: string;
  state: string;
  country: string;
  kycStatus: KYCStatus;
  /** ISO date, so the list can be sorted before it is formatted. */
  onboardedDate: string;
  /** Only present once the customer has completed KYC. */
  identityCard?: AdminIdentityCard;
}

export const ADMIN_CUSTOMERS: AdminCustomer[] = [
  {
    id: 1,
    name: "Mauteen Adeleke",
    email: "mauteenadeleke@gmail.com",
    phone: "+234 812 345 6789",
    nin: "738593029482",
    street: "08 Johnson Street, Ikeja",
    state: "Lagos",
    country: "Nigeria",
    kycStatus: "Completed",
    onboardedDate: "2024-08-19",
    identityCard: {
      idType: "International Passport",
      identificationNumber: "DT89648802JN",
      dateIssued: "2021-11-11",
      expiryDate: "2031-11-10",
      fileSize: "300 KB",
    },
  },
  {
    id: 2,
    name: "Chidi Okafor",
    email: "chidi.okafor@gmail.com",
    phone: "+234 803 221 4477",
    nin: "221847390255",
    street: "14 Aba Road, GRA",
    state: "Rivers",
    country: "Nigeria",
    kycStatus: "Completed",
    onboardedDate: "2024-08-02",
    identityCard: {
      idType: "National ID",
      identificationNumber: "NIN-22184739025",
      dateIssued: "2020-04-02",
      expiryDate: "2030-04-01",
      fileSize: "412 KB",
    },
  },
  {
    id: 3,
    name: "Ngozi Eze",
    email: "ngozi.eze@yahoo.com",
    phone: "+234 907 884 1230",
    nin: "908312447761",
    street: "7 Nnamdi Close, Awka",
    state: "Anambra",
    country: "Nigeria",
    kycStatus: "Incomplete",
    onboardedDate: "2025-06-18",
  },
  {
    id: 4,
    name: "Emeka Nwosu",
    email: "emeka.nwosu@gmail.com",
    phone: "+234 815 660 9021",
    nin: "554120983377",
    street: "22 Ogui Road",
    state: "Enugu",
    country: "Nigeria",
    kycStatus: "Completed",
    onboardedDate: "2025-01-30",
    identityCard: {
      idType: "Driver's License",
      identificationNumber: "ENU-4471209",
      dateIssued: "2022-01-30",
      expiryDate: "2027-01-29",
      fileSize: "268 KB",
    },
  },
  {
    id: 5,
    name: "Aisha Bello",
    email: "aisha.bello@gmail.com",
    phone: "+234 706 445 8812",
    nin: "330984127755",
    street: "5 Ahmadu Bello Way",
    state: "Kaduna",
    country: "Nigeria",
    kycStatus: "Incomplete",
    onboardedDate: "2025-09-04",
  },
  {
    id: 6,
    name: "Tunde Balogun",
    email: "tunde.balogun@outlook.com",
    phone: "+234 810 993 6654",
    nin: "776120934488",
    street: "31 Adeniyi Jones Avenue",
    state: "Lagos",
    country: "Nigeria",
    kycStatus: "Completed",
    onboardedDate: "2025-05-11",
    identityCard: {
      idType: "Voter's Card",
      identificationNumber: "VC-77612093",
      dateIssued: "2019-05-11",
      expiryDate: "2029-05-10",
      fileSize: "355 KB",
    },
  },
];

/** How many policies a customer holds, counted off the policy list. */
export const policyCountFor = (customerName: string) =>
  ADMIN_POLICIES.filter((policy) => policy.customer === customerName).length;

export const formatPolicyCount = (count: number) =>
  count === 0 ? "No policy" : `${count} ${count === 1 ? "policy" : "policies"}`;

/** Most recently onboarded first. */
export const adminCustomersByRecency = () =>
  [...ADMIN_CUSTOMERS].sort(
    (a, b) => Date.parse(b.onboardedDate) - Date.parse(a.onboardedDate),
  );

export const getAdminCustomerById = (id: number) =>
  ADMIN_CUSTOMERS.find((customer) => customer.id === id);

/** Every policy belonging to a customer, newest first. */
export const policiesForCustomer = (customerName: string) =>
  adminPoliciesByRecency().filter((policy) => policy.customer === customerName);

export const getAdminPolicyByNumber = (policyNumber: string) =>
  ADMIN_POLICIES.find((policy) => policy.policyNumber === policyNumber);

export const getAdminCustomerByName = (name: string) =>
  ADMIN_CUSTOMERS.find((customer) => customer.name === name);
