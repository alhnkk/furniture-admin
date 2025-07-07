"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function MainNav({
  className,
  ..._props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  const routes = [
    {
      href: `/`,
      label: "Dashboard",
      active: pathname === `/`, 
    },
    {
      href:`/products`,
      label:"Ürünler",
      active:pathname === `/products`,
    },
    {
      href: `/billboards`,
      label: "Billboard",
      active: pathname === `/billboards`,
    },
    {
      href: `/categories`,
      label: "Kategori",
      active: pathname === `/categories`,
    },
    {
      href: `/messages`,
      label: "Mesajlar",
      active: pathname === `/messages`,
    },
    {
      href: `/settings`,
      label: "Ayarlar",
      active: pathname === `/settings`,
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
