import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#f9fafb" }}>
      <AdminSidebar />
      <div className="flex flex-col flex-1" style={{ marginLeft: 210 }}>
        <AdminHeader />
        <main className="flex-1 overflow-y-auto" style={{ paddingTop: 64 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
