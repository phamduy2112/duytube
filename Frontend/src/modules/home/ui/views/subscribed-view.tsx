import { Suspense } from "react";
import { HomeVideoSection } from "@/modules/home/ui/sections/home-videos-sections";
import { TrendingVideosSection } from "@/modules/home/ui/sections/trending-videos-section";
import { SubcribedVideosSection } from "../sections/subscribed-videos-sections";
import Link from "next/link";
import { LayoutGrid, List } from "lucide-react";

interface HomeViewProps{
    categoryId?:string;
}

export const SubbscribedView=()=>{
    return (
        <div className="max-w-[1650px] mx-auto mb-10 px-4 pt-15 flex flex-col gap-y-6">
                {/*  */}
               
             <div className="flex items-center justify-bettween">
                <h1 className="text-2xl font-bold">Subscribed</h1>
                <div className="flex items-center">
                    <Link href="" className="">Manage</Link>
                    <LayoutGrid/>
                    <List/>
                </div>
              
             </div>
             <SubcribedVideosSection/>
      
              
        </div>
    )
}