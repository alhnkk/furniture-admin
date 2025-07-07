import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ categoryId: string }> }
) {
  try {
    const { categoryId } = await params;
    if (!categoryId) {
      return new NextResponse("Product ID gerekli", { status: 400 });
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: categoryId,
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
  { params }: { params: Promise<{ categoryId: string }> }
) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { categoryId } = await params;

    const { name, description, images } = body;

    if (!userId) {
      return new NextResponse("Yetkisiz erişim", { status: 401 });
    }

    if (!categoryId) {
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
        id: categoryId,
      },
      include: {
        image: true,
      },
    });

    if (!existingCategory) {
      return new NextResponse("Kategori bulunamadı", { status: 404 });
    }

    // Önce yeni image'i oluştur
    const newImage = await prismadb.image.create({
      data: {
        url: images[0].url,
        publicId: images[0].publicId,
      },
    });

    // Category'yi yeni image ile güncelle
    const category = await prismadb.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name,
        description: description || null,
        imageId: newImage.id,
      },
      include: {
        image: true,
      },
    });

    // Son olarak eski image'i sil (eğer varsa ve yeni image'den farklıysa)
    if (existingCategory.image && existingCategory.image.id !== newImage.id) {
      await prismadb.image.delete({
        where: {
          id: existingCategory.image.id,
        },
      }).catch((error) => {
        // Eski image silme başarısız olsa bile category güncellemesi başarılı oldu
        console.log("[CATEGORY_PATCH] Eski image silinirken hata:", error);
      });
    }

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ categoryId: string }> }
) {
  try {
    const { userId } = await auth();
    const { categoryId } = await params;

    if (!userId) {
      return new NextResponse("Yetkisiz erişim", { status: 401 });
    }

    if (!categoryId) {
      return new NextResponse("Category ID gerekli", { status: 400 });
    }

    // Check if category has any products
    const categoryWithProducts = await prismadb.category.findUnique({
      where: {
        id: categoryId,
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

    // Kategoriyi sil
    const category = await prismadb.category.delete({
      where: {
        id: categoryId,
      },
    });

    // Son olarak bağlı image'i sil (eğer varsa)
    if (categoryWithProducts?.image) {
      await prismadb.image.delete({
        where: {
          id: categoryWithProducts.image.id,
        },
      }).catch((error) => {
        // Image silme başarısız olsa bile category silme işlemi başarılı oldu
        console.log("[CATEGORY_DELETE] Image silinirken hata:", error);
      });
    }

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
