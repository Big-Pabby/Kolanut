"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", icon: "/icons/admin/dashboard.svg", href: "/admin/dashboard" },
  { label: "Customers", icon: "/icons/admin/customers.svg", href: "/admin/customers" },
  { label: "Policies", icon: "/icons/admin/policies.svg", href: "/admin/policies" },
  { label: "Transactions", icon: "/icons/admin/transactions.svg", href: "/admin/transactions" },
  { label: "Claims", icon: "/icons/admin/claims.svg", href: "/admin/claims" },
  { label: "Coupon", icon: "/icons/admin/coupon.svg", href: "/admin/coupon" },
  { label: "Resources", icon: "/icons/admin/resources.svg", href: "/admin/resources" },
  { label: "FAQs", icon: "/icons/admin/faqs.svg", href: "/admin/faqs" },
  { label: "Settings", icon: "/icons/admin/settings.svg", href: "/admin/settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="fixed left-0 top-0 h-screen flex flex-col z-40"
      style={{ width: 210, backgroundColor: "#af060d" }}
    >
      {/* Logo */}
      <div className="px-4 py-6">
        <img src="/icons/admin/logo.svg" alt="Kolanut" className="h-9 w-auto" />
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-1 flex-1 px-3 pb-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-2 px-3 py-3 rounded-lg transition-colors"
              style={{
                color: "#ffffff",
                backgroundColor: isActive ? "rgba(255,255,255,0.15)" : "transparent",
                fontSize: 14,
                fontWeight: isActive ? 500 : 400,
                letterSpacing: "-0.14px",
                fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
              }}
            >
              <span
                className="flex items-center justify-center shrink-0"
                style={{
                  width: 18,
                  height: 18,
                  border: isActive ? "1.5px solid #af060d" : "1.5px solid #ffffff",
                  borderRadius: 2,
                  padding: 0,
                }}
              >
                <img src={item.icon} alt={item.label} style={{ width: 14, height: 14, filter: "brightness(0) invert(1)" }} />
              </span>
              {item.label}
            </Link>
          );
        })}

        {/* Divider + Logout */}
        <div className="mt-auto pt-4">
          <Link
            href="/logout"
            className="flex items-center gap-2 px-3 py-3 rounded-lg transition-colors"
            style={{
              color: "#ffffff",
              fontSize: 14,
              fontWeight: 400,
              letterSpacing: "-0.14px",
              fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
            }}
          >
            <span
              className="flex items-center justify-center shrink-0"
              style={{ width: 18, height: 18, border: "1.5px solid #ffffff", borderRadius: 2 }}
            >
              <img src="/icons/admin/logout.svg" alt="Log out" style={{ width: 14, height: 14, filter: "brightness(0) invert(1)" }} />
            </span>
            Log out
          </Link>
        </div>
      </nav>
    </aside>
  );
}
