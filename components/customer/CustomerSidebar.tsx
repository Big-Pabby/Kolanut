"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutGrid,
  ShoppingBag,
  FileText,
  User,
  Settings,
  LogOut,
  Home,
  HelpCircle,
  Banknote,
  AlertTriangle,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/lib/store/user-store";
import { useCustomer } from "./CustomerContext";

const navItems = [
  { label: "Dashboard", icon: <LayoutGrid />, href: "/customer/dashboard" },
  {
    label: "Purchased Premiums",
    icon: <ShoppingBag />,
    href: "/customer/purchased-premium",
  },
  { label: "Transactions", icon: <Banknote />, href: "/customer/transactions" },
];

export default function CustomerSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useCustomer();
  const clearUser = useUserStore((state) => state.clearUser);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLogout = () => {
    clearUser();
    setIsLogoutDialogOpen(false);
    setIsMobileMenuOpen(false);
    router.push("/login");
  };

  const handleNavClick = () => {
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  // Mobile overlay
  if (isMobile) {
    return (
      <>
        {/* Mobile Overlay */}
        <div
          className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        {/* Mobile Sidebar */}
        <aside
          className={`fixed left-0 top-0 h-screen flex flex-col z-50 transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{ width: 280, backgroundColor: "#AF060D" }}
        >
          {/* Mobile Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-white/20">
            <Link href="/customer/dashboard" onClick={handleNavClick}>
              <img
                src="/images/LogoFooter.svg"
                alt="Kolanut"
                className="h-8 w-auto"
              />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Mobile Nav */}
          <nav className="flex flex-col gap-1 flex-1 py-4 overflow-y-auto">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={handleNavClick}
                  className="flex items-center h-12 gap-3 px-4 transition-colors"
                  style={{
                    color: isActive ? "#AF060D" : "white",
                    backgroundColor: isActive ? "white" : "transparent",
                    fontSize: 15,
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  <span
                    className="flex items-center justify-center shrink-0"
                    style={{ width: 20, height: 20 }}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              );
            })}

            <div className="my-2 border-t border-white/20 mx-4" />

            {/* <Link
              href="/customer/profile"
              onClick={handleNavClick}
              className="flex items-center gap-3 px-4 h-12 transition-colors"
              style={{ color: "#ffffff", fontSize: 15, fontWeight: 400 }}
            >
              <User />
              Account
            </Link> */}

            {/* <Link
              href="/customer/help"
              onClick={handleNavClick}
              className="flex items-center gap-3 px-4 h-12 transition-colors"
              style={{ color: "#ffffff", fontSize: 15, fontWeight: 400 }}
            >
              <HelpCircle />
              Help & Support
            </Link> */}

            <Link
              href="/customer/settings"
              onClick={handleNavClick}
              className="flex items-center gap-3 px-4 h-12 transition-colors"
              style={{ color: "#ffffff", fontSize: 15, fontWeight: 400 }}
            >
              <Settings />
              Settings
            </Link>

            <div className="mt-auto pt-4 px-4">
              <button
                onClick={() => setIsLogoutDialogOpen(true)}
                className="flex items-center gap-3 px-4 h-12 rounded-lg transition-colors w-full"
                style={{ color: "#ffffff", fontSize: 15, fontWeight: 400 }}
              >
                <LogOut />
                Log out
              </button>
            </div>
          </nav>

          {/* Logout Dialog */}
          <Dialog
            open={isLogoutDialogOpen}
            onOpenChange={setIsLogoutDialogOpen}
          >
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <DialogTitle className="text-lg">Log out</DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                      Are you sure you want to log out?
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <DialogFooter className="sm:justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsLogoutDialogOpen(false)}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleLogout}
                  className="w-full sm:w-auto bg-[#AF060D] hover:bg-[#8B050A]"
                >
                  Log out
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </aside>
      </>
    );
  }

  // Desktop Sidebar
  return (
    <aside
      className="hidden md:flex fixed left-0 top-0 h-screen flex-col z-40"
      style={{ width: 250, backgroundColor: "#AF060D" }}
    >
      {/* Logo */}
      <div className="px-4 py-6">
        <Link href="/customer/dashboard">
          <img
            src="/images/LogoFooter.svg"
            alt="Kolanut"
            className="h-9 w-auto"
          />
        </Link>
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-3 flex-1 pb-6">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center h-11 gap-2 px-3 py-3  transition-colors"
              style={{
                color: isActive ? "#AF060D" : "white",
                backgroundColor: isActive ? "white" : "transparent",
                fontSize: 14,
                fontWeight: isActive ? 600 : 400,
              }}
            >
              <span
                className="flex items-center justify-center shrink-0"
                style={{
                  width: 18,
                  height: 18,
                }}
              >
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}

        {/* Divider */}
        <div className="my-2 border-t border-white/20" />

        {/* Profile */}
        {/* <Link
          href="/customer/profile"
          className="flex items-center gap-2 px-3 py-3 rounded-lg transition-colors"
          style={{
            color: "#ffffff",
            fontSize: 14,
            fontWeight: 400,
          }}
        >
          <span
            className="flex items-center justify-center shrink-0"
            style={{ width: 18, height: 18 }}
          >
            <User />
          </span>
          Account
        </Link> */}

        {/* Help */}
        {/* <Link
          href="/customer/help"
          className="flex items-center gap-2 px-3 py-3 rounded-lg transition-colors"
          style={{
            color: "#ffffff",
            fontSize: 14,
            fontWeight: 400,
          }}
        >
          <span
            className="flex items-center justify-center shrink-0"
            style={{ width: 18, height: 18 }}
          >
            <HelpCircle />
          </span>
          Help & Support
        </Link> */}

        {/* Settings */}
        <Link
          href="/customer/settings"
          className="flex items-center gap-2 px-3 py-3 rounded-lg transition-colors"
          style={{
            color: "#ffffff",
            fontSize: 14,
            fontWeight: 400,
          }}
        >
          <span
            className="flex items-center justify-center shrink-0"
            style={{ width: 18, height: 18 }}
          >
            <Settings />
          </span>
          Settings
        </Link>

        {/* Divider + Logout */}
        <div className="mt-auto pt-4">
          <button
            onClick={() => setIsLogoutDialogOpen(true)}
            className="flex items-center gap-2 px-3 py-3 rounded-lg transition-colors w-full cursor-pointer"
            style={{
              color: "#ffffff",
              fontSize: 14,
              fontWeight: 400,
              letterSpacing: "-0.14px",
            }}
          >
            <LogOut />
            Log out
          </button>
        </div>
      </nav>

      {/* Logout Confirmation Dialog */}
      <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <DialogTitle className="text-lg">Log out</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  Are you sure you want to log out?
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <DialogFooter className="sm:justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsLogoutDialogOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="w-full sm:w-auto bg-[#AF060D] hover:bg-[#8B050A]"
            >
              Log out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </aside>
  );
}
