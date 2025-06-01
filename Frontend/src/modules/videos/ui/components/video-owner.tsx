'use client'
import { RequireLoginWrapper } from "@/components/require-login"
import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/components/user-avatar"
import { SubscriptionButton } from "@/modules/subscriptions/ui/components/subscription-button"
import { UserInfo } from "@/modules/user/ui/components/user-info"
import { SubscriptionsService } from "@/service/axios/subscriptions/subscriptions.service"
import { useAuth, useUser } from "@clerk/nextjs"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import { useEffect, useState } from "react"

interface TypeVideoOwner{
    user:any,
    videoId:String,
}

export const VideoOwner=({user,videoId}:TypeVideoOwner)=>{

    const {user:userDetail,isSignedIn}=useUser()
    const [subscribres,setSubscribres]=useState(false)
    const queryClient=useQueryClient();
    const {mutate:toggleReactionSubscription}=useMutation({
        mutationFn:SubscriptionsService.toggleSubscriptions,
        onSuccess:(data)=>{
          queryClient.invalidateQueries({ queryKey: ["subscriptions", data] });
            

        },
        onError:(data)=>{

        }
    })
    const viewerId:any = userDetail?.id;
    const creatorId:any  = user?.id;
    const {data:statusSubscription}=useQuery({
        queryKey:["subscriptions", viewerId, creatorId],
        queryFn:()=>SubscriptionsService.StatusSubscriptions(viewerId,creatorId),
        enabled:!!viewerId&&!!creatorId
    })
    const handleToggleReactionSubscription=()=>{
        const response:any={
             viewerId: userDetail?.id,
             creatorId: creatorId
        }
        if(!isSignedIn){
            return
        }
        toggleReactionSubscription(response)
      
    }
    useEffect(() => {
        setSubscribres(statusSubscription?.subscribed ?? false);
      }, [statusSubscription?.subscribed]);

    
    return (
        <div className="flex items-center sm:items-start justify-between sm:justify-start gap-3 min-w-0">
            <Link href={`/user/${user?.clerk_user_id}`} >
                <div className="flex items-center sm:items-start gap-3 min-w-0">
                    <UserAvatar size="lg" imageUrl="https://i.pravatar.cc/150?img=1" name={user?.name}/>
                    <div className="flex flex-col gap-1 min-w-0">
                    <UserInfo size="lg" name={user?.channel_name}/>
                    <span className="text-sm text-muted-foreground line-clamp-1">
                        {user?.subscriptions_subscriptions_creator_idTousers?.length} subscribres
                    </span>
                    </div>
                </div>
            </Link>
            {
                viewerId==user?.clerk_user_id?(
                    <Button
                    variant="secondary"
                    className="rounded-full"
                    asChild
                    >
                        <Link href={`/studio/videos/${videoId}`}>
                        Edit video</Link>
                    </Button>
                ):(
                   <RequireLoginWrapper>
                     <SubscriptionButton 
                    
                    onClick={()=>{
                        handleToggleReactionSubscription()
                    }}
                    disabled={false}
                    isSuscribed={subscribres}
                    className="flex-none"
                    />
                   </RequireLoginWrapper>
                )
            }
        </div>
    )
}