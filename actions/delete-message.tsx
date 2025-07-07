"use server";

import prismadb from "@/lib/prismadb";

export const deleteMessage = async (id: string) => {
  if (!id) {
    throw new Error("Mesaj ID'si gerekli");
  }

  try {
    const message = await prismadb.contact.delete({
      where: { id },
    });
    return message;
  } catch (error) {
    console.error("[DELETE_MESSAGE_ERROR]", error);
    throw new Error("Mesaj silinirken bir hata oluştu.");
  }
};
