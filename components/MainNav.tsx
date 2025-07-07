"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function MainNav({ className }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  const routes = [
    {
      href: `/admin`,
      label: "Dashboard",
      active: pathname === `/admin`,
    },
    {
      href: `/admin/products`,
      label: "Ürünler",
      active: pathname === `/admin/products`,
    },
    {
      href: `/admin/billboards`,
      label: "Billboard",
      active: pathname === `/admin/billboards`,
    },
    {
      href: `/admin/categories`,
      label: "Kategori",
      active: pathname === `/admin/categories`,
    },
    {
      href: `/admin/messages`,
      label: "Mesajlar",
      active: pathname === `/admin/messages`,
    },
    {
      href: `/admin/settings`,
      label: "Ayarlar",
      active: pathname === `/admin/settings`,
    },
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
