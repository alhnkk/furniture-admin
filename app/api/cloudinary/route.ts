import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  const { url } = await req.json();

  if (!url) {
    return new NextResponse("URL gerekli", { status: 400 });
  }

  try {
    const result = await cloudinary.uploader.upload(url, {
      folder: "derya-mimarlik",
    });

    return NextResponse.json(result);
  } catch (error) {
    console.log("[CLOUDINARY_ERROR]", error);
    return new NextResponse("Resim yükleme hatası", { status: 500 });
  }
}
