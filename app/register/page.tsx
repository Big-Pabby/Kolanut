import RegisterBranding from "@/components/register/RegisterBranding";
import SignupForm from "@/components/register/SignupForm";

export const metadata = {
  title: "Create an account | Kolanut Africa",
  description: "Create your Kolanut Africa account to get covered in minutes.",
};

export default function RegisterPage() {
  return (
    <main className="flex w-full min-h-screen overflow-hidden">
      <RegisterBranding />
      <SignupForm />
    </main>
  );
}
