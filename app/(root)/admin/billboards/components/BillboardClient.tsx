"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { BillboardColumn, columns } from "./Columns";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

interface BillboardClientProps {
  data: BillboardColumn[];  
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const router = useRouter();

  return (    
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={data.length > 0 ? `Billboard (${data.length})` : "Billboard"}
          description="Billboard'larınızı yönetin"
        />
        <Button
          onClick={() => router.push(`/admin/billboards/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Billboard Ekle
        </Button>   
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="label" />
      <Heading title="API" description="Billboard için API Çağrıları" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  );
};
