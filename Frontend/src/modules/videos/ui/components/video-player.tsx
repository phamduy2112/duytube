"use client"
import MuxPlayer from "@mux/mux-player-react"

interface VideoPlayerProps{
    playBackId?:string|null|undefined;
    thumbnaiUrl?:string|null|undefined;
    autoPlay?:boolean;
    onPlay?:()=>void
}

export const VideoPlayerSkeleton=()=>{
    return <div className="aspect-video bg-black rounded-xl"></div>
}

export const VideoPlayer=({
    playbackId,
    thumbnailUrl,
    autoPlay,
    onPlay,
}:VideoPlayerProps)=>{
    // if(!playbackId) return null
    return(
        <MuxPlayer
        playbackId={"1z5b00ZcPcx8189lclMgJwydH9GOxNxJbUx4S9fWAR8w"}
        poster={`https://image.mux.com/1z5b00ZcPcx8189lclMgJwydH9GOxNxJbUx4S9fWAR8w/thumbnail.jpg`}
        playerInitTime={0}
        autoPlay={autoPlay}
        thumbnailTime={0}
        className="w-full h-full object-contain"
        accentColor="#FF2056"
        onPlay={onPlay}
        />
    )
}