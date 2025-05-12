"use client";

import { FilterCarousel } from "@/components/filter-carousel";
import { categoryNames } from "@/scripts/seed-catelogries";
import { Suspense } from "react";

interface categorySectionProps{
    categoryId?:string;
}

export const CategoriesSection=({categoryId}:categorySectionProps)=>{
    return (
        <Suspense fallback="<p>Loading...</p>">
            <CategoriesSectionSuspense categoryId={categoryId}/>
        </Suspense>
    )
}
const CategoriesSkeleton=()=>{
    return <FilterCarousel isLoading data={[]} onSelect={()=>{}}/>
    
}
export const CategoriesSectionSuspense=({categoryId}:categorySectionProps)=>{
    const data=categoryNames.map((category)=>({
        value:category.id,
        label:category.name
    }))
    return (
        <div>
           <FilterCarousel
           value={categoryId}
           data={data}>

           </FilterCarousel>
        </div>
    )
}