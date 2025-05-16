"use client"
import { Suspense } from "react";
import { HomeVideoSection } from "@/modules/home/ui/sections/home-videos-sections";
import { TrendingVideosSection } from "@/modules/home/ui/sections/trending-videos-section";
import { HistoryVideosSection } from "../sections/history-video-section";
import { HistorySidebar } from "../sections/history-sidebar-section";

interface HomeViewProps{
    categoryId?:string;
}

export const HistorygView=()=>{
    return (
        <div className=" m-auto mb-10 px-4 my-auto  flex flex-col gap-y-6">
                {/*  */}
               
             <div>
                <h1 className="text-2xl font-bold">History</h1>
                <p className="text-xs text-muted-foreground">
            Videos you have watched
                </p>
             </div>
        <div className="flex justify-between gap-[5rem]">
<div className="w-[50rem]">
    <HistoryVideosSection/>
</div>
<div className="w-[20rem]">
 <HistorySidebar/>
</div>
        </div>
              
        </div>
    )
}