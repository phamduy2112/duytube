import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { UserAvatar } from "@/components/user-avatar"
import { cn } from "@/lib/utils"
import { SubscriptionButton } from "@/modules/subscriptions/ui/components/subscription-button"
import Link from "next/link"
import UserNavBar from "./user-navbar"
export const UserPageInfoSkeleton=()=>{
    return (
        <div className="py-6">
            <div className="flex flex-col md:hidden">
                <div className="flex items-center gap-3">
                    <Skeleton className="h-[60px] w-[60px] rounded-full"/>
                    <div className="flex-1 min-w-0">
                        <Skeleton className="h-6 w-32"/>
                        <Skeleton className="h-4 w-48 mt-1"/>

                    </div>
                </div>
                                        <Skeleton className="h-10 w-full mt-3 rounded-full"/>

            </div>
            <div className="hidden  md:flex items-start gap-4">
                    <Skeleton className="h-[160px] w-[160px] rounded-full"/>
                    <div className="flex-1 min-w-0">
                        <Skeleton className="h-8 w-64"/>
                        <Skeleton className="h-5 w-48 mt-4"/>

                    </div>
                    <Skeleton className="h-10 w-32 mt-3 rounded-full"/>

            </div>
        </div>
    )
}


export const UserPageInfo=({user})=>{
    const isPending=false;
    const isLoaded=true
        const userId=1
    return (
        <div className="py-6">
            <div className="flex flex-col md:hidden">
                <div className="flex items-center gap-3">
                    <UserAvatar 
                    size="lg"
                    imageUrl={user.imageUrl}
                    name={user.name}
                    className="h-[60px] w-[60px]"
                        // onClick={()=>{
                        //     if(user.clerkId==userId){
                        //         clerk.openUserProfile()
                        //     }
                        // }}
                    />
                    <div className="flex-1 min-w-0">
                        <h1 className="text-xl font-bold">{user.name}</h1>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <span>{user.subscriberCount} subscribers</span>
                            <span>|</span>
                            <span>{user.videoCount} videos</span>
                        </div>
                    </div>
                </div>
                {/* {userId===user.clerkId&&} */}
                {/* <Button
                variant="secondary"
                asChild
                className="w-full mt-3 rounded-full"
                >
                    <Link href="/studio">Go to studio</Link>

                </Button> */}
                {/* <SubscriptionButton
                disabled={isPending||!isLoaded}
                isSuscribed={user}
                onClick={onclick}
                className="flex-none"
                /> */}
            </div>
            {/*  */}
                   <div className="hidden flex-col md:flex">
                <div className="flex items-center gap-3">
                    <UserAvatar 
                    size="lg"
                    imageUrl={user.imageUrl}
                        name={user.name}
                        className={cn(userId===user.clerkId && "cursor-pointer hover:opacity-80 transition-opacity","w-[100px] h-[100px]")}
                        // onClick={()=>{
                        //     if(user.clerkId==userId){
                        //         clerk.openUserProfile()
                        //     }
                        // }}
                    />
                    <div className="flex-1 min-w-0">
                        <h1 className="text-3xl font-bold">{user.name}</h1>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <span>2 subscribers</span>
                            <span>|</span>
                            <span>1 videos</span>
                        </div>
                        <div>
                            • This channel is to share beautiful lyrics video and promote good melody songs
                        </div>
                         <div>
                  <SubscriptionButton
                disabled={isPending||!isLoaded}
                isSuscribed={false}
                // onClick={onclick}
                className="flex-none"
                />
                
            </div>
                    </div>
                    
                </div>
                {/* {userId===user.clerkId?(
<Button
                variant="secondary"
                asChild
                className="mt-3 rounded-full"
                >
                    <Link href="/studio">Go to studio</Link>

                </Button> 
                ) :(
  <SubscriptionButton
                disabled={isPending||!isLoaded}
                isSuscribed={user}
                // onClick={onclick}
                className="flex-none"
                />

                )}
                */}
           
            
         
            </div>
        </div>
    )
}