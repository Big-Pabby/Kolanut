import { formatNaira } from "@/utils/textHelper";
import { type PremiumCategory } from "./premiums";

export const CLAIM_STATUSES = [
  "Claim Settled",
  "Under Review",
  "Settlement proposal",
  "Approved",
  "Rejected",
] as const;

export type ClaimStatus = (typeof CLAIM_STATUSES)[number];

export interface ClaimDocument {
  name: string;
  size: string;
}

export interface CustomerClaim {
  id: string;
  policyNumber: string;
  insuranceType: PremiumCategory;
  /** Amount claimed by the customer. */
  amount: number;
  /** ISO date the claim was filed, so the list can be sorted before formatting. */
  dateFiled: string;
  status: ClaimStatus;
  /** Amount actually paid out — present once the claim is settled. */
  settledAmount?: number;
  // Incident details
  incidentType: string;
  dateOfIncident: string;
  timeOfIncident: string;
  location: string;
  description: string;
  document?: ClaimDocument;
  /** Number of supporting image evidences uploaded. */
  imageCount: number;
}

export const CUSTOMER_CLAIMS: CustomerClaim[] = [
  {
    id: "CLM-007441",
    policyNumber: "KA-09795170",
    insuranceType: "Home & Property",
    amount: 480000,
    dateFiled: "2026-10-12",
    status: "Claim Settled",
    settledAmount: 250000,
    incidentType: "Theft/Break-in",
    dateOfIncident: "2025-05-14",
    timeOfIncident: "09:30",
    location: "Ozumba Mbadiwe Ave, Victoria Island, Lagos",
    description:
      "Noticed an issue at my residence involving damage to the property. A section of the property was damaged unexpectedly, resulting in damage to part of the building and some household items. I immediately inspected the affected area, took photographs of the damage, and secured the area to prevent the situation from getting worse.",
    document: { name: "police_report.pdf", size: "300 KB" },
    imageCount: 4,
  },
  {
    id: "CLM-007444",
    policyNumber: "KA-09795184",
    insuranceType: "Motor",
    amount: 15000,
    dateFiled: "2026-02-20",
    status: "Claim Settled",
    settledAmount: 15000,
    incidentType: "Minor Collision",
    dateOfIncident: "2026-02-11",
    timeOfIncident: "17:45",
    location: "Third Mainland Bridge, Lagos",
    description:
      "A distracted driver bumped into the rear of my vehicle in slow-moving traffic, damaging the bumper and tail light. No injuries were sustained. I exchanged details with the other driver and reported the incident.",
    document: { name: "accident_report.pdf", size: "245 KB" },
    imageCount: 3,
  },
  {
    id: "CLM-007442",
    policyNumber: "KA-09795263",
    insuranceType: "Life & Family",
    amount: 12000,
    dateFiled: "2026-04-10",
    status: "Claim Settled",
    settledAmount: 12000,
    incidentType: "Hospitalization",
    dateOfIncident: "2026-03-29",
    timeOfIncident: "08:15",
    location: "Reddington Hospital, Ikeja, Lagos",
    description:
      "Admitted for a short hospital stay following a sudden illness. Submitting the hospital bills and medical report in support of this claim.",
    document: { name: "medical_report.pdf", size: "410 KB" },
    imageCount: 2,
  },
  {
    id: "CLM-007445",
    policyNumber: "KA-09795241",
    insuranceType: "Motor",
    amount: 1500000,
    dateFiled: "2026-03-15",
    status: "Claim Settled",
    settledAmount: 900000,
    incidentType: "Accident",
    dateOfIncident: "2026-03-02",
    timeOfIncident: "13:20",
    location: "Lekki-Epe Expressway, Lagos",
    description:
      "Involved in a road traffic accident that caused significant damage to the front of the vehicle. The car was towed from the scene and assessed by an approved workshop.",
    document: { name: "tow_receipt.pdf", size: "188 KB" },
    imageCount: 4,
  },
  {
    id: "CLM-007460",
    policyNumber: "KA-09795226",
    insuranceType: "Home & Property",
    amount: 220000,
    dateFiled: "2026-05-02",
    status: "Under Review",
    incidentType: "Water Damage",
    dateOfIncident: "2026-04-27",
    timeOfIncident: "22:10",
    location: "15 Ring Road, Ibadan, Oyo",
    description:
      "A burst pipe overnight flooded part of the ground floor, damaging furniture and flooring. The water was shut off and the affected items documented.",
    document: { name: "plumber_invoice.pdf", size: "156 KB" },
    imageCount: 3,
  },
  {
    id: "CLM-007461",
    policyNumber: "KA-09795184",
    insuranceType: "Motor",
    amount: 340000,
    dateFiled: "2026-05-20",
    status: "Under Review",
    incidentType: "Theft",
    dateOfIncident: "2026-05-16",
    timeOfIncident: "02:40",
    location: "Admiralty Way, Lekki, Lagos",
    description:
      "Vehicle side mirrors and battery were stolen while parked overnight. Reported the theft at the nearest police station and obtained a report.",
    document: { name: "police_report.pdf", size: "298 KB" },
    imageCount: 2,
  },
  {
    id: "CLM-007458",
    policyNumber: "KA-09795170",
    insuranceType: "Home & Property",
    amount: 130000,
    dateFiled: "2026-01-15",
    status: "Approved",
    incidentType: "Fire",
    dateOfIncident: "2026-01-08",
    timeOfIncident: "19:05",
    location: "Ozumba Mbadiwe Ave, Victoria Island, Lagos",
    description:
      "A minor electrical fire in the kitchen damaged cabinets and appliances. The fire was contained quickly and the damage assessed by a technician.",
    document: { name: "assessment_report.pdf", size: "332 KB" },
    imageCount: 3,
  },
  {
    id: "CLM-007451",
    policyNumber: "KA-09795263",
    insuranceType: "Life & Family",
    amount: 60000,
    dateFiled: "2025-12-08",
    status: "Rejected",
    incidentType: "Medical Expense",
    dateOfIncident: "2025-11-30",
    timeOfIncident: "11:00",
    location: "Lagos",
    description:
      "Submitted a claim for a medical expense that, on review, fell outside the cover of the policy at the time of the incident.",
    imageCount: 1,
  },
];

