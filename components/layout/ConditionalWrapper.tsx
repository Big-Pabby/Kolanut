"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const AUTH_ROUTES = ["/login", "/register", "/forgot-password"];

export default function ConditionalWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAuthRoute || isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <div className="py-20">{children}</div>
      <Footer />
    </>
  );
}
