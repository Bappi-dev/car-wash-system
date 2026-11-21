import { LucideIcon } from "lucide-react";

export type TUsersRole = "admin" | "user" | "branchManager";


export type TUser = {
     name: string,
     email: string, 
     role?: string | null;
}


export type  TDashboardSidebarItem = {
      title: string ,
      href: string , 
      icon: LucideIcon,
      roles?: TUsersRole[];
}