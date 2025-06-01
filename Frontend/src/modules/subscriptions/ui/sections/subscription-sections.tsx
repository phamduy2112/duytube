"use client"

import { VideoGridCard, VideoGridCardSkeleton } from "@/modules/videos/ui/components/video-grid-card"
import { VideoRowCard, VideoRowCardSkeleton } from "@/modules/videos/ui/components/video-row-card"
import { mockVideos, subscriptions } from "@/scripts/seed-catelogries"
import { SubscriptionItem, SubscriptionItemSkeleton } from "../components/subscription-item"
import { useQuery } from "@tanstack/react-query"
import { SubscriptionsService } from "@/service/axios/subscriptions/subscriptions.service"
import { useUser } from "@clerk/nextjs"
import { UserService } from "@/service/axios/user/user.service"
import { useUserSubscriptions } from "@/hooks/api/use-user"


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
  const {data}=useUserSubscriptions(user?.id)

    return (
        <>
         <div className="flex flex-col gap-4">
            {data?.subscriptions_subscriptions_viewer_idTousers?.map((subscription:any,index:number)=>(
              <div className="w-[300px] md:w-[450px] lg:w-[650px] 2xl:w-[700px]" key={index}>
                  <SubscriptionItem
                name="duy"
                imageUrl={subscription?.users_subscriptions_creator_idTousers?.avatar_url}
                subscriberCount={data?.subscriptions_subscriptions_creator_idTousers?.length}
                disabled={false}

                ></SubscriptionItem>
              </div>
            ))}
        
            </div> 
 
        </>
    )
}