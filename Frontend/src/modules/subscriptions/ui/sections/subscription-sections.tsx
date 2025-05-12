"use client"

import { VideoGridCard, VideoGridCardSkeleton } from "@/modules/videos/ui/components/video-grid-card"
import { VideoRowCard, VideoRowCardSkeleton } from "@/modules/videos/ui/components/video-row-card"
import { mockVideos, subscriptions } from "@/scripts/seed-catelogries"
import { SubscriptionItem, SubscriptionItemSkeleton } from "../components/subscription-item"


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
    return (
        <>
         <div className="flex flex-col gap-4">
            {subscriptions.map((subscription)=>(
                <SubscriptionItem
                name={subscription.user.name}
                imageUrl={subscription.user.imageUrl}
                subscriberCount={3}
                disabled={false}
                ></SubscriptionItem>
            ))}</div> 
          
        </>
    )
}