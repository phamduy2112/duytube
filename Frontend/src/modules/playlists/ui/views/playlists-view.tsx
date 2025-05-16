"use client"
import { Suspense } from "react";
import { HomeVideoSection } from "@/modules/home/ui/sections/home-videos-sections";
import { TrendingVideosSection } from "@/modules/home/ui/sections/trending-videos-section";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { PlayListsSection } from "../sections/playlist-section";

interface HomeViewProps{
    categoryId?:string;
}

export const PlayListsView=()=>{
    return (
        <div className=" max-w-[1650px] w-[100%] mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
                {/*  */}
               
           <div className="flex justify-between items-center">
  <div>
                <h1 className="text-2xl font-bold">Playlists</h1>
                <p className="text-xs text-muted-foreground">
            Collections you have created
                </p>
             </div>
             <Button
             variant="outline"
             size="icon"
             className="rounded-full"
             >
                <PlusIcon/>
             </Button>
           </div>
           <PlayListsSection/>
           
  
              
        </div>
    )
}