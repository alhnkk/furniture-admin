import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";

export async function GET() {
  try {
    const settings = await prismadb.settings.findFirst();
    return NextResponse.json(settings);
  } catch {
    return new NextResponse("Dahili sunucu hatası", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Kimlik doğrulanmamış", { status: 401 });
    }

    const body = await req.json();
    const { siteName, contactInfo, socialMedia, metaData } = body;

    if (!siteName) {
      return new NextResponse("Site adı gerekli", { status: 400 });
    }

    const settings = await prismadb.settings.create({
      data: {
        siteName,
        contactInfo,
        socialMedia,
        metaData,
      },
    });

    return NextResponse.json(settings);
  } catch {
    return new NextResponse("Dahili sunucu hatası", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Kimlik doğrulanmamış", { status: 401 });
    }

    const body = await req.json();
    const { siteName, contactInfo, socialMedia, metaData } = body;

    if (!siteName) {
      return new NextResponse("Site adı gerekli", { status: 400 });
    }

    const settings = await prismadb.settings.updateMany({
      data: {
        siteName,
        contactInfo,
        socialMedia,
        metaData,
      },
    });

    return NextResponse.json(settings);
  } catch {
    return new NextResponse("Dahili sunucu hatası", { status: 500 });
  }
}

export async function DELETE() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Kimlik doğrulanmamış", { status: 401 });
    }

    const settings = await prismadb.settings.deleteMany();
    return NextResponse.json(settings);
  } catch {
    return new NextResponse("Dahili sunucu hatası", { status: 500 });
  }
}
