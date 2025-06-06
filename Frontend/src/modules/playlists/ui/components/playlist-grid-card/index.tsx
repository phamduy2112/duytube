import Link from "next/link"
import { PlaylistThumbnail } from "./playlist-thumnail"
import { PlaylistInfo } from "./playlist-info"

export const PlayListGridCard=({
    data
}:any)=>{
    const videoCount=data?.playlist_videos.length;

    return (
        <Link href={`playlists/${data.id}`}>
            <div className="flex flex-col gap-2 w-full group">
                <PlaylistThumbnail
                playbackId={data?.playlist_videos[0]?.videos?.mux_playback_id}
                title="text"
                videoCount={videoCount}
                >
           
                </PlaylistThumbnail>
                     <PlaylistInfo data={data}/>
            </div>
        </Link>
    )
}