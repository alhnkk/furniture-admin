import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SettingsForm } from "./components/SettingsForm";

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const dynamicParams = await params;

  const store = await prismadb.store.findFirst({
    where: {
      id: dynamicParams.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="flex-col">
      <SettingsForm initialData={store} />
    </div>
  );
};

export default SettingsPage;