export const CLAIM_STATUS_CLASS: Record<ClaimStatus, string> = {
  "Claim Settled": "bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]",
  "Under Review": "bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]",
  "Settlement proposal": "bg-[#F0F9FF] text-[#0369A1] border-[#BAE6FD]",
  Approved: "bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]",
  Rejected: "bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]",
};

/** Newest filed first. */
export const claimsByRecency = (): CustomerClaim[] =>
  [...CUSTOMER_CLAIMS].sort(
    (a, b) => Date.parse(b.dateFiled) - Date.parse(a.dateFiled),
  );

export const claimCountByStatus = (status: ClaimStatus): number =>
  CUSTOMER_CLAIMS.filter((claim) => claim.status === status).length;

/** Headline figures for the admin claims page, derived from the list. */
export const claimStats = () => ({
  total: CUSTOMER_CLAIMS.length,
  settled: claimCountByStatus("Claim Settled"),
  pending:
    claimCountByStatus("Under Review") +
    claimCountByStatus("Settlement proposal") +
    claimCountByStatus("Approved"),
  rejected: claimCountByStatus("Rejected"),
});

export const getClaimById = (id: string): CustomerClaim | undefined =>
  CUSTOMER_CLAIMS.find((claim) => claim.id === id);

/** Full reference shown on the detail page, e.g. "CLM-2026-007441". */
export const claimReference = (claim: CustomerClaim): string => {
  const year = new Date(claim.dateFiled).getFullYear();
  const number = claim.id.replace(/^CLM-/, "");
  return `CLM-${year}-${number}`;
};

export interface TimelineStep {
  label: string;
  date: string;
}

/** The activity timeline for a claim, up to its current status. */
export const buildClaimTimeline = (claim: CustomerClaim): TimelineStep[] => {
  const base = Date.parse(claim.dateFiled);
  const DAY = 86_400_000;
  const at = (days: number) => new Date(base + days * DAY).toISOString();

  const submitted: TimelineStep = { label: "Claim submitted", date: at(0) };
  const review: TimelineStep = { label: "Under Review", date: at(0) };
  const proposal: TimelineStep = { label: "Settlement proposal", date: at(1) };
  const approved: TimelineStep = { label: "Signed & Approved", date: at(1) };
  const discharge: TimelineStep = {
    label: "Discharge Voucher Issued",
    date: at(2),
  };
  const settled: TimelineStep = { label: "Claim Settled", date: at(3) };
  const rejected: TimelineStep = { label: "Rejected", date: at(2) };

  switch (claim.status) {
    case "Claim Settled":
      return [submitted, review, proposal, approved, discharge, settled];
    case "Approved":
      return [submitted, review, proposal, approved];
    case "Settlement proposal":
      return [submitted, review, proposal];
    case "Under Review":
      return [submitted, review];
    case "Rejected":
      return [submitted, review, rejected];
  }
};

export const formatClaimAmount = (amount: number) => formatNaira(amount);

/** Slash format for the list, e.g. "12/03/2026". */
export const formatClaimDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString("en-GB");

/** Dash format used on the detail page and timeline, e.g. "12-10-2026". */
export const formatClaimDateDMY = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString("en-GB").replace(/\//g, "-");

/** Long incident date, e.g. "14 May 2025". */
export const formatIncidentDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
