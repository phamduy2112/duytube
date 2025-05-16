"use client"
import { Suspense } from "react";
import { HomeVideoSection } from "@/modules/home/ui/sections/home-videos-sections";
import { TrendingVideosSection } from "@/modules/home/ui/sections/trending-videos-section";
import {PlaylistHeaderSection} from "../sections/playlist-header-section";
import { VideosSection } from "../sections/videos-section";

interface VideosViewProps{
    playlistId?:string;
}

export const VideosView=({playlistId}:VideosViewProps)=>{
    return (
        <div className="max-w-screen-md mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
                {/*  */}
               
             <div>
                <h1 className="text-2xl font-bold">Custom playlist</h1>
                <p className="text-xs text-muted-foreground">
           Custom playlist
                </p>
                <PlaylistHeaderSection playlistId={playlistId}/>
                <VideosSection playlistId={playlistId}/>
             </div>
              
        </div>
    )
}