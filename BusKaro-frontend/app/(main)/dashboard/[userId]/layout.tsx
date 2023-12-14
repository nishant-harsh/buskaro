import { Metadata } from "next"
import Image from "next/image"

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/sidebar-nav";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard role based.",
}

const sidebarNavItems = [
  {
    title: "Profile",
    href: "profile",
  },
  {
    title: "Add Bus",
    href: "addBus",
  },
  {
    title: "Create Route",
    href: "addRoute",
  },
  {
    title: "Update Bus",
    href: "updateBus",
  },
  {
    title: "Delete Bus",
    href: "deleteBus",
  },
  {
    title: "Booking",
    href: "bookings",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="hidden space-y-6 p-10 pb-16 md:block backdrop-blur-sm min-h-[calc(100vh-92px)]">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Manage your account settings and bookings.
          </p>
        </div>
        <Separator className="my-6 " />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5 border-r">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}
