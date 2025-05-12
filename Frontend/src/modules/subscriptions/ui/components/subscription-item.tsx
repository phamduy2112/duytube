import { UserAvatar } from "@/components/user-avatar"
import { SubscriptionButton } from "./subscription-button"
import { Skeleton } from "@/components/ui/skeleton"
export const SubscriptionItemSkeleton=()=>{
    return(
        <div className="flex items-start gap-4">
            <Skeleton className="size-10 rounded-full"/>
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <div>
                        <Skeleton className="h-4 w-24"></Skeleton>
                        <Skeleton className="h-3 mt-1 w-20"></Skeleton>
                    </div>
                    <Skeleton className="h-8 w-20"></Skeleton>
                </div>
            </div>
        </div>
    )
}

export const SubscriptionItem=({
    name,
    imageUrl,
    subscriberCount,
    onUnsubscribe,
    disabled
})=>{
    return(
        <div className="flex items-start gap-4">
            <UserAvatar
            size="lg"
            imageUrl={imageUrl}
            name={name}
            />
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm">
                            {name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            {subscriberCount}
                        </p>
                    </div>
                    <SubscriptionButton
                    size="sm"
                    onClick={(e)=>{
                        e.preventDefault()
                    }}
                    disabled={disabled}
                    isSuscribed
                    />
                     </div>
            </div>
        </div>
    )
}