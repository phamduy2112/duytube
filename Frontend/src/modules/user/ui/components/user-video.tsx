import { Button } from '@/components/ui/button'
import { useVideoOfUser } from '@/hooks/api/use-video-of-user';
import { VideoGridCard } from '@/modules/videos/ui/components/video-grid-card'
import { mockVideos } from '@/scripts/seed-catelogries'
import { useUser } from '@clerk/nextjs';
import React, { useMemo, useState } from 'react'

function UserVideo({videos}) {
     const {user}=useUser()
const userId = user?.id;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useVideoOfUser(userId);
  const [filter,setFilter]=useState<'all'|'newest'|'oldest'>('all')
  const filterVideos=useMemo(()=>{
      if (!videos) return [];
        const original = [...videos];
 if (filter === 'newest') {
    return original.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  if (filter === 'oldest') {
    return original.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  }

  return original;
  },[data,filter])
  return (
  <>
  <div className="flex gap-[1rem] py-3">
<Button size="sm" variant={filter === 'all' ? 'default' : 'outline'} onClick={() => setFilter('all')}>
          Tất cả
        </Button>
        <Button size="sm" variant={filter === 'newest' ? 'default' : 'outline'} onClick={() => setFilter('newest')}>
          Mới nhất
        </Button>
        <Button size="sm" variant={filter === 'oldest' ? 'default' : 'outline'} onClick={() => setFilter('oldest')}>
          Cũ nhất
        </Button>
  </div>
     <div className="gap-4 gap-y-10 grid grid-cols-1 sm:gird-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4
            [@media(min-width:1920px)]:grid-cols-5 [@media(min-width:2200px):grid-cols-6]
            
            ">
              {
                filterVideos.length>0 ?(
filterVideos?.map((video)=>(
                  <VideoGridCard data={video} />
              ))
                ) :(
                <>Chua co video</> 
                )
              }
            
            </div>
      </>
  )
}

export default UserVideo