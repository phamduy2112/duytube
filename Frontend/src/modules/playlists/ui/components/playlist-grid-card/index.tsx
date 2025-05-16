import Link from "next/link"
import { PlaylistThumbnail } from "./playlist-thumnail"
import { PlaylistInfo } from "./playlist-info"

export const PlayListGridCard=({
    data
})=>{
    return (
        <Link href={`playlists/1`}>
            <div className="flex flex-col gap-2 w-full group">
                <PlaylistThumbnail
                imageUrl="abc"
                title="text"
                videoCount={2}
                >
           
                </PlaylistThumbnail>
                     <PlaylistInfo data={data}/>
            </div>
        </Link>
    )
}