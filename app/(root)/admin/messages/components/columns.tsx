"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreHorizontal,
  Trash,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertModal } from "@/components/modals/alert-modal";
import { deleteMessage } from "@/actions/delete-message";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export type MessageColumn = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
};

const MessageCell = ({ message }: { message: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const shortMessage =
    message.length > 100 ? message.substring(0, 100) + "..." : message;

  return (
    <>
      <div className="flex items-center gap-2">
        <span className="truncate max-w-[300px]" title={message}>
          {shortMessage}
        </span>
        {message.length > 100 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(true)}
            className="h-6 w-6 p-0"
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Mesaj Detayı</DialogTitle>
          </DialogHeader>
          <div className="mt-4 whitespace-pre-wrap">{message}</div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const columns: ColumnDef<MessageColumn>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          İsim
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const email = row.original.email;
      return (
        <a
          href={`mailto:${email}`}
          className="text-blue-600 hover:underline"
          title={`${email} adresine email gönder`}
        >
          {email}
        </a>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Telefon",
    cell: ({ row }) => {
      const phone = row.original.phone;
      return (
        <a
          href={`tel:${phone}`}
          className="text-blue-600 hover:underline"
          title={`${phone} numarasını ara`}
        >
          {phone}
        </a>
      );
    },
  },
  {
    accessorKey: "message",
    header: "Mesaj",
    cell: ({ row }) => <MessageCell message={row.original.message} />,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tarih
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell data={row.original} />,
  },
];

function ActionCell({ data }: { data: MessageColumn }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      const result = await deleteMessage(data.id);

      if (result) {
        toast.success("Mesaj silindi");
        router.refresh();
      }
    } catch (error) {
      toast.error("Bir hata oluştu");
      console.error(error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0" disabled={loading}>
            <span className="sr-only">Menüyü aç</span>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <MoreHorizontal className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="text-red-600"
            disabled={loading}
          >
            <Trash className="mr-2 h-4 w-4" />
            Sil
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
