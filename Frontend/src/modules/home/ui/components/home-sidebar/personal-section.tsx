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
import { Skeleton } from "@/components/ui/skeleton";

export const PersonalSectionSkeleton = () => {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {Array.from({ length: 3 }).map((_, index) => (
            <SidebarMenuItem key={index}>
              <div className="flex items-center gap-4 px-3 py-2">
                <Skeleton className="h-5 w-5 rounded" /> {/* Icon placeholder */}
                <Skeleton className="h-4 w-24" />         {/* Title placeholder */}
              </div>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export const PersonalSection = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { isSignedIn } = useUser();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>You</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item:any) => (
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
