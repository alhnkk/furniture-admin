import { MessageColumn, columns } from "./columns";
import Heading from "@/components/ui/heading";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

interface MessageClientProps {
  data: MessageColumn[];
}

export const MessageClient: React.FC<MessageClientProps> = ({ data }) => {

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={data.length > 0 ? `Mesaj (${data.length})` : "Mesaj"}
          description="Mesajlarınızı yönetin"
        />
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="Mesaj için API Çağrıları" />
      <Separator />
      <ApiList entityName="messages" entityIdName="messageId" />
    </>
  );
};
