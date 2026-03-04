export function toSentenceCase(text: string): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/_/g, " ") // replace underscores with space
    .replace(/(^\w|\s\w)/g, (match) => match.toUpperCase()); // capitalize first letters
}
export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export const statusUser = {
  verified: "text-[#15803D] bg-[#F0FDF4] rounded-full border border-[#BBF7D0]",
  "in Progress || Processing":
    "text-[#0369A1] bg-[#F0F9FF] rounded-full border border-[#BAE6FD]",
  "awaiting Approval":
    "text-[#B45309] bg-[#FFFBEB] rounded-full border border-[#FDE68A]",
  rejected: "text-[#B91C1C] bg-[#FEF2F2] rounded-full border border-[#FECACA]",
  "in review":
    "text-[#B45309] bg-[#FFFBEB] rounded-full border border-[#FDE68A]",
};
export const statusClassMap: Record<string, string> = {
  approved: "text-[#0369A1] bg-[#F0F9FF] border border-[#BAE6FD] rounded-full",
  pending: "text-[#B45309] bg-[#FFFBEB] rounded-full border border-[#FDE68A]",
  in_review: "text-[#B45309] bg-[#FFFBEB] rounded-full border border-[#FDE68A]",
  settled: "text-[#15803D] bg-[#F0FDF4] border border-[#BBF7D0] rounded-full",
  rejected: "text-[#B91C1C] bg-[#FEF2F2] rounded-full border border-[#FECACA]",

  verified: "text-[#15803D] bg-[#F0FDF4] border border-[#BBF7D0] rounded-full",
};

export const statusClass = {
  completed: "text-[#15803D] bg-[#F0FDF4] border border-[#BBF7D0] rounded-full",
  incomplete:
    "text-[#0369A1] bg-[#F0F9FF] border border-[#BAE6FD] rounded-full",
};
export const policyClass = {
  active: "text-[#15803D] bg-[#F0FDF4] border border-[#BBF7D0] rounded-full",
  processing:
    "text-[#0369A1] bg-[#F0F9FF] border border-[#BAE6FD] rounded-full",
  pending: "text-[#B45309] bg-[#FFFBEB] border border-[#FDE68A] rounded-full",
  paid: "text-[#B45309] bg-[#FFFBEB] border border-[#FDE68A] rounded-full",
};

export const statusClasses = {
  active: "bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]",
  processing: "bg-[#F0F9FF] text-[#0369A1] border-[#BAE6FD]",
  pending: "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]",
  incomplete: "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]",
  paid: "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]",
  "in review": "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]",
  completed: "bg-[#F0F9FF] text-[#0369A1] border-[#BAE6FD]",
};

export function capitalizeFirstChar(text: unknown): string {
  if (typeof text !== "string") return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}
export function formatNaira(value: number | string): string {
  const amount = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(amount)) return "₦0.00";

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(amount);
}
export function formatPhoneNumber(phone: string): string {
  if (!phone) return "";
  // Remove non-digit characters
  const cleaned = phone.replace(/\D/g, "");
  // Format as Nigerian phone number
  if (cleaned.startsWith("0")) {
    return `+234${cleaned.slice(1)}`;
  }
  return `+234${cleaned}`;
}
