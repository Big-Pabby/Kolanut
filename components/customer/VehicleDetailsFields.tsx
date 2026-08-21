"use client";

import {
  formatPremiumAmount,
  type VehicleDetails,
} from "@/lib/data/premiums";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-[#4B5563] uppercase">{label}</span>
      <span className="text-sm text-[#161616]">{value}</span>
    </div>
  );
}

/**
 * The insured vehicle, shown on motor policies. Callers supply their own
 * accordion/section wrapper.
 */
export default function VehicleDetailsFields({
  vehicle,
}: {
  vehicle: VehicleDetails;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
      <Field label="Plate Number" value={vehicle.plateNumber} />
      <Field
        label="Vehicle Amount"
        value={formatPremiumAmount(vehicle.vehicleAmount)}
      />
      <Field label="Vehicle Body Type" value={vehicle.bodyType} />
      <Field label="Vehicle Make" value={vehicle.make} />
      <Field label="Vehicle Model" value={vehicle.model} />
      <Field label="Year of Manufacture" value={vehicle.yearOfManufacture} />
      <Field label="Color" value={vehicle.color} />
      <Field label="Engine Number" value={vehicle.engineNumber} />
      <Field label="Chassis Number" value={vehicle.chassisNumber} />
    </div>
  );
}
