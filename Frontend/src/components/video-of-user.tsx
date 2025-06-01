import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { VideoGridCard, VideoGridCardSkeleton } from '@/modules/videos/ui/components/video-grid-card'
import { cn } from '@/lib/utils'

function VideoOfUser({videos,className,isLoading,title}:any) {
  return (
   <div>
                <h3 className="py-4 font-bold text-lg">{title}</h3>
              <Carousel className="w-full">
                <CarouselContent className="-ml-2">
            
                 {isLoading
  ? Array.from({ length: 5 }).map((_, idx) => (
           <CarouselItem
                      key={idx}
                      className={cn(className)}
                    >
                            <VideoGridCardSkeleton key={idx} />

                      
                    </CarouselItem>
    ))
  : videos?.map((video: any) => (
       <CarouselItem
                      key={video.id}
                         className={cn(className)}
                    >
                      <VideoGridCard data={video} />
                      
                    </CarouselItem>
    ))}
 
                </CarouselContent>
                <CarouselPrevious className="cursor-pointer absolute left-0 top-[33%] -translate-y-1/2 z-10" />
                <CarouselNext className="cursor-pointer absolute right-0 top-[33%] -translate-y-1/2 z-10" />
              </Carousel>
            </div>
  )
}

export default VideoOfUser