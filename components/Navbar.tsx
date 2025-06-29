import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

import { redirect } from "next/navigation";
import { MainNav } from "@/components/MainNav";
import StoreSwitcher from "@/components/StoreSwitcher";
import prismadb from "@/lib/prismadb";

const Navbar = async () => {
  // CLERK AUTH
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSwitchSessionUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
