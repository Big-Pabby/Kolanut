export type CouponStatus = "redeemed" | "not_redeemed";

export interface AdminCoupon {
  id: string;
  code: string;
  generator: string;
  customer: string;
  insuranceType: string;
  product: string;
  amount: number;
  dateCreated: string;
  status: CouponStatus;
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
    code: "COP-E6LAA",
    generator: "Adeleke Mauteen",
    customer: "Noah Ibrahim",
    insuranceType: "Comprehensive Motor",
    product: "Comprehensive Auto Insurance",
    amount: 13567,
    dateCreated: "2024-03-12",
    status: "redeemed",
    policyNumber: "KA-09795184",
    generatorEmail: "mauteenadeleke@gmail.com",
    generatorPhone: "+234 812 345 6789",
    customerEmail: "noah.ibrahim@gmail.com",
    customerPhone: "+234 809 111 2233",
    state: "Lagos",
    city: "Ikeja",
    dateOfBirth: "15/05/1990",
    nin: "123456789000",
    address: "08 Johnson Street, Ikeja Lagos State",
    coveragePeriod: "12 Months",
  },
  {
    id: "2",
    code: "COP-E6LAA",
    generator: "Adeleke Mauteen",
    customer: "Noah Ibrahim",
    insuranceType: "Landlord Policy Insurance",
    product: "Landlord's Policy Insurance",
    amount: 13567,
    dateCreated: "2024-03-12",
    status: "redeemed",
    policyNumber: "KA-09795226",
    generatorEmail: "mauteenadeleke@gmail.com",
    generatorPhone: "+234 812 345 6789",
    customerEmail: "noah.ibrahim@gmail.com",
    customerPhone: "+234 809 111 2233",
    state: "Lagos",
    city: "Ikeja",
    dateOfBirth: "15/05/1990",
    nin: "123456789000",
    address: "08 Johnson Street, Ikeja Lagos State",
    coveragePeriod: "12 Months",
  },
  {
    id: "3",
    code: "COP-E6LAA",
    generator: "Adeleke Mauteen",
    customer: "Noah Ibrahim",
    insuranceType: "Tenant Policy Insurance",
    product: "Tenant Policy Insurance",
    amount: 1313567,
    dateCreated: "2024-03-12",
    status: "not_redeemed",
    generatorEmail: "mauteenadeleke@gmail.com",
    generatorPhone: "+234 812 345 6789",
    customerEmail: "noah.ibrahim@gmail.com",
    customerPhone: "+234 809 111 2233",
    state: "Lagos",
    city: "Ikeja",
    dateOfBirth: "15/05/1990",
    nin: "123456789000",
    address: "08 Johnson Street, Ikeja Lagos State",
    coveragePeriod: "12 Months",
  },
  {
    id: "4",
    code: "COP-E6LAA",
    generator: "Adeleke Mauteen",
    customer: "Noah Ibrahim",
    insuranceType: "Home & Property",
    product: "Home & Property Insurance",
    amount: 1313567,
    dateCreated: "2024-03-12",
    status: "not_redeemed",
    generatorEmail: "mauteenadeleke@gmail.com",
    generatorPhone: "+234 812 345 6789",
    customerEmail: "noah.ibrahim@gmail.com",
    customerPhone: "+234 809 111 2233",
    state: "Lagos",
    city: "Ikeja",
    dateOfBirth: "15/05/1990",
    nin: "123456789000",
    address: "08 Johnson Street, Ikeja Lagos State",
    coveragePeriod: "12 Months",
  },
];

export const getAdminCouponById = (id: string) =>
  ADMIN_COUPONS.find((coupon) => coupon.id === id);
