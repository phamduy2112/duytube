import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { VideoService } from '@/service/axios/videos/video'
import { useUser } from '@clerk/nextjs'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react'
import React from 'react'

function VideoReactions({id}) {
    const viewerReaction="like"
    const { user } = useUser();
      const queryClient = useQueryClient();

const {data:getLikeCount}=useQuery({
        queryKey:["get-like-count-video",id],
        queryFn:()=>VideoService.getLikeCountVideo(id),
        enabled:!!id
      })
      console.log(getLikeCount)
    const {mutate:toggleReactionVideo}=useMutation({
        mutationFn:VideoService.toogleReactionsVideo,
        onSuccess:(data)=>{
          queryClient.invalidateQueries({ queryKey: ["get-like-count-video", id] });

        },
        onError:(data)=>{

        }
    })
    // const { user_id, video_id, type } = dto;
// 

    const handleToggleReactionsVideo=(type)=>{
    
      const data={
        video_id:id,
        user_id:user?.id,
        type

      }
      toggleReactionVideo(data);

    }
  return (
    <div className='flex items-center-safe flex-none'>
        <Button
        
        variant="secondary"
        className='rounded-l-full rounded-r-none gap-2 pr-4'
        onClick={()=>{handleToggleReactionsVideo("like")}}
        >
            <ThumbsUpIcon className={cn("size-5",viewerReaction==="like" && "fill-black")}></ThumbsUpIcon>
            {getLikeCount?.like}
        </Button>
        <Separator orientation='vertical' className='h-7'/>
        <Button
           variant="secondary"
        className='rounded-l-none rounded-r-full pr-4'
        onClick={()=>{handleToggleReactionsVideo("unlike")}}

        >
            <ThumbsDownIcon className={cn("size-5",viewerReaction !=="like" && "fill-black")}></ThumbsDownIcon>
            {getLikeCount?.unlike}

        </Button>
    </div>
  )
}

export default VideoReactions