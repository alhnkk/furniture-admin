import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;
    if (!productId) {
      return new NextResponse("Product ID gerekli", { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        category: true,
        images: true,
        gallery: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { productId } = await params;

    const { name, description, categoryId, images, isFeatured, isArchived } =
      body;

    if (!userId) {
      return new NextResponse("Yetkisiz erişim", { status: 401 });
    }

    if (!productId) {
      return new NextResponse("Product ID gerekli", { status: 400 });
    }

    if (!name) {
      return new NextResponse("İsim gerekli", { status: 400 });
    }

    if (!description) {
      return new NextResponse("Açıklama gerekli", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Kategori ID gerekli", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("En az bir görsel gerekli", { status: 400 });
    }

    // Mevcut product'ı ve bağlı image'ları bul
    const existingProduct = await prismadb.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        images: true,
        gallery: {
          include: {
            image: true,
          },
        },
      },
    });

    if (!existingProduct) {
      return new NextResponse("Ürün bulunamadı", { status: 404 });
    }

    // Önce yeni görsel kayıtlarını oluştur
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

    // Product'ı güncelle - önce eski image'ları disconnect et
    const product = await prismadb.product.update({
      where: {
        id: productId,
      },
      data: {
        name,
        description,
        categoryId,
        isFeatured,
        isArchived,
        images: {
          set: imageRecords.map((image) => ({
            id: image.id,
          })),
        },
      },
    });

    // Eski image'ları sil (gallery images'ları hariç)
    const oldImageIdsToDelete = existingProduct.images
      .filter(
        (oldImage) =>
          !imageRecords.some((newImage) => newImage.id === oldImage.id) &&
          !existingProduct.gallery.some(
            (galleryItem) => galleryItem.image.id === oldImage.id
          )
      )
      .map((image) => image.id);

    if (oldImageIdsToDelete.length > 0) {
      await prismadb.image
        .deleteMany({
          where: {
            id: {
              in: oldImageIdsToDelete,
            },
          },
        })
        .catch((error) => {
          console.log("[PRODUCT_PATCH] Eski image'lar silinirken hata:", error);
        });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { userId } = await auth();
    const { productId } = await params;

    if (!userId) {
      return new NextResponse("Yetkisiz erişim", { status: 401 });
    }

    if (!productId) {
      return new NextResponse("Product ID gerekli", { status: 400 });
    }

    // Önce product'ı ve bağlı verileri bul
    const product = await prismadb.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        images: true,
        gallery: {
          include: {
            image: true,
          },
        },
      },
    });

    if (!product) {
      return new NextResponse("Ürün bulunamadı", { status: 404 });
    }

    // Product'ı sil
    await prismadb.product.delete({
      where: {
        id: productId,
      },
    });

    // Bağlı image'ları topla ve sil
    const imageIdsToDelete = [
      ...product.images.map((img) => img.id),
      ...product.gallery.map((galleryItem) => galleryItem.image.id),
    ];

    // Unique image ID'leri al
    const uniqueImageIds = [...new Set(imageIdsToDelete)];

    if (uniqueImageIds.length > 0) {
      await prismadb.image
        .deleteMany({
          where: {
            id: {
              in: uniqueImageIds,
            },
          },
        })
        .catch((error) => {
          console.log("[PRODUCT_DELETE] Image'lar silinirken hata:", error);
        });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
