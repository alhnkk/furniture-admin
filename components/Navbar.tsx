import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { MainNav } from "@/components/MainNav";
import { ThemeToggle } from "@/components/ThemeToggle";
import Image from "next/image";

const Navbar = async () => {
  // CLERK AUTH
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="flex items-center justify-between border-b">
      <div className="flex h-16 items-center px-4 dark:bg-white/10">
        <div className="flex items-center space-x-4">
          <Image
            src="/logo.png"
            alt="Derya Mimarlık"
            width={100}
            height={100}
          />
        </div>
      </div>
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserButton afterSwitchSessionUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
