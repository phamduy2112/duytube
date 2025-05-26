"use client";

import { FilterCarousel } from "@/components/filter-carousel";
import { Suspense, useState } from "react";

interface categorySectionProps{
    categoryId?:string;
    data: {
        value: string;
        label: string;
    }[];
    onChange:(id:string)=>string
}

export const CategoriesSection=({data,onChange,categoryId}:categorySectionProps)=>{
    return (
        <Suspense fallback="<p>Loading...</p>">
            <CategoriesSectionSuspense data={data} onChange={onChange} categoryId={categoryId}/>
        </Suspense>
    )
}
const CategoriesSkeleton=()=>{
    return <FilterCarousel isLoading data={[]} onSelect={()=>{}}/>
    
}
export const CategoriesSectionSuspense=({data,onChange,categoryId}:categorySectionProps)=>{

    return (
        <div>
           <FilterCarousel
           value={categoryId}
           data={data}
            onSelect={(id) => {
        }}
           >

           </FilterCarousel>
           <div className="mt-4">
      </div>
        </div>
    )
}