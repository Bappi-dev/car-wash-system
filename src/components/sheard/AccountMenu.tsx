"use client";

import { useState } from "react";
import { Menu } from "@base-ui/react/menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, LayoutDashboard, LogOut, UserRound } from "lucide-react";

import { toast } from "@/components/ui/toast";
import { signOut } from "@/lib/auth-client";

type AccountMenuProps = {
  name: string;
  email: string;
  role?: string;
};

const menuItemClassName =
  "flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-700 outline-none transition-colors data-highlighted:bg-slate-100 data-highlighted:text-slate-950";

const AccountMenu = ({ user }: { user: AccountMenuProps }) => {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      const { error } = await signOut();

      if (error) {
        toast.add({
          description: error.message,
          type: "error",
        });
        return;
      }

      router.replace("/sign-up");
      router.refresh();
    } catch (error) {
      toast.add({
        description:
          error instanceof Error ? error.message : "Unable to sign out.",
        type: "error",
      });
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <Menu.Root>
      <Menu.Trigger className="inline-flex items-center gap-2 whitespace-nowrap rounded-md outline-none transition-colors hover:text-amber-300 focus-visible:ring-2 focus-visible:ring-amber-300">
        <UserRound aria-hidden="true" className="size-4" />
        <span className="max-w-28 truncate">{user?.name}</span>
        <ChevronDown aria-hidden="true" className="size-3.5" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner className="z-50 outline-none" sideOffset={8} align="end">
          <Menu.Popup className="min-w-56 rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg shadow-slate-950/10 outline-none">
            <div className="border-b border-slate-100 px-3 py-2">
              <p className="truncate text-sm font-medium text-slate-900">
                {user?.name}
              </p>
              <p className="truncate text-xs text-slate-500">{user?.email}</p>
            </div>
            <Menu.Item
              className={menuItemClassName}
              render={<Link href={`/dashboard/${user.role || "user"}`} />}
            >
              <LayoutDashboard aria-hidden="true" className="size-4" />
              Dashboard
            </Menu.Item>
            <Menu.Item
              className={menuItemClassName}
              render={<Link href="/profile" />}
            >
              <UserRound aria-hidden="true" className="size-4" />
              My profile
            </Menu.Item>
            <Menu.Separator className="my-1 h-px bg-slate-100" />
            <Menu.Item
              className={`${menuItemClassName} text-rose-700 data-highlighted:text-rose-800`}
              disabled={isSigningOut}
              onClick={handleSignOut}
            >
              <LogOut aria-hidden="true" className="size-4" />
              {isSigningOut ? "Signing out..." : "Sign out"}
            </Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
};

export default AccountMenu;
