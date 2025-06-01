import Link from "next/link"
import { VideoThumbnail, VideoThumbnailSkeleton } from "./video-thumbnail"
import { VideoInfo, VideoInfoSkeleton } from "./video-info"

interface VideoGridCardProps{
    data:any
    onRemove?:()=>void
}
export const VideoGridCardSkeleton=()=>{
    return (
        <div className="flex flex-col gap-2 w-full">
            <VideoThumbnailSkeleton/>
            <VideoInfoSkeleton/>
        </div>
    )
}
export const VideoGridCard=({data,onRemove}:VideoGridCardProps)=>{
    return (
        <div className="flex flex-col gap-2 w-full group">
            <Link href={`/videos/${data?.id}`}>
            <VideoThumbnail 
            imageUrl={data?.mux_playback_id}
            previewUrl={data?.mux_playback_id}
            title={data?.title}
            duration={data?.duration}
            
            >
                
                </VideoThumbnail>

                <div className="mt-[.5rem]">
      <VideoInfo data={data} />

                </div>
          
                </Link>
        </div>
    )
}