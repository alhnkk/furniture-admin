import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ billboardId: string }> }
) {
  try {
    const { billboardId } = await params;
    if (!billboardId) {
      return new NextResponse("Billboard ID gerekli", { status: 400 });
    }

    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: billboardId,
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
  { params }: { params: Promise<{ billboardId: string }> }
) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { billboardId } = await params;

    const { label, description, images } = body;

    if (!userId) {
      return new NextResponse("Yetkisiz erişim", { status: 401 });
    }

    if (!billboardId) {
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
        id: billboardId,
      },
      include: {
        image: true,
      },
    });

    if (!existingBillboard) {
      return new NextResponse("Billboard bulunamadı", { status: 404 });
    }

    // Önce yeni image'i oluştur
    const newImage = await prismadb.image.create({
      data: {
        url: images[0].url,
        publicId: images[0].publicId,
      },
    });

    // Billboard'u yeni image ile güncelle
    const billboard = await prismadb.billboard.update({
      where: {
        id: billboardId,
      },
      data: {
        label,
        description,
        imageId: newImage.id,
      },
      include: {
        image: true,
      },
    });

    // Son olarak eski image'i sil (eğer varsa ve yeni image'den farklıysa)
    if (existingBillboard.image && existingBillboard.image.id !== newImage.id) {
      await prismadb.image
        .delete({
          where: {
            id: existingBillboard.image.id,
          },
        })
        .catch((error) => {
          // Eski image silme başarısız olsa bile billboard güncellemesi başarılı oldu
          console.log("[BILLBOARD_PATCH] Eski image silinirken hata:", error);
        });
    }

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ billboardId: string }> }
) {
  try {
    const { userId } = await auth();
    const { billboardId } = await params;

    if (!userId) {
      return new NextResponse("Yetkisiz erişim", { status: 401 });
    }

    if (!billboardId) {
      return new NextResponse("Billboard ID gerekli", { status: 400 });
    }

    // Önce billboard'u bul
    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: billboardId,
      },
      include: {
        image: true,
      },
    });

    if (!billboard) {
      return new NextResponse("Billboard bulunamadı", { status: 404 });
    }

    // Billboard'u sil
    await prismadb.billboard.delete({
      where: {
        id: billboardId,
      },
    });

    // Son olarak bağlı image'i sil (eğer varsa)
    if (billboard.image) {
      await prismadb.image
        .delete({
          where: {
            id: billboard.image.id,
          },
        })
        .catch((error) => {
          // Image silme başarısız olsa bile billboard silme işlemi başarılı oldu
          console.log("[BILLBOARD_DELETE] Image silinirken hata:", error);
        });
    }

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
