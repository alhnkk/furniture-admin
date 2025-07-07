import { format } from "date-fns";
import { tr } from "date-fns/locale";

import { getMessages } from "@/actions/get-messages";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/heading";
import { MessageColumn, columns } from "./components/columns";

export default async function MessagesPage() {
  const messages = await getMessages();

  const formattedMessages: MessageColumn[] = messages.map((message) => ({
    id: message.id,
    name: message.name,
    email: message.email,
    phone: message.phone,
    message: message.message,
    createdAt: format(new Date(message.createdAt), "d MMMM yyyy HH:mm", {
      locale: tr,
    }),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading
          title={`Mesajlar (${messages.length})`}
          description="İletişim formundan gelen mesajlar"
        />
        <Separator />
        <DataTable
          columns={columns}
          data={formattedMessages}
          searchKey="name"
          filterKey="email"
        />
      </div>
    </div>
  );
}
