import { Separator } from "@/components/ui/separator";
import Sidebar from "./Sidebar";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h2 className="text-2xl pl-4">Dashboard</h2>
      <Separator className="mt-2" />
      {/* lg:grid-cols-12 na velké obrazovce bude mít 12 sloupcu */}
      <section className="grid lg:grid-cols-12 gap-12 mt-12">
        {/* sidebar bude mit pouze 2/12 obsahz */}
        <div className="lg:col-span-2">
          <Sidebar />
        </div>
        {/* lg:col-span-10 na velké obrazovce bude children tvořit 10/12 obsahu */}
        <div className="lg:col-span-10 px-4">{children}</div>
      </section>
    </>
  );
}
export default DashboardLayout;
