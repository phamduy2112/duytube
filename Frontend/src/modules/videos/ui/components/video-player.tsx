"use client"
import MuxPlayer from "@mux/mux-player-react"

interface VideoPlayerProps{
    playBackId?:string|undefined;
    autoPlay?:boolean;
    onPlay?:()=>void
}

export const VideoPlayerSkeleton=()=>{
    return <div className="aspect-video bg-black rounded-xl"></div>
}

export const VideoPlayer=({
    playBackId,
    autoPlay,
    onPlay,
}:VideoPlayerProps)=>{
    console.log("ac",playBackId)
    // if(!playbackId) return null
    return(
        <MuxPlayer
       playbackId={playBackId}
        poster={`https://image.mux.com/${playBackId}/thumbnail.jpg`}
        playerInitTime={0}
        autoPlay={autoPlay}
        thumbnailTime={0}
        className="w-full h-full object-contain"
        accentColor="#FF2056"
        onPlay={onPlay}
        />
    )
}