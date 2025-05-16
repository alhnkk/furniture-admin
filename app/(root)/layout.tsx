import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

const SetupLayout = async ({ children }: { children: React.ReactNode }) => {
  // CLERK AUTH
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      userId,
    },
  });

  if (store) {
    redirect(`/${store.id}`);
  }
  return <>{children}</>;
};

export default SetupLayout;
