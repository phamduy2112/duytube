import { VideoGridCard } from "@/modules/videos/ui/components/video-grid-card"
import { mockVideos } from "@/scripts/seed-catelogries"

interface HomeVideosSectionProps{
    categoryId?:string
}

export const HomeVideoSection=({categoryId}:HomeVideosSectionProps)=>{
    return (
        <div>
            <div className="gap-4 gap-y-10 grid grid-cols-1 sm:gird-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4
            [@media(min-width:1920px)]:grid-cols-5 [@media(min-width:2200px)]:grid-cols-6
            
            ">
  {mockVideos.map((video)=>(
                <VideoGridCard key={video.id} data={video}/>
            ))}
            </div>
          
        </div>
    )
}