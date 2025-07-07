import { format } from "date-fns";
import { tr } from "date-fns/locale";

import prismadb from "@/lib/prismadb";

import { ProductClient } from "./components/ProductClient";
import { ProductColumn } from "./components/Columns";

const ProductsPage = async () => {
  const products = await prismadb.product.findMany({
    include: {
      category: true,
      images: true,
      gallery: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProduct: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    category: item.category.name,
    createdAt: format(item.createdAt, "d MMMM yyyy", { locale: tr }),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProduct} />
      </div>
    </div>
  );
};

export default ProductsPage;
