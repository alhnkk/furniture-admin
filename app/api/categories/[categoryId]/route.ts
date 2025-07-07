import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return new NextResponse("Product ID gerekli", { status: 400 });
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      },
      include: {
        image: true,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    const { name, description, images } = body;

    if (!userId) {
      return new NextResponse("Yetkisiz erişim", { status: 401 });
    }

    if (!params.categoryId) {
      return new NextResponse("Category ID gerekli", { status: 400 });
    }

    if (!name) {
      return new NextResponse("İsim gerekli", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("En az bir görsel gerekli", { status: 400 });
    }

    // Mevcut kategoriyi bul
    const existingCategory = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      },
      include: {
        image: true,
      },
    });

    if (!existingCategory) {
      return new NextResponse("Kategori bulunamadı", { status: 404 });
    }

    // Eski resmi sil
    if (existingCategory.image) {
      await prismadb.image.delete({
        where: {
          id: existingCategory.image.id,
        },
      });
    }

    // Yeni resimleri oluştur
    const imageRecords = await Promise.all(
      images.map(async (image: { url: string; publicId: string }) => {
        return await prismadb.image.create({
          data: {
            url: image.url,
            publicId: image.publicId,
          },
        });
      })
    );

    const category = await prismadb.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        description: description || null,
        imageId: imageRecords[0].id, // Kategoride tek resim kullanıyoruz
      },
      include: {
        image: true,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Yetkisiz erişim", { status: 401 });
    }

    if (!params.categoryId) {
      return new NextResponse("Category ID gerekli", { status: 400 });
    }

    // Check if category has any products
    const categoryWithProducts = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      },
      include: {
        products: true,
        image: true,
      },
    });

    if (categoryWithProducts?.products.length) {
      return new NextResponse(
        "Bu kategori ürünler içeriyor. Önce ürünleri silmeniz veya başka bir kategoriye taşımanız gerekiyor.",
        { status: 400 }
      );
    }

    // Önce resmi sil
    if (categoryWithProducts?.image) {
      await prismadb.image.delete({
        where: {
          id: categoryWithProducts.image.id,
        },
      });
    }

    // Sonra kategoriyi sil
    const category = await prismadb.category.delete({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
