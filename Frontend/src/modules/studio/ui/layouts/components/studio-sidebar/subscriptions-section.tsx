import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/user-avatar";
// import { subscriptions } from "@/scripts/seed-catelogries";
import { SubscriptionsService } from "@/service/axios/subscriptions/subscriptions.service";
import { UserService } from "@/service/axios/user/user.service";
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
      queryFn:()=>UserService.getUser(user!.id),
      enabled:!!user?.id,

    })
console.log("1",data)
    
    // const log=data
    return (
      <SidebarGroup>
        <SidebarGroupLabel>Subscriptions</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
          
            
            {data?.subscriptions_subscriptions_viewer_idTousers?.map((subscription:any) => (
              
              <SidebarMenuItem key={`${subscription.creatorId}-${subscription.viewerID}`}>
                <SidebarMenuButton asChild 
                tooltip="Dyu"
                isActive={pathname==`/user/${subscription?.users_subscriptions_creator_idTousers?.clerk_user_id	}`}
                
                >
                  <Link href={`/user/${subscription?.users_subscriptions_creator_idTousers?.clerk_user_id}`} className="flex items-center gap-4">
                  <UserAvatar
                  size="xs"
                  imageUrl={subscription?.users_subscriptions_creator_idTousers?.avatar_url	}
                  name={subscription?.users_subscriptions_creator_idTousers?.channel_name	}>

                  </UserAvatar>
              <p>      </p>
                  <span className="text-sm">{subscription?.users_subscriptions_creator_idTousers?.channel_name	}</span>
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
  