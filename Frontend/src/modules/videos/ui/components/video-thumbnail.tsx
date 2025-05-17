import { Skeleton } from "@/components/ui/skeleton";
import { THUMBNAIL_FALLBACK } from "@/contants"
import { formatDuration } from "@/lib/utils"
import Image from "next/image"
import { VideoInfo } from "./video-info";

interface VideoThumbnailProps{
    title:string;
    duration:number;
    imageUrl?:string|null;
    data:any[]
    previewUrl?:string|null

}

export const VideoThumbnailSkeleton=()=>{
    return (
        <div className="relative w-full overflow-hidden transition-all group-hover:rounded-none rounded-xl aspect-video">
            <Skeleton className="size-full"/>
        </div>
    )
}


export const VideoThumbnail=(
    {imageUrl,previewUrl,title,duration}:VideoThumbnailProps
)=>{
    return (
        <div className="relative">
            <div className="relative w-full overflow-hidden rounded-xl aspect-video">
                <Image src="./placeholder.svg" alt={title} fill className="w-full h-full object-cover group-hover:opacity-0"></Image>
                <Image src={previewUrl??THUMBNAIL_FALLBACK} alt={title} fill className="w-full h-full object-cover group-hover:opacity-100"></Image>
            </div>
            <div className="absolute bottom-2 right-2 px-1 py-0.5 rounded bg-black/80 text-white text-xs font-medium">              
            {formatDuration(1234)}
            </div>

       
        </div>
    )
}