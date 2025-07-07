import prismadb from "@/lib/prismadb";

export const getMessages = async () => {
  try {
    const messages = await prismadb.contact.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return messages;
  } catch (error) {
    console.error("[GET_MESSAGES_ERROR]", error);
    throw new Error("Mesajlar yüklenirken bir hata oluştu.");
  }
};

export const getLatestMessages = async () => {
  try {
    const messages = await prismadb.contact.findMany({
      take: 3,
      orderBy: {
        createdAt: "desc",
      },
    });
    return messages;
  } catch (error) {
    console.error("[GET_LATEST_MESSAGES_ERROR]", error);
    throw new Error("Son mesajlar yüklenirken bir hata oluştu.");
  }
};
