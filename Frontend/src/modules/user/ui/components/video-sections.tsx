import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { VideoGridCard } from "@/modules/videos/ui/components/video-grid-card"
import { mockVideos } from "@/scripts/seed-catelogries"
import { Badge } from "lucide-react"
import UserVideo from "./user-video"
import { useUser } from "@clerk/nextjs"
import { useVideoOfUser } from "@/hooks/api/use-video-of-user"

interface VideosVideosSectionProps{
    categoryId?:string
}

export const VideosVideoSection=({activeItem})=>{

    const {user}=useUser()
const userId = user?.id;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useVideoOfUser(userId);
  console.log("data",data?.pages[0]?.content)
    return (
        <div>
            {/* <div className="gap-4 gap-y-10 grid grid-cols-1 sm:gird-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4
            [@media(min-width:1920px)]:grid-cols-5 [@media(min-width:2200px):grid-cols-6]
            
            ">

            </div> */}
      <div>
        {activeItem =="Trang chủ" ?(
<div className="relative 2xl:w-[1600px] ">
              <h3 className="py-[1rem] font-bold text-[1.1rem]">Dành cho bạn</h3>

  <Carousel className="w-full">
    <CarouselContent className="-ml-2">
      {data?.pages[0]?.content.map((video) => (
        <CarouselItem
          key={video.id}
          className="pl-2 basis-1/2 lg:basis-1/3 xl:basis-1/4" // 5 video / slide
        >
          <VideoGridCard data={video} />
        </CarouselItem>
      ))}
    </CarouselContent>

 
    <CarouselPrevious className=" cursor-pointer absolute left-0 top-[33%] -translate-y-1/2 z-10" />

    <CarouselNext className="cursor-pointerabsolute right-0 top-[33%] -translate-y-1/2 z-10" />
  </Carousel>
</div>

        ) :(
          <div>
            <UserVideo/>
          </div>
        )}
 

      </div>

    
    

        </div>
    )
}