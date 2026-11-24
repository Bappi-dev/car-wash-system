import React from "react";

import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import {
  SidebarInset,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboardUser/DashboardSidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/sheard/Navbar";
import Header from "@/components/sheard/Header";
import { Toaster } from "@/components/ui/toast";

const DashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });
  const user = session
    ? {
        name: session.user.name,
        email: session.user.email,
        role: session.user.role,
      }
    : null;

  return (
    <TooltipProvider>
      <Toaster />
      <SidebarProvider>
        <DashboardSidebar user={user} />
        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center gap-3 border-b px-4">
            <SidebarTrigger aria-label="Toggle dashboard sidebar" />
            <SidebarSeparator orientation="vertical" className="h-4" />
            <p className="text-sm font-medium">Dashboard</p>
          </header>
          <main className="min-w-0 flex-1 p-4 md:p-8">
            {children}</main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
};

export default DashboardLayout;