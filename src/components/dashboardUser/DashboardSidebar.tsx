"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  CalendarCheck,
  CalendarDays,
  Droplets,
  LayoutDashboard,
  User,
  UserRound,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { TDashboardSidebarItem, TUser, TUsersRole } from "@/types";

const roleBasedSidebarItem: Record<TUsersRole, TDashboardSidebarItem[]> = {
  user: [
    {
      title: "Dashboard",
      href: "/dashboard/user",
      icon: LayoutDashboard,
    },
    {
      title: "My Bookings",
      href: "/dashboard/user/bookings",
      icon: CalendarCheck,
    },
    {
      title: "Upcoming Bookings",
      href: "/dashboard/user/bookings/upcoming",
      icon: CalendarDays,
    },
    {
      title: "My profile",
      href: "/profile",
      icon: UserRound,
    },
  ],
  admin: [
    {
      title: "Dashboard",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Bookings",
      href: "/dashboard/admin/bookings",
      icon: CalendarCheck,
    },
    {
      title: "Upcoming Bookings",
      href: "/dashboard/admin/bookings/upcoming",
      icon: CalendarDays,
    },
    {
      title: "Users",
      href: "/dashboard/admin/users",
      icon: User,
    },
    {
      title: "Branches",
      href: "/dashboard/admin/branches",
      icon: Building2,
    },
  ],
  branchManager: [
    {
      title: "Dashboard",
      href: "/dashboard/branchManager",
      icon: LayoutDashboard,
    },

    {
      title: "Services",
      href: "/dashboard/branchManager/services",
      icon: Droplets,
    },
    {
      title: "Bookings",
      href: "/dashboard/branchManager/bookings",
      icon: CalendarCheck,
    },
    {
      title: "Upcoming Bookings",
      href: "/dashboard/branchManager/bookings/upcoming",
      icon: CalendarDays,
    },
    {
      title: "My profile",
      href: "/profile",
      icon: UserRound,
    },
  ],
};

const DashboardSidebar = ({ user }: { user: TUser | null }) => {
  const pathname = usePathname();

  const role = user?.role || "user";
  const sidebarItem =
    roleBasedSidebarItem[role as TUsersRole] ?? roleBasedSidebarItem.user;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <Link
          href="/"
          className="flex items-center gap-3 overflow-hidden"
          aria-label="Car Wash dashboard"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <LayoutDashboard aria-hidden="true" className="size-5" />
          </span>
          <span className="min-w-0 group-data-[collapsible=icon]:hidden">
            <span className="block truncate text-sm font-semibold">
              Car Wash
            </span>
            <span className="block truncate text-xs text-sidebar-foreground/70">
              Customer portal
            </span>
          </span>
        </Link>
      </SidebarHeader>

       <SidebarContent> 
       
            <SidebarGroupContent>
              <SidebarMenu>
                {
                    sidebarItem.map((item) => {
                         const {title, href, icon:Icon} = item;
                         const isActive =
                           pathname === href ||
                           (title !== "Dashboard" && pathname.startsWith(`${href}/`));
                         return <SidebarMenuItem key={href}>
                                 <SidebarMenuButton 
                                 render={<Link href={href} />}
                                 isActive={isActive}
                                 aria-current={isActive ? "page" : undefined}
                                 tooltip={title}
                                  >
                                  <Icon aria-hidden="true"/>
                                   <span>{title}</span>
                                 </SidebarMenuButton>
                         </SidebarMenuItem>
                    })
                }
              </SidebarMenu>
            </SidebarGroupContent>
      </SidebarContent> 

      {user && (
        <SidebarFooter className="mt-auto border-t border-sidebar-border p-3">
          <div className="flex min-w-0 items-center gap-3 rounded-md px-2 py-2">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-sidebar-accent-foreground">
              <UserRound aria-hidden="true" className="size-4" />
            </span>
            <div className="grid min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
              <span className="truncate text-sm font-medium">{user.name}</span>
              <span className="truncate text-xs text-sidebar-foreground/70">
                {user.email}
              </span>
            </div>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
};

export default DashboardSidebar;
