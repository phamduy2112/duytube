import { Suspense } from "react";
import { CategoriesSection } from "../sections/category-section";
import { HomeVideoSection } from "@/modules/home/ui/sections/home-videos-sections";
import { TrendingVideosSection } from "@/modules/home/ui/sections/trending-videos-section";
import { SubcribedVideosSection } from "../sections/subscribed-videos-sections";

interface HomeViewProps{
    categoryId?:string;
}

export const SubbscribedView=()=>{
    return (
        <div className="max-w-[1650px] mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
                {/*  */}
               
             <div>
                <h1 className="text-2xl font-bold">Subscribed</h1>
                <p className="text-xs text-muted-foreground">
                   Videos from your favorite creators
                </p>
             </div>
        <SubcribedVideosSection/>
              
        </div>
    )
}