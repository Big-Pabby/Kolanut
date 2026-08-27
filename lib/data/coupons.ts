export type CouponStatus = "redeemed" | "not_redeemed";

export interface AdminCoupon {
  id: string;
  code: string;
  generator: string;
  customer: string;
  /** One of the three supported insurance categories. */
  insuranceType: string;
  product: string;
  amount: number;
  /** ISO date, so the list can be sorted before it is formatted. */
  dateCreated: string;
  status: CouponStatus;
  /** Issued only once the coupon has been redeemed. Links to a purchased premium. */
  policyNumber?: string;
  generatorEmail: string;
  generatorPhone: string;
  customerEmail: string;
  customerPhone: string;
  state: string;
  city: string;
  dateOfBirth: string;
  nin: string;
  address: string;
  coveragePeriod: string;
}

export const ADMIN_COUPONS: AdminCoupon[] = [
  {
    id: "1",
    code: "CPN-4F8A2K",
    generator: "Mauteen Adeleke",
    customer: "Noah Ibrahim",
    insuranceType: "Motor Insurance",
    product: "Comprehensive Auto Insurance",
    amount: 50110,
    dateCreated: "2025-08-14",
    status: "redeemed",
    policyNumber: "KA-09795184",
    generatorEmail: "mauteenadeleke@gmail.com",
    generatorPhone: "+234 812 345 6789",
    customerEmail: "noah.ibrahim@gmail.com",
    customerPhone: "+234 809 111 2233",
    state: "Lagos",
    city: "Lekki",
    dateOfBirth: "12/03/1992",
    nin: "456789012345",
    address: "21 Admiralty Way, Lekki, Lagos State",
    coveragePeriod: "12 Months",
  },
  {
    id: "2",
    code: "CPN-7QL9XM",
    generator: "Chidi Okafor",
    customer: "Fatima Sani",
    insuranceType: "Home & Property Insurance",
    product: "Tenant Policy Insurance",
    amount: 26275,
    dateCreated: "2025-07-30",
    status: "redeemed",
    policyNumber: "KA-09795170",
    generatorEmail: "chidi.okafor@gmail.com",
    generatorPhone: "+234 803 221 4477",
    customerEmail: "fatima.sani@gmail.com",
    customerPhone: "+234 802 556 7788",
    state: "Abuja (FCT)",
    city: "Garki",
    dateOfBirth: "28/09/1988",
    nin: "567890123456",
    address: "4 Gimbiya Street, Garki, Abuja",
    coveragePeriod: "12 Months",
  },
  {
    id: "3",
    code: "CPN-2WD6RT",
    generator: "Aisha Bello",
    customer: "Ibrahim Musa",
    insuranceType: "Life & Family Insurance",
    product: "Term Life Plan Insurance",
    amount: 32000,
    dateCreated: "2025-06-18",
    status: "redeemed",
    policyNumber: "KA-09795263",
    generatorEmail: "aisha.bello@gmail.com",
    generatorPhone: "+234 706 445 8812",
    customerEmail: "ibrahim.musa@yahoo.com",
    customerPhone: "+234 706 334 1199",
    state: "Kano",
    city: "Nassarawa",
    dateOfBirth: "05/01/1985",
    nin: "678901234567",
    address: "9 Zoo Road, Kano",
    coveragePeriod: "12 Months",
  },
  {
    id: "4",
    code: "CPN-9HK3PV",
    generator: "Tunde Balogun",
    customer: "Grace Adeyemi",
    insuranceType: "Home & Property Insurance",
    product: "Landlord's Policy Insurance",
    amount: 45010,
    dateCreated: "2025-05-22",
    status: "redeemed",
    policyNumber: "KA-09795226",
    generatorEmail: "tunde.balogun@outlook.com",
    generatorPhone: "+234 810 993 6654",
    customerEmail: "grace.adeyemi@gmail.com",
    customerPhone: "+234 811 220 4466",
    state: "Oyo",
    city: "Ibadan",
    dateOfBirth: "17/07/1995",
    nin: "789012345678",
    address: "15 Ring Road, Ibadan",
    coveragePeriod: "12 Months",
  },
  {
    id: "5",
    code: "CPN-6VM4DK",
    generator: "Mauteen Adeleke",
    customer: "Peter Nnamdi",
    insuranceType: "Motor Insurance",
    product: "Third Party Auto Insurance",
    amount: 15110,
    dateCreated: "2025-04-10",
    status: "redeemed",
    policyNumber: "KA-09795241",
    generatorEmail: "mauteenadeleke@gmail.com",
    generatorPhone: "+234 812 345 6789",
    customerEmail: "peter.nnamdi@gmail.com",
    customerPhone: "+234 810 663 9922",
    state: "Anambra",
    city: "Onitsha",
    dateOfBirth: "09/08/1990",
    nin: "123450987622",
    address: "2 New Market Road, Onitsha",
    coveragePeriod: "12 Months",
  },
  {
    id: "6",
    code: "CPN-5NB8ZC",
    generator: "Emeka Nwosu",
    customer: "Blessing Obi",
    insuranceType: "Motor Insurance",
    product: "Third Party Autobase Insurance",
    amount: 22110,
    dateCreated: "2025-03-05",
    status: "not_redeemed",
    generatorEmail: "emeka.nwosu@gmail.com",
    generatorPhone: "+234 815 660 9021",
    customerEmail: "blessing.obi@gmail.com",
    customerPhone: "+234 803 447 2200",
    state: "Rivers",
    city: "Port Harcourt",
    dateOfBirth: "22/11/1991",
    nin: "890123456789",
    address: "7 Aba Road, Port Harcourt",
    coveragePeriod: "12 Months",
  },
  {
    id: "7",
    code: "CPN-3XR7WQ",
    generator: "Ngozi Eze",
    customer: "Samuel Eke",
    insuranceType: "Life & Family Insurance",
    product: "Family Benefits Plan",
    amount: 18000,
    dateCreated: "2025-02-19",
    status: "not_redeemed",
    generatorEmail: "ngozi.eze@yahoo.com",
    generatorPhone: "+234 907 884 1230",
    customerEmail: "samuel.eke@outlook.com",
    customerPhone: "+234 907 118 5533",
    state: "Enugu",
    city: "Enugu",
    dateOfBirth: "03/06/1987",
    nin: "901234567800",
    address: "30 Ogui Road, Enugu",
    coveragePeriod: "12 Months",
  },
  {
    id: "8",
    code: "CPN-8LT2YF",
    generator: "Chidi Okafor",
    customer: "Halima Yusuf",
    insuranceType: "Home & Property Insurance",
    product: "Homeowner Policy Insurance",
    amount: 35110,
    dateCreated: "2024-12-08",
    status: "not_redeemed",
    generatorEmail: "chidi.okafor@gmail.com",
    generatorPhone: "+234 803 221 4477",
    customerEmail: "halima.yusuf@gmail.com",
    customerPhone: "+234 815 992 6677",
    state: "Kaduna",
    city: "Kaduna",
    dateOfBirth: "14/02/1993",
    nin: "012345678911",
    address: "6 Ahmadu Bello Way, Kaduna",
    coveragePeriod: "12 Months",
  },
];

/** Most recently generated first. */
export const adminCouponsByRecency = (): AdminCoupon[] =>
  [...ADMIN_COUPONS].sort(
    (a, b) => Date.parse(b.dateCreated) - Date.parse(a.dateCreated),
  );

/** Headline figures for the coupon page, derived from the list above. */
export const couponStats = () => ({
  generated: ADMIN_COUPONS.length,
  redeemed: ADMIN_COUPONS.filter((c) => c.status === "redeemed").length,
  notRedeemed: ADMIN_COUPONS.filter((c) => c.status === "not_redeemed").length,
});

export const getAdminCouponById = (id: string) =>
  ADMIN_COUPONS.find((coupon) => coupon.id === id);
