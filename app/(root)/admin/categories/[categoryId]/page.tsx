import prismadb from "@/lib/prismadb";

import { CategoryForm } from "./components/CategoryForm";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;
  const category = await prismadb.category.findUnique({
    where: {
      id: categoryId,
    },
    include: {
      image: true,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;
