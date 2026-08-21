"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, LayoutGrid, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  clearSession,
  dashboardPathFor,
  displayNameFor,
  initialsFor,
} from "@/lib/auth";
import { useUserStore } from "@/lib/store/user-store";

interface UserMenuProps {
  /** The mobile drawer sits on the brand-red panel, so it needs light text. */
  variant?: "light" | "dark";
  onNavigate?: () => void;
}

export default function UserMenu({
  variant = "dark",
  onNavigate,
}: UserMenuProps) {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  if (!user) return null;

  const name = displayNameFor(user);
  const initials = initialsFor(user);
  const dashboardPath = dashboardPathFor(user);
  const isLight = variant === "light";

  const handleLogout = () => {
    clearSession();
    onNavigate?.();
    router.push("/");
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Account menu"
        className={`rounded-full px-1.5 py-1 transition-colors ${
          isLight ? "text-white hover:bg-white/10" : "hover:bg-gray-50"
        }`}
      >
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
            isLight ? "bg-white text-brand-red" : "bg-brand-red/10 text-brand-red"
          }`}
        >
          {initials || <User className="h-4 w-4" />}
        </span>
        <span
          className={`hidden max-w-[140px] truncate text-sm font-medium xl:inline ${
            isLight ? "text-white" : "text-nav-text"
          }`}
        >
          {name}
        </span>
        <ChevronDown
          className={`h-4 w-4 ${isLight ? "text-white" : "text-nav-text"}`}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="right-0 w-56 rounded-xl border border-gray-100 bg-white p-1.5 shadow-lg"
      >
        <div className="px-2 py-2">
          <p className="truncate text-sm font-semibold text-[#111827]">
            {user.fullname || "Your account"}
          </p>
          <p className="truncate text-xs text-[#6b7280]">{user.email}</p>
        </div>

        <DropdownMenuSeparator className="bg-gray-100" />

        <DropdownMenuItem
          className="cursor-pointer rounded-lg px-2 py-2 text-sm text-[#374151] hover:bg-gray-50"
          onSelect={onNavigate}
        >
          <Link href={dashboardPath} className="flex w-full items-center gap-2">
            <LayoutGrid className="h-4 w-4" />
            {user.is_admin ? "Admin dashboard" : "My dashboard"}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer rounded-lg px-2 py-2 text-sm text-brand-red hover:bg-red-50"
          onSelect={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
