import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/heading";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { getProducts } from "@/actions/get-products";
import { Button } from "@/components/ui/button";
import { MessageCircle, Plus } from "lucide-react";
import Link from "next/link";
import { getLatestMessages } from "@/actions/get-messages";
import { LatestMessages } from "@/components/ui/latest-messages";
import { MessageColumn } from "./messages/components/columns";

const DashboardPage = async () => {
  const products = await getProducts();
  const messages = await getLatestMessages();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading
          title="Dashboard"
          description="Mağaza istatistiklerinize genel bakış"
        />
        <Separator />
      </div>
      <div className="px-8">
        <div className="grid gap-4 grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Ürünler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                  <h3 className="text-2xl font-bold">Toplam Ürün Sayısı:</h3>
                  <p className="text-xl font-bold text-muted-foreground">
                    {products.length}
                  </p>
                </div>
                <Link
                  href="/admin/products/new"
                  className="flex items-center justify-end space-x-4"
                >
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Ürün Ekle
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Mesajlar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                  <h3 className="text-2xl font-bold">Son Mesajlar:</h3>
                  <p className="text-xl font-bold text-muted-foreground">
                    {messages.length}
                  </p>
                </div>
                <Link
                  href="/admin/messages"
                  className="flex items-center justify-end space-x-4"
                >
                  <Button variant="outline" size="sm">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Tüm Mesajlar
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-8">
          <LatestMessages messages={messages as unknown as MessageColumn[]} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
