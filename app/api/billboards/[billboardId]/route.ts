import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    if (!params.billboardId) {
      return new NextResponse("Billboard ID gerekli", { status: 400 });
    }

    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
      include: {
        image: true,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    const { label, description, images } = body;

    if (!userId) {
      return new NextResponse("Yetkisiz erişim", { status: 401 });
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard ID gerekli", { status: 400 });
    }

    if (!label) {
      return new NextResponse("İsim gerekli", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("En az bir görsel gerekli", { status: 400 });
    }

    // Mevcut billboard'u bul
    const existingBillboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
      include: {
        image: true,
      },
    });

    if (!existingBillboard) {
      return new NextResponse("Billboard bulunamadı", { status: 404 });
    }

    // Eski resmi sil
    if (existingBillboard.image) {
      await prismadb.image.delete({
        where: {
          id: existingBillboard.image.id,
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

    const billboard = await prismadb.billboard.update({
      where: {
        id: params.billboardId,
      },
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
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Yetkisiz erişim", { status: 401 });
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard ID gerekli", { status: 400 });
    }

    // Önce billboard'a bağlı resmi bul ve sil
    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
      include: {
        image: true,
      },
    });

    if (billboard?.image) {
      await prismadb.image.delete({
        where: {
          id: billboard.image.id,
        },
      });
    }

    // Sonra billboard'u sil
    await prismadb.billboard.delete({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
