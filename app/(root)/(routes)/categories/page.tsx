import { format } from "date-fns";
import { tr } from "date-fns/locale";

import prismadb from "@/lib/prismadb";

import { CategoryColumn } from "./components/Columns";
import { CategoryClient } from "./components/CategoryClient";

const CategoriesPage = async () => {
  const categories = await prismadb.category.findMany({
    include: {
      image: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    image: item.image,
    createdAt: format(item.createdAt, "d MMMM yyyy", { locale: tr }),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
