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
          connect: imageRecords.map((image) => ({
            id: image.id,
          })),
        },
      },
    });

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

    const product = await prismadb.product.delete({
      where: {
        id: productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
