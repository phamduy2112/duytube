"use client"

import { VideoGridCard, VideoGridCardSkeleton } from "@/modules/videos/ui/components/video-grid-card"
import { VideoRowCard, VideoRowCardSkeleton } from "@/modules/videos/ui/components/video-row-card"
import { mockVideos, subscriptions } from "@/scripts/seed-catelogries"
import { SubscriptionItem, SubscriptionItemSkeleton } from "../components/subscription-item"
import { useQuery } from "@tanstack/react-query"
import { SubscriptionsService } from "@/service/axios/subscriptions/subscriptions.service"
import { useUser } from "@clerk/nextjs"


//  co sus
const SubscriptionsSectionSekeleton=()=>{
    return     <div>
            <div className="flex flex-col gap-4">
  {Array.from({length:18}).map((_,index)=>(
                <SubscriptionItemSkeleton key={index} />
            ))}
            </div>
         
          
        </div>
}
export const SubscriptionsSection=()=>{
      const {user}=useUser()
const {data}=useQuery({
      queryKey:["subscriptions",user?.id],
      queryFn:()=>SubscriptionsService.findMySubscriptions(user!.id),
      enabled:!!user?.id,

    })

    return (
        <>
         <div className="flex flex-col gap-4">
            {data?.subscriptions_subscriptions_viewer_idTousers?.map((subscription:any)=>(
              <div className="w-[600px]">
                  <SubscriptionItem
                name={subscription?.users_subscriptions_creator_idTousers?.channel_name}
                imageUrl={subscription?.users_subscriptions_creator_idTousers?.avatar_url}
                subscriberCount={3}
                disabled={false}

                ></SubscriptionItem>
              </div>
            ))}
        
            </div> 
 
        </>
    )
}