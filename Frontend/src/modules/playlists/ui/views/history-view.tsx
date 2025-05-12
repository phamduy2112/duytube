"use client"
import { Suspense } from "react";
import { HomeVideoSection } from "@/modules/home/ui/sections/home-videos-sections";
import { TrendingVideosSection } from "@/modules/home/ui/sections/trending-videos-section";
import { HistoryVideosSection } from "../sections/history-video-section";

interface HomeViewProps{
    categoryId?:string;
}

export const HistorygView=()=>{
    return (
        <div className="max-w-screen-md mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
                {/*  */}
               
             <div>
                <h1 className="text-2xl font-bold">History</h1>
                <p className="text-xs text-muted-foreground">
            Videos you have watched
                </p>
             </div>
        <HistoryVideosSection/>
              
        </div>
    )
}