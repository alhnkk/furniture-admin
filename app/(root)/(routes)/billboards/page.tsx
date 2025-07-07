import { format } from "date-fns";
import { tr } from "date-fns/locale";

import prismadb from "@/lib/prismadb";

import { BillboardClient } from "./components/BillboardClient";
import { BillboardColumn } from "./components/Columns";

const BillboardsPage = async () => {
  const billboards = await prismadb.billboard.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      image: true,
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    imageUrl: item.image?.url || null,
    createdAt: format(item.createdAt, "d MMMM yyyy", { locale: tr }),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
