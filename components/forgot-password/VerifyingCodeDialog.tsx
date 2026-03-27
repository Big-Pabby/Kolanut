"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

// Spinner SVG animation using Tailwind + custom keyframes
function SpinnerIcon() {
  return (
    <svg
      className="w-14 h-14 animate-spin-slow"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer track */}
      <circle cx="28" cy="28" r="22" stroke="#E5E7EB" strokeWidth="3" />
      {/* Spinning arc — primary color */}
      <circle
        cx="28"
        cy="28"
        r="22"
        stroke="#C0392B"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="80 60"
        strokeDashoffset="0"
        className="origin-center"
      />
      {/* Inner arc — lighter tint, counter-rotate feel */}
      <circle
        cx="28"
        cy="28"
        r="14"
        stroke="#E8A09A"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="40 48"
        strokeDashoffset="20"
        className="origin-center"
      />
    </svg>
  );
}

interface VerifyingCodeDialogProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function VerifyingCodeDialog({
  open,
  onOpenChange,
}: VerifyingCodeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          sm:max-w-sm w-[90vw] rounded-2xl
          bg-white shadow-2xl border-0
          flex flex-col items-center justify-center
          gap-5 py-12 px-8
          [&>button]:hidden
        "
      >
        {/* Spinner */}
        <div className="flex items-center justify-center">
          <SpinnerIcon />
        </div>

        {/* Text */}
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
            Verifying Code
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Sit tight while we verify your email address.
            <br />
            This will take a minute...
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
