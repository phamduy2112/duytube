'use client'
import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/components/user-avatar"
import { SubscriptionButton } from "@/modules/subscriptions/ui/components/subscription-button"
import { UserInfo } from "@/modules/user/ui/components/user-info"
import { useAuth } from "@clerk/nextjs"
import Link from "next/link"


export const VideoOwner=({user,videoId})=>{

    const {userId:clerkUserId}=useAuth()
    return (
        <div className="flex items-center sm:items-start justify-between sm:justify-start gap-3 min-w-0">
            <Link href={`/users/${user.id}`} >
                <div className="flex items-center sm:items-start gap-3 min-w-0">
                    <UserAvatar size="lg" imageUrl="https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/496150454_3799684950248327_219587134787243704_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=JoJycapiivkQ7kNvwETfRna&_nc_oc=AdnI0UiR2vtsakP9xxDf8G3C9uGBZ4mwWjPkMnw3sLrj0J3HMUbfzdnw8hcTspUvCm8&_nc_zt=23&_nc_ht=scontent.fsgn8-4.fna&_nc_gid=6F9tezMaYV8NvcHwAsHFTQ&oh=00_AfKZET1ZBz-8PAcYzLKYaOKx0Njib3cC5CwGONn4EdBOdA&oe=68295B9B" name={user.name}/>
                    <div className="flex flex-col gap-1 min-w-0">
                    <UserInfo size="lg" name={user.name}/>
                    <span className="text-sm text-muted-foreground line-clamp-1">
                        {0} subscribres
                    </span>
                    </div>
                </div>
            </Link>
            {
                clerkUserId===user.clerkId?(
                    <Button
                    variant="secondary"
                    className="rounded-full"
                    asChild
                    >
                        <Link href={`/studio/videos/${videoId}`}>
                        Edit video</Link>
                    </Button>
                ):(
                    <SubscriptionButton 
                    
                    onClick={()=>{}}
                    disabled={false}
                    isSuscribed={false}
                    className="flex-none"
                    />
                )
            }
        </div>
    )
}