import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminAccessGuard from "@/components/admin/AdminAccessGuard";
import { AdminProvider } from "@/components/admin/AdminContext";
import "../globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <div className="flex min-h-screen" style={{ backgroundColor: "#f9fafb" }}>
        <AdminSidebar />
        {/* min-w-0 lets this column shrink below its content's intrinsic width,
            so wide tables scroll inside their own container instead of
            stretching the whole page. */}
        <div className="flex flex-1 min-w-0 flex-col md:ml-[250px]">
          <AdminHeader />
          <main className="flex-1 min-w-0 overflow-y-auto pt-16">
            <div className="p-4 md:p-6 lg:p-10">
              <AdminAccessGuard>{children}</AdminAccessGuard>
            </div>
          </main>
        </div>
      </div>
    </AdminProvider>
  );
}
