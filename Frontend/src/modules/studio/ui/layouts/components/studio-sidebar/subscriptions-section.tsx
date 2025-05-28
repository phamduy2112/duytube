import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/user-avatar";
// import { subscriptions } from "@/scripts/seed-catelogries";
import { SubscriptionsService } from "@/service/axios/subscriptions/subscriptions.service";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
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
    const {user}=useUser()

    const {data}=useQuery({
      queryKey:["subscriptions",user?.id],
      queryFn:()=>SubscriptionsService.findMySubscriptions(user!.id),
      enabled:!!user?.id,

    })

    console.log(data)
    return (
      <SidebarGroup>
        <SidebarGroupLabel>Subscriptions</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {data?.map((subscription:any) => (
              <SidebarMenuItem key={`${subscription.creatorId}-${subscription.viewerID}`}>
                <SidebarMenuButton asChild 
                tooltip={subscription.channel_name	}
                isActive={pathname===`/user/${subscription.id	}`}
                
                >
                  <Link href={`/user/${subscription.id	}`} className="flex items-center gap-4">
                  <UserAvatar
                  size="xs"
                  imageUrl={subscription.avatar_url	}
                  name={subscription.channel_name	}>

                  </UserAvatar>
                  <span className="text-sm">{subscription.channel_name	}</span>
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
  