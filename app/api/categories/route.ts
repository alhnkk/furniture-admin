import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET() {
  try {
    const categories = await prismadb.category.findMany({
      include: {
        image: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORIES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    const { name, description, images } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("İsim zorunludur", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("En az bir görsel gerekli", { status: 400 });
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

    const category = await prismadb.category.create({
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
    console.log("[CATEGORIES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
