import { Suspense } from "react";
import { CategoriesSection } from "../sections/category-section";
import { HomeVideoSection } from "@/modules/home/ui/sections/home-videos-sections";
import { TrendingView } from "./trending-view";

interface HomeViewProps{
    categoryId?:string;
}

export const HomeView=({categoryId}:HomeViewProps)=>{
    return (
        <div className="max-w-[full] mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
                {/*  */}
               
                <CategoriesSection categoryId={categoryId}></CategoriesSection>
                <HomeVideoSection categoryId={categoryId}/>
          
              
        </div>
    )
}