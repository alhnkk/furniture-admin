import prismadb from "@/lib/prismadb";

export const getProducts = async () => {
  try {
    const products = await prismadb.product.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    return products;
  } catch (error) {
    console.error("[GET_PRODUCTS_ERROR]", error);
    throw new Error("Ürünler yüklenirken bir hata oluştu.");
  }
};