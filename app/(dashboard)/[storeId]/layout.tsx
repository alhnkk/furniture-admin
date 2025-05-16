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

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
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
      {children}
    </div>
  );
};

export default DashboardLayout;
