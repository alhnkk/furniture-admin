import Navbar from "@/components/Navbar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="m-6 p-2">{children}</div>
    </>
  );
};

export default DashboardLayout;
