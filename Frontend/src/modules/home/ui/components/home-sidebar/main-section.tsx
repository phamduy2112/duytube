import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useAuth } from "@clerk/clerk-react";
import { useClerk } from "@clerk/nextjs";
import { FlameIcon, HomeIcon, PlaySquareIcon } from "lucide-react";
import Link from "next/link";

const items = [
    {
      title: "Home",
      url: "/",
      icon: HomeIcon,
    },
    {
      title: "Subscriptions",
      url: "/feed/subscribed",
      icon: PlaySquareIcon,
    },
    {
      title: "Trending",
      url: "/feed/trending",
      icon: FlameIcon,
    },
  ];
import { Skeleton } from "@/components/ui/skeleton";

export const MainSectionSkeleton = () => {
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

  export const MainSection = () => {
    const clerk=useClerk();
    const {isSignedIn}=useAuth()
    return (
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item:any) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild 
                tooltip={item.title}
                isActive={false}
                onClick={(e)=>{
                  if(!isSignedIn&&item.auth){
                    e.preventDefault();
                    return clerk.openSignIn()
                  }
                }}
                
                >
                  <Link href={item.url} className="flex items-center gap-4">
                  <item.icon />
                  <span className="text-sm">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  };
  