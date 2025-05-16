import { Button } from '@/components/ui/button'
import { VideoGridCard } from '@/modules/videos/ui/components/video-grid-card'
import { mockVideos } from '@/scripts/seed-catelogries'
import React from 'react'

function UserVideo() {

  return (
  <>
  <div className="flex gap-[1rem] py-3">
 <Button
    size={"sm"}
    variant={"default"}
    className="cursor-pointer"
    >
      Tất cả
    </Button>
    <Button
        size={"sm"}
    className="cursor-pointer"

    variant={"outline"}
    >
      Mới nhất
    </Button>
    <Button
        size={"sm"}
    className="cursor-pointer"

    variant={"outline"}
    >
      Cũ nhất
    </Button>
  </div>
     <div className="gap-4 gap-y-10 grid grid-cols-1 sm:gird-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4
            [@media(min-width:1920px)]:grid-cols-5 [@media(min-width:2200px):grid-cols-6]
            
            ">
              {mockVideos.map((video)=>(
                  <VideoGridCard data={video} />
              ))}
            </div>
      </>
  )
}

export default UserVideo