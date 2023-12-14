"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();
  const { state } = useAuth();
  const { user } = state;

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-4",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <>
        {user.role === "admin" && (item.title == "Add Bus" || item.title == "Profile" || item.title == "Create Route" || item.title == "Update Bus" || item.title == "Delete Bus" ) && (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname.split("/")[3] === item.href
                ? "bg-white hover:bg-muted"
                : "hover:bg-muted hover:border hover:underline",
              "justify-start p-4"
            )}
          >
            {item.title}
          </Link>
        )}
        {user.role === "user" && (item.title == "Profile" || item.title == "Booking") && (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname.split("/")[3] === item.href
                ? "bg-white hover:bg-muted"
                : "hover:backdrop-blur-sm hover:border hover:underline",
              "justify-start p-4"
            )}
          >
            {item.title}
          </Link>
        )}</>
      ))}
    </nav>
  );
}
