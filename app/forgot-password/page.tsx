import ForgotPasswordBranding from "@/components/forgot-password/ForgotPasswordBranding";
import ForgotPasswordForm from "@/components/forgot-password/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <main className="flex w-full min-h-screen overflow-hidden">
      <ForgotPasswordBranding />
      <ForgotPasswordForm />
    </main>
  );
}
