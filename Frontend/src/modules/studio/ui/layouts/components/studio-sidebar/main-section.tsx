import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useAuth } from "@clerk/clerk-react";
import { useClerk } from "@clerk/nextjs";
import { FlameIcon, HomeIcon, PlaySquareIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
    {
      title: "Home",
      url: "/",
      icon: HomeIcon,
    },
    {
      title: "Subscriptions",
      url: "/feed/subscriptions",
      icon: PlaySquareIcon,
      auth: true,
    },
    {
      title: "Trending",
      url: "/feed/trending",
      icon: FlameIcon,
    },
  ];
  
  export const MainSection = () => {
    const clerk=useClerk();
    const {isSignedIn}=useAuth()
    const pathname=usePathname()
    return (
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild 
                tooltip={item.title}
                isActive={pathname===item.url}
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
  