"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { HistoryIcon, ThumbsUpIcon, ListVideoIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useUser, SignInButton } from "@clerk/nextjs";

const items = [
  { title: "History", url: "/playlists/history", icon: HistoryIcon, auth: true },
  { title: "Subscriptions", url: "/playlists/liked", icon: ThumbsUpIcon, auth: true },
  { title: "All playlists", url: "/playlists", icon: ListVideoIcon, auth: true },
];

export const PersonalSection = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { isSignedIn } = useUser();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>You</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                {isSignedIn || !item.auth ? (
                  <button
                    className="flex items-center gap-4 w-full text-left"
                    onClick={() => router.push(item.url)}
                  >
                    <item.icon />
                    <span className="text-sm">{item.title}</span>
                  </button>
                ) : (
                  <SignInButton mode="modal">
                    <button className="flex items-center gap-4 w-full text-left">
                      <item.icon />
                      <span className="text-sm">{item.title}</span>
                    </button>
                  </SignInButton>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
