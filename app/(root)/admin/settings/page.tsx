"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  siteName: z.string().min(1, "Site adı gereklidir"),
  contactInfo: z
    .object({
      address: z.string().optional(),
      phone: z.string().optional(),
      email: z.string().optional(),
      workingHours: z.string().optional(),
    })
    .optional(),
  socialMedia: z
    .object({
      facebook: z.string().optional(),
      instagram: z.string().optional(),
      twitter: z.string().optional(),
      linkedin: z.string().optional(),
    })
    .optional(),
  metaData: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      keywords: z.string().optional(),
    })
    .optional(),
});

type SettingsFormValues = z.infer<typeof formSchema>;

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<SettingsFormValues | null>(null);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      siteName: "",
      contactInfo: {
        address: "",
        phone: "",
        email: "",
        workingHours: "",
      },
      socialMedia: {
        facebook: "",
        instagram: "",
        twitter: "",
        linkedin: "",
      },
      metaData: {
        title: "",
        description: "",
        keywords: "",
      },
    },
  });

  useEffect(() => {
    const getSettings = async () => {
      try {
        const response = await axios.get("/api/settings");
        if (response.data) {
          setSettings(response.data);
          form.reset(response.data);
        }
      } catch {
        toast.error("Ayarlar yüklenirken hata oluştu!");
      }
    };
    getSettings();
  }, [form]);

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setLoading(true);
      if (settings) {
        await axios.patch("/api/settings", data);
      } else {
        await axios.post("/api/settings", data);
      }
      router.refresh();
      toast.success("Ayarlar güncellendi.");
    } catch {
      toast.error("Bir hata oluştu!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading
          title="Site Ayarları"
          description="Site adı, iletişim bilgileri, sosyal medya hesapları ve meta verileri gibi genel site ayarlarını yönetin"
        />
        <Separator />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <div className="grid grid-cols-1 gap-8">
              <FormField
                control={form.control}
                name="siteName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Site Adı</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Site adını girin"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">İletişim Bilgileri</h2>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="contactInfo.address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adres</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={loading}
                          placeholder="Adres bilgisi girin"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactInfo.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefon</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Telefon numarası girin"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactInfo.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-posta</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="E-posta adresi girin"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactInfo.workingHours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Çalışma Saatleri</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Çalışma saatlerini girin"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Sosyal Medya</h2>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="socialMedia.facebook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facebook</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Facebook URL"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="socialMedia.instagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Instagram URL"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="socialMedia.twitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Twitter URL"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="socialMedia.linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="LinkedIn URL"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Meta Veriler</h2>
              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="metaData.title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Başlık</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Meta başlık girin"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="metaData.description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Açıklama</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={loading}
                          placeholder="Meta açıklama girin"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="metaData.keywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Anahtar Kelimeler</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Anahtar kelimeleri virgülle ayırarak girin"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button disabled={loading} type="submit" className="ml-auto">
              Kaydet
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
