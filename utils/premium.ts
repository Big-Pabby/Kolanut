export function calculatePremium(value: any, durationStr: String) {
  const match = durationStr
    .toLowerCase()
    .match(/(\d+)\s*(month|months|year|years)/);
  if (!match) {
    throw new Error("Invalid duration format");
  }

  const number = parseInt(match[1], 10);
  const unit = match[2];

  const premiumRatePerYear = 0.00125; // 0.125%

  let years;
  if (unit.includes("month")) {
    years = number / 12;
  } else {
    years = number;
  }

  const premiumAmount = value * premiumRatePerYear * years;
  return Math.round(premiumAmount * 100) / 100; // Round to 2 decimal places
}
