import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET() {
  try {
    const billboards = await prismadb.billboard.findMany({
      include: {
        image: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.log("[BILLBOARDS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    const { label, description, images } = body;

    if (!userId) {
      return new NextResponse("Yetkisiz erişim", { status: 401 });
    }

    if (!label) {
      return new NextResponse("İsim gerekli", { status: 400 });
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

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        description,
        imageId: imageRecords[0].id, // Billboard'da tek resim kullanıyoruz
      },
      include: {
        image: true,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARDS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
