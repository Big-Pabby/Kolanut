import LoginBranding from "@/components/login/LoginBranding";
import LoginForm from "@/components/login/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex w-full min-h-screen overflow-hidden">
      <LoginBranding />
      <LoginForm />
    </main>
  );
}
