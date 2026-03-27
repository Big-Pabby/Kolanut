import VerifyCodeBranding from "@/components/forgot-password/VerifyCodeBranding";
import VerifyCodeForm from "@/components/forgot-password/VerifyCodeForm";

export default function VerifyCodePage() {
  return (
    <main className="flex w-full min-h-screen overflow-hidden">
      <VerifyCodeBranding />
      <VerifyCodeForm />
    </main>
  );
}
