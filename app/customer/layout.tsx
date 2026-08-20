import CustomerSidebar from "@/components/customer/CustomerSidebar";
import CustomerHeader from "@/components/customer/CustomerHeader";
import { CustomerProvider } from "@/components/customer/CustomerContext";
import "../globals.css";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CustomerProvider>
      <div className="flex min-h-screen" style={{ backgroundColor: "#f9fafb" }}>
        <CustomerSidebar />
        {/* min-w-0 lets this column shrink below its content's intrinsic width,
            so wide tables scroll inside their own container instead of
            stretching the whole page. */}
        <div className="flex flex-1 min-w-0 flex-col transition-all duration-300 md:ml-[250px]">
          <CustomerHeader />
          <main className="flex-1 min-w-0 overflow-y-auto pt-16">
            <div className="p-4 md:p-6 lg:p-10">{children}</div>
          </main>
        </div>
      </div>
    </CustomerProvider>
  );
}
