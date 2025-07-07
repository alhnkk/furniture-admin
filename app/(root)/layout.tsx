import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";

const DashboardLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) => {
  //Clerk Auth
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }
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
