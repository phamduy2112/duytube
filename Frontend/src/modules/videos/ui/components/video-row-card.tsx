'use client'

import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";
import { VideoThumbnail, VideoThumbnailSkeleton } from "./video-thumbnail";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { UserInfo } from "@/modules/user/ui/components/user-info";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import VideoMenu from "./video-menu";
import { useMemo }  from "react";
import { Skeleton } from "@/components/ui/skeleton";


const videoRowCardVariants=cva('group flex min-w-0',{
    variants:{
        size:{
            default:"gap-4",
            compact:"gap-2"
        }
    },
    defaultVariants:{
        size:"default"
    }
})
const thumbnaiVariants=cva('group flex min-w-0',{
    variants:{
        size:{
            default:"w-[38%]",
            compact:"w-[168px]"
        }
    },
    defaultVariants:{
        size:"default"
    }
})
interface VideoRowCardProps extends VariantProps<typeof videoRowCardVariants>{
data:any,
onRemove?:()=>void
}
export const VideoRowCardSkeleton =({size}:VariantProps<typeof videoRowCardVariants>)=>{
    return (
        <div className={videoRowCardVariants({size})}>
            <div className={thumbnaiVariants({size})}>
                <VideoThumbnailSkeleton/>
            </div>

            <div className="flex-1 min-w-0">
            <div className="flex justify-between gap-x-2">
                <div className="flex-1 min-w-0">
                    <Skeleton className={cn("h-5 w-[40%]", size==="compact" && "h-4 w-[40%]")}/>
                {
                    size==="default" && (
                        <>
                        <Skeleton className="h-4 w-[20%] mt-1"/>
                        <div className="flex items-cetner gap-2 my-3">
                            <Skeleton className="size-8 rounded-full"/>
                            <Skeleton className="h-4 w-24"/>
                        </div>
                        </>
                    )
                }
                {
                    size==="compact"&&(
                        <>
                        <Skeleton className="h-4 w-[50%] mt-1"/></>
                    )
                }
                </div>
            </div>
            </div>
        </div>
    )
}
// LILITH12TH

export const VideoRowCard=({
    data,size,onRemove
}:VideoRowCardProps)=>{
    const compactViews=useMemo(()=>{
        return Intl.NumberFormat("en",{
            notation:"compact"
        }).format(data.viewCount);
    },[data.viewCount])
    const compactLikes=useMemo(()=>{
        return Intl.NumberFormat("en",{
            notation:"compact"
        }).format(data.likeCount);
    },[data.likeCount])
    return (
<div className={videoRowCardVariants({ size })}>
  <Link href={`/videos/${data?.id}`} className={"w-[150px] md:w-[38%]"}>
    <VideoThumbnail
      imageUrl={data.thumbnailUrl}
      previewUrl={data.previewUrl}
      title={data.title}
      duration={data.duration}
    />
  </Link>

  <div className="flex-1 min-w-0">
    <div className="flex justify-between gap-x-2">
      <div className="flex-1 min-w-0">
        <Link href={`/videos/${data.id}`}>
          <h3 className={cn("font-medium line-clamp-1", size === "compact" ? "text-sm" : "text-base")}>
            {data.title}
          </h3>
          {size === "default" && (
            <p className="text-xs text-muted-foreground mt-1">
              {compactViews} views | {compactLikes} likes
            </p>
          )}
        </Link>

        {size === "default" && (
          <>
            <div className="flex items-center gap-2 my-2">
              {/* Avatar và UserInfo KHÔNG nên nằm trong <Link href={`/videos/...`}> */}
              <UserAvatar
                size="sm"
                imageUrl="https://i.pravatar.cc/150?img=1"
                name={data?.users?.name}
              />
              {/* Nếu bạn muốn avatar hay user info link tới trang user thì: */}
              <Link href={`/users/${data?.users?.id}`}>
                <UserInfo size="sm" name={data?.users?.channel_name} />
              </Link>
            </div>

            <Tooltip>
              <TooltipTrigger asChild>
                <p className="text-xs text-muted-foreground w-fit line-clamp-1">
                  {data.description ?? "No description"}
                </p>
              </TooltipTrigger>
              <TooltipContent className="bg-black/70" side="bottom" align="center">
                <p>From the video description</p>
              </TooltipContent>
            </Tooltip>
          </>
        )}

        {size === "compact" && (
          <>
            <UserInfo size="sm" name={data?.users?.name} />
            <p className="text-xs text-muted-foreground mt-1">
              {compactViews} views | {compactLikes} likes
            </p>
          </>
        )}
      </div>

      <div className="flex-none">
        <VideoMenu videoId={data.id} onRemove={onRemove} />
      </div>
    </div>
  </div>
</div>

    )
}