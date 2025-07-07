import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

import prismadb from "@/lib/prismadb";

// Input validation schema
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Ad en az 2 karakter olmalıdır")
    .max(50, "Ad çok uzun"),
  email: z.string().email("Geçerli bir email adresi giriniz"),
  phone: z
    .string()
    .regex(/^[0-9]{10,11}$/, "Geçerli bir telefon numarası giriniz"),
  message: z
    .string()
    .min(10, "Mesaj en az 10 karakter olmalıdır")
    .max(1000, "Mesaj çok uzun"),
});

// Only admin can view messages
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Yetkisiz erişim", { status: 401 });
    }

    const contact = await prismadb.contact.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.error("[CONTACT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// Public can submit contact form
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate input
    const validatedData = contactSchema.parse(body);

    const contact = await prismadb.contact.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        message: validatedData.message,
      },
    });

    return NextResponse.json(contact);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(error.errors[0].message, { status: 400 });
    }

    console.error("[CONTACT_POST]", error);
    return new NextResponse("Mesajınız gönderilemedi", { status: 500 });
  }
}

// Only admin can delete messages
export async function DELETE(req: Request) {
  try {
    const { userId } = await auth();
    const { searchParams } = new URL(req.url);
    const contactId = searchParams.get("contactId");

    if (!userId) {
      return new NextResponse("Yetkisiz erişim", { status: 401 });
    }

    if (!contactId) {
      return new NextResponse("Contact ID gerekli", { status: 400 });
    }

    const contact = await prismadb.contact.delete({
      where: {
        id: contactId,
      },
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.error("[CONTACT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
