import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/user-avatar";
import { subscriptions } from "@/scripts/seed-catelogries";
import { FlameIcon, HistoryIcon, HomeIcon, ListIcon, ListVideoIcon, PlaySquareIcon, ThumbsUpIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";


export const LoadingSkeleton=()=>{
    <>
    {[1,2,3,4].map((i)=>(
        <SidebarMenuItem key={i}>
            <SidebarMenuButton disabled>
                <Skeleton className="size-6 rounded-full shrink-0"></Skeleton>
                <Skeleton className="h-4 w-full"></Skeleton>
            </SidebarMenuButton>
        </SidebarMenuItem>
    ))}
    </>
}
  
  export const SubscriptionsSection = () => {
   const isLoading=false
    const pathname=usePathname()
    return (
      <SidebarGroup>
        <SidebarGroupLabel>Subscriptions</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {subscriptions?.map((subscription) => (
              <SidebarMenuItem key={`${subscription.creatorId}-${subscription.viewerID}`}>
                <SidebarMenuButton asChild 
                tooltip={subscription.user.name}
                isActive={pathname===`/user/${subscription.user.id}`}
                
                >
                  <Link href={`/user/${subscription.user.id}`} className="flex items-center gap-4">
                  <UserAvatar
                  size="xs"
                  imageUrl={subscription.user.imageUrl}
                  name={subscription.user.name}>

                  </UserAvatar>
                  <span className="text-sm">{subscription.user.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            {
                !isLoading&&(
                    <SidebarMenuItem>
                        <SidebarMenuButton
                        asChild
                        isActive={pathname==="/subscriptions"}
                        >
                            <Link href="">
                            <ListIcon className="size-4"></ListIcon>
                            <span className="text-sm">All Subscriptions</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                )
            }
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  };
  