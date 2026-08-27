"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAdminAccess } from "@/lib/auth/useAdminAccess";

/**
 * Redirects the signed-in admin away from any section their role can't access,
 * sending them to the first section they're allowed to see.
 */
export default function AdminAccessGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { canAccessPath, firstPath } = useAdminAccess();
  const allowed = canAccessPath(pathname);

  useEffect(() => {
    if (!allowed) {
      router.replace(firstPath);
    }
  }, [allowed, firstPath, router]);

  if (!allowed) {
    return (
      <div className="flex items-center justify-center py-24 text-sm text-gray-500">
        Redirecting…
      </div>
    );
  }

  return <>{children}</>;
}
