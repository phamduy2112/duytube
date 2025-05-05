import { formatDuration } from "@/lib/utils"
import Image from "next/image"

export const VideoThumbnail=(
    {imageUrl,previewUrl,title,duration}
)=>{
    return (
        <div className="relative">
            <div className="relative w-full overflow-hidden rounded-xl aspect-video">
                <Image src={imageUrl??"/placeholder.svg"} alt={title} fill className="w-full h-full object-cover group-hover:opacity-0"></Image>
                <Image src={previewUrl??"/placeholder.svg"} alt={title} fill className="w-full h-full object-cover group-hover:opacity-100"></Image>
            </div>
            <div className="absolute bottom-2 right-2 px-1 py-.5 rouded bg-black/80 text-while text-xs font-medium">
                {formatDuration(60)}
            </div>
        </div>
    )
}