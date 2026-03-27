"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { VerifyingCodeDialog } from "./VerifyingCodeDialog";

export default function VerifyCodeForm() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const setInputRef = (index: number) => (el: HTMLInputElement | null) => {
    if (el) {
      inputRefs.current[index] = el;
    }
  };

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow single digits
    if (value.length > 1) return;

    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError("");

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    // Handle backspace to go to previous input
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4);

    // Check if pasted data is all digits
    if (!/^\d{4}$/.test(pastedData)) return;

    const newCode = pastedData.split("");
    setCode(newCode);
    setError("");

    // Focus the last filled input
    inputRefs.current[3]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all digits are filled
    const fullCode = code.join("");
    if (fullCode.length !== 4) {
      setError("Please enter all 4 digits");
      return;
    }

    // Show loading dialog
    setIsVerifying(true);

    // Simulate code verification (in real app, call API)
    setTimeout(() => {
      setIsVerifying(false);
      alert("Code verified successfully!");
      router.push("/login");
    }, 2000);
  };

  const handleResend = () => {
    // Simulate resend code
    alert("A new code has been sent to your email");
  };

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-12 bg-white">
      <div className="w-full max-w-[400px]">
        {/* Header */}
        <div className="flex flex-col gap-2 text-center mb-6">
          <h2
            className="text-[#111827] font-heading"
            style={{
              fontSize: "30px",
              fontWeight: 700,
              lineHeight: "1.25",
            }}
          >
            Input Verification Code
          </h2>
          <p
            style={{
              fontSize: "14px",
              fontWeight: 400,
              color: "#4b5563",
            }}
          >
            Enter the code sent to{" "}
            <span className="font-semibold">mauteenadelek11@gmail.com</span>.
            Check spam if you do not see it in your inbox
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* OTP Input */}
          <div className="flex justify-center gap-3">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={setInputRef(index)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-14 h-14 text-center text-xl font-semibold rounded-lg border-2 border-[#d1d5db] text-[#111827] focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/30 transition-all"
                style={{
                  fontFamily:
                    "HelveticaNeue, Helvetica Neue, Helvetica, Arial, sans-serif",
                }}
              />
            ))}
          </div>

          {/* Error message */}
          {error && (
            <p
              style={{
                fontFamily:
                  "HelveticaNeue, Helvetica Neue, Helvetica, Arial, sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                color: "#dc2626",
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}

          {/* Verify button */}
          <Button
            type="submit"
            className="w-full h-12 rounded-full bg-brand-red hover:bg-brand-red/90 text-white text-base font-medium"
            style={{
              fontFamily:
                "HelveticaNeue, Helvetica Neue, Helvetica, Arial, sans-serif",
            }}
          >
            Verify Code
          </Button>

          {/* Resend code link */}
          <div className="text-center text-[#4B5563] text-sm">
            <p
              style={{
                fontFamily:
                  "HelveticaNeue, Helvetica Neue, Helvetica, Arial, sans-serif",
                fontSize: "14px",
              }}
            >
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={handleResend}
                style={{
                  fontFamily:
                    "HelveticaNeue, Helvetica Neue, Helvetica, Arial, sans-serif",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#af060d",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                className="hover:underline"
              >
                Resend Code
              </button>
            </p>
          </div>

          {/* Back to Login link */}
          <div className="text-center text-[#4B5563] text-sm">
            <p>
              Remember Password?{" "}
              <Link
                href="/login"
                style={{
                  fontFamily:
                    "HelveticaNeue, Helvetica Neue, Helvetica, Arial, sans-serif",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#af060d",
                }}
                className="hover:underline"
              >
                Back to Login
              </Link>
            </p>
          </div>
        </form>
      </div>

      {/* Verifying Code Dialog */}
      <VerifyingCodeDialog open={isVerifying} onOpenChange={setIsVerifying} />
    </div>
  );
}
