import { Suspense } from "react";
import { CategoriesSection } from "../sections/category-section";

interface HomeViewProps{
    categoryId?:string;
}

export const HomeView=({categoryId}:HomeViewProps)=>{
    return (
        <div className="max-w-[1650px] mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
                {/*  */}
               
                <CategoriesSection categoryId={categoryId}></CategoriesSection>

              
        </div>
    )
}