import { VideoGridCard } from "@/modules/videos/ui/components/video-grid-card"
import { mockVideos } from "@/scripts/seed-catelogries"

interface HomeVideosSectionProps{
    categoryId?:string
}

export const HomeVideoSection=({categoryId}:HomeVideosSectionProps)=>{
    console.log(categoryId)
    const filteredVideos = categoryId
  ? mockVideos.filter((video) => video.categoryId == categoryId)
  : mockVideos;
    return (
<div className=" mx-auto px-4">
            <div className="gap-4 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4
            
            
            ">
  {filteredVideos.map((video)=>(
                <VideoGridCard key={video.id} data={video}/>
            ))}
            </div>
          
        </div>
    )
}