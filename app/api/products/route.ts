import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET() {
  try {
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

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    const { name, description, categoryId, images, isFeatured, isArchived } =
      body;

    if (!userId) {
      return new NextResponse("Yetkisiz erişim", { status: 401 });
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

    const product = await prismadb.product.create({
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
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
