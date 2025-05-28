'use client'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { VideoService } from '@/service/axios/videos/video'
import { useUser } from '@clerk/nextjs'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react'
import React, { useState } from 'react'

function VideoReactions({id}) {
    
    const { user,isSignedIn} = useUser();
      const queryClient = useQueryClient();

const {data:getLikeCount}=useQuery({
        queryKey:["get-like-count-video",id],
        queryFn:()=>VideoService.getLikeCountVideo(id),
        enabled:!!id
      })
      const response={
        videoId:id,
        clerk_user_id:user?.id
      }
const {data:getLikeCountVideo}=useQuery({
        queryKey:["get-like-count",id],
        queryFn:()=>VideoService.getReactionsVideos(response),
        enabled:!!id
      })
      
      console.log("getLikeCountVideo",getLikeCountVideo)
    const {mutate:toggleReactionVideo}=useMutation({
        mutationFn:VideoService.toogleReactionsVideo,
        onSuccess:(data)=>{
          queryClient.invalidateQueries({ queryKey: ["get-like-count-video", id] });

        },
        onError:(data)=>{

        }
    })
    
  const [viewerReaction,setViewerReaction]=useState("like")

    const handleToggleReactionsVideo=(type:string)=>{
    
      const data={
        video_id:id,
        user_id:user?.id,
        type

      }
      if(!isSignedIn){
        return
      }
      setViewerReaction(type)
      toggleReactionVideo(data);
      console.log(data)
    }
  return (
    <div className='flex items-center-safe flex-none'>
        <Button
        
        variant="secondary"
        className='rounded-l-full rounded-r-none gap-2 pr-4'
        onClick={()=>{handleToggleReactionsVideo("like")}}
        >
            <ThumbsUpIcon className={cn("size-5",viewerReaction==="like" && "fill-black")}
            
            
            
            ></ThumbsUpIcon>
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