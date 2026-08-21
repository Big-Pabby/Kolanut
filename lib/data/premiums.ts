import { formatNaira } from "@/utils/textHelper";

export const PREMIUM_CATEGORIES = [
  "Home & Property",
  "Motor",
  "Life & Family",
] as const;

export type PremiumCategory = (typeof PREMIUM_CATEGORIES)[number];
export type PremiumStatus = "Active" | "Processing" | "Expired";

/** Only motor policies carry these. */
export interface VehicleDetails {
  plateNumber: string;
  vehicleAmount: number;
  bodyType: string;
  make: string;
  model: string;
  yearOfManufacture: string;
  color: string;
  engineNumber: string;
  chassisNumber: string;
}

export interface PurchasedPremium {
  policyNumber: string;
  product: string;
  category: PremiumCategory;
  premiumPaid: number;
  /** ISO date, so the list can be sorted before it is formatted. */
  datePurchased: string;
  expiryDate: string;
  coveragePeriod: string;
  status: PremiumStatus;
  vehicle?: VehicleDetails;
}

export const PURCHASED_PREMIUMS: PurchasedPremium[] = [
  {
    policyNumber: "KA-09795170",
    product: "Tenant Policy Insurance",
    category: "Home & Property",
    premiumPaid: 26275,
    datePurchased: "2025-08-12",
    expiryDate: "2026-08-11",
    coveragePeriod: "12 Months",
    status: "Active",
  },
  {
    policyNumber: "KA-09795184",
    product: "Comprehensive Auto Insurance",
    category: "Motor",
    premiumPaid: 50110,
    datePurchased: "2025-07-03",
    expiryDate: "2026-07-02",
    coveragePeriod: "12 Months",
    status: "Active",
    vehicle: {
      plateNumber: "AB124LA89",
      vehicleAmount: 100000,
      bodyType: "SUV",
      make: "Toyota",
      model: "Camry",
      yearOfManufacture: "2020",
      color: "Blue",
      engineNumber: "12EE34T5U",
      chassisNumber: "ABC-123XYZ",
    },
  },
  {
    policyNumber: "KA-09795226",
    product: "Landlord's Policy Insurance",
    category: "Home & Property",
    premiumPaid: 45010,
    datePurchased: "2025-03-09",
    expiryDate: "2026-03-08",
    coveragePeriod: "12 Months",
    status: "Active",
  },
  {
    policyNumber: "KA-09795241",
    product: "Third Party Auto Insurance",
    category: "Motor",
    premiumPaid: 15110,
    datePurchased: "2024-11-18",
    expiryDate: "2025-11-17",
    coveragePeriod: "12 Months",
    status: "Expired",
    vehicle: {
      plateNumber: "KJA772XR",
      vehicleAmount: 4500000,
      bodyType: "Saloon",
      make: "Honda",
      model: "Accord",
      yearOfManufacture: "2017",
      color: "Silver",
      engineNumber: "88HH21K9P",
      chassisNumber: "JHM-884UP2",
    },
  },
  {
    policyNumber: "KA-09795263",
    product: "Term Life Plan Insurance",
    category: "Life & Family",
    premiumPaid: 32000,
    datePurchased: "2024-09-02",
    expiryDate: "2025-09-01",
    coveragePeriod: "12 Months",
    status: "Expired",
  },
];

/** Most recently purchased first. */
export const premiumsByRecency = (): PurchasedPremium[] =>
  [...PURCHASED_PREMIUMS].sort(
    (a, b) => Date.parse(b.datePurchased) - Date.parse(a.datePurchased),
  );

export const formatPremiumAmount = (amount: number) => formatNaira(amount);

export const formatPremiumDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export const PREMIUM_STATUS_CLASS: Record<PremiumStatus, string> = {
  Active: "bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]",
  Processing: "bg-[#F0F9FF] text-[#0369A1] border-[#BAE6FD]",
  Expired: "bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]",
};

/** Dummy policyholder — every policy in this mock belongs to the same customer. */
export const POLICY_HOLDER = {
  firstName: "Mauteen",
  lastName: "Adeleke",
  email: "mauteenadeleke@gmail.com",
  phone: "+234 812 345 6789",
  nin: "738593029482",
  dateOfBirth: "15/05/1990",
  state: "Lagos",
  city: "Ikeja",
  address: "08 Johnson Street, Ikeja, Lagos State",
};

export const policyHolderName = () =>
  `${POLICY_HOLDER.firstName} ${POLICY_HOLDER.lastName}`;

export const getPremiumByPolicyNumber = (
  policyNumber: string,
): PurchasedPremium | undefined =>
  PURCHASED_PREMIUMS.find((premium) => premium.policyNumber === policyNumber);
