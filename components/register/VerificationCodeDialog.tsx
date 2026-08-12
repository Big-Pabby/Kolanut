"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { ACTIVATION_CODE_LENGTH } from "@/app/register/hooks";

const CODE_LENGTH = ACTIVATION_CODE_LENGTH;

interface VerificationCodeDialogProps {
  open: boolean;
  email: string;
  isVerifying?: boolean;
  isResending?: boolean;
  onVerify: (code: string) => void;
  onResend: () => void;
  onCancel: () => void;
}

export default function VerificationCodeDialog({
  open,
  email,
  isVerifying = false,
  isResending = false,
  onVerify,
  onResend,
  onCancel,
}: VerificationCodeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(next) => !next && onCancel()}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-sm w-[90vw] rounded-2xl bg-white border-0 shadow-2xl p-8 gap-6"
      >
        <div className="flex flex-col gap-2 text-center">
          <DialogTitle className="font-heading text-2xl font-bold text-[#111827]">
            Input Verification Code
          </DialogTitle>
          <DialogDescription className="text-sm text-[#4b5563]">
            Enter the code sent to{" "}
            <span className="font-semibold text-[#111827]">{email}</span>. Check
            spam if you do not see it in your inbox
          </DialogDescription>
        </div>

        {/* Remounts on every open, so the code always starts empty */}
        <VerificationCodeForm
          isVerifying={isVerifying}
          isResending={isResending}
          onVerify={onVerify}
          onResend={onResend}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}

type VerificationCodeFormProps = Omit<
  VerificationCodeDialogProps,
  "open" | "email"
>;

function VerificationCodeForm({
  isVerifying,
  isResending,
  onVerify,
  onResend,
  onCancel,
}: VerificationCodeFormProps) {
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [error, setError] = useState("");
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const setInputRef = (index: number) => (el: HTMLInputElement | null) => {
    if (el) inputRefs.current[index] = el;
  };

  const handleChange = (index: number, value: string) => {
    if (value.length > 1 || !/^\d*$/.test(value)) return;

    const next = [...code];
    next[index] = value;
    setCode(next);
    setError("");

    if (value && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim().slice(0, CODE_LENGTH);
    if (!new RegExp(`^\\d{${CODE_LENGTH}}$`).test(pasted)) return;

    setCode(pasted.split(""));
    setError("");
    inputRefs.current[CODE_LENGTH - 1]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fullCode = code.join("");
    if (fullCode.length !== CODE_LENGTH) {
      setError(`Please enter all ${CODE_LENGTH} digits`);
      return;
    }

    onVerify(fullCode);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* OTP inputs */}
      <div className="flex justify-center gap-3.5">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={setInputRef(index)}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            aria-label={`Digit ${index + 1}`}
            maxLength={1}
            value={digit}
            disabled={isVerifying}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className="w-14 h-14 text-center text-xl font-semibold rounded-lg border border-[#d1d5db] text-[#111827] focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/30 disabled:opacity-60 transition-all"
          />
        ))}
      </div>

      {error && <p className="text-center text-sm text-[#dc2626]">{error}</p>}

      <p className="text-center text-sm text-[#4b5563]">
        Didn&apos;t receive an OTP?{" "}
        <button
          type="button"
          onClick={onResend}
          disabled={isResending}
          className="font-semibold text-brand-red hover:underline disabled:opacity-60"
        >
          {isResending ? "Sending..." : "Resend OTP"}
        </button>
      </p>

      <div className="flex flex-col gap-3">
        <Button
          type="submit"
          disabled={isVerifying}
          className="w-full h-12 rounded-full bg-brand-red hover:bg-brand-red/90 text-white text-base font-medium disabled:opacity-70"
        >
          {isVerifying ? "Verifying..." : "Verify"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isVerifying}
          className="w-full h-12 rounded-full border-[#d1d5db] bg-white text-[#111827] text-base font-medium hover:bg-[#f9fafb]"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
