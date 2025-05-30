import { UserAvatar } from "@/components/user-avatar"
import { VideoGridCard } from "@/modules/videos/ui/components/video-grid-card"
import { mockVideos } from "@/scripts/seed-catelogries"


//  co sus

export const SubcribedVideosSection=({data}:any)=>{
  
    return (
        <div>
     
           
  {data?.map((video:any)=>(
            <>
               <div className="flex  items-center gap-[.5rem]">
                 <UserAvatar
                          size="lg"
                          imageUrl={video?.users_subscriptions_creator_idTousers?.avatar_url || "/placeholder.svg"}
                          name={video?.users_subscriptions_creator_idTousers?.channel_name || "User"}
                        />
               <p className="font-semibold"> {video?.users_subscriptions_creator_idTousers?.channel_name}</p>
            </div>
                {video?.users_subscriptions_creator_idTousers?.videos?.length>0 ?
                video?.users_subscriptions_creator_idTousers?.videos.map((video:any)=>{
                return <div className="gap-4 grid grid-cols-1 sm:gird-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
                                     <VideoGridCard key={video.id} data={video?.users_subscriptions_creator_idTousers?.videos}/>
                </div>
            })
                
                :<div className="mt-[.5rem]">Chưa có video</div>}
         

            </>
           
            ))}
            </div>
          

    )
}