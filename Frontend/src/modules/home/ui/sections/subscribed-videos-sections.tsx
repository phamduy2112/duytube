import { Skeleton } from "@/components/ui/skeleton"
import { UserAvatar } from "@/components/user-avatar"
import { useDelayedSkeleton } from "@/hooks/use-delayed-skeleton"
import { VideoGridCard, VideoGridCardSkeleton } from "@/modules/videos/ui/components/video-grid-card"
import { VideoRowCard, VideoRowCardSkeleton } from "@/modules/videos/ui/components/video-row-card"
import { mockVideos } from "@/scripts/seed-catelogries"


//  co sus

export const SubcribedVideosSection=({data,selected}:any)=>{
    const showSkeleton=useDelayedSkeleton(500);
    return (
        <div>
            {selected=="grid" ?
            <>
              {showSkeleton ? (
 <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, index:number) => (
          <div key={index}>
           
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
              {Array.from({ length: 6 }).map((_, key) => (
             <div className=""  key={key}>
                  <VideoGridCardSkeleton />
             </div>
              ))}
            </div>
          </div>
        ))}
      </div>
     ) : (<>
{data?.map((video:any,index:number)=>(
            <div key={index}>
         
                {video?.users_subscriptions_creator_idTousers?.videos?.length>0 &&
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                                { video?.users_subscriptions_creator_idTousers?.videos.map((video:any,key:number)=>{
                return <div className="w-[300px] mt-[1rem]"  key={key}>
                                     <VideoGridCard  data={video}/>
                </div>
            })}
</div>
               
        }

         

            </div>
           
            ))}
</>
)}
            </>
            : <>
              {showSkeleton ? (
 <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, index:number) => (
          <div key={index}>
            <div className="flex items-center gap-2 mb-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-[120px]" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
              {Array.from({ length: 3 }).map((_, key) => (
             <div className=""  key={key}>
                  <VideoRowCardSkeleton size="default"/>
             </div>
              ))}
            </div>
          </div>
        ))}
      </div>
     ) : (<>
{data?.map((video:any,index:number)=>(
            <div key={index}>
               <div className="flex  items-center gap-[.5rem]">
                 <UserAvatar
                          size="lg"
                          imageUrl={video?.users_subscriptions_creator_idTousers?.avatar_url }
                          name={video?.users_subscriptions_creator_idTousers?.channel_name }
                        />
               <p className="font-semibold"> {video?.users_subscriptions_creator_idTousers?.channel_name}</p>
            </div>
                {video?.users_subscriptions_creator_idTousers?.videos?.length>0 &&
                video?.users_subscriptions_creator_idTousers?.videos.map((video:any,key:number)=>{
                return <div className="w-[700px] mt-[1rem]"  key={key}>
                                     <VideoRowCard  data={video} size="default"/>
                </div>
            })
        }

         

            </div>
           
            ))}
</>
)}
            </>}
   
           
  
            </div>
          

    )
}