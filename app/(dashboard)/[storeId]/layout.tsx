import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
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

  const { storeId } = await params;

  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });
  if (!store) {
    redirect("/");
  }
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="m-6 p-2">{children}</div>
    </div>
  );
};

export default DashboardLayout;
