"use client";

import { FilterCarousel } from "@/components/filter-carousel";
import { categoryNames } from "@/scripts/seed-catelogries";
import { ICategory } from "@/service/type/categories.type";
import { Suspense, useState } from "react";

interface categorySectionProps{
    categoryId?:string;
    data: {
        value: string;
        label: string;
    }[];
    onChange:()=>void
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
          console.log("Selected ID:", id); // lấy ra ID tại đây
          onChange(id);
        }}
           >

           </FilterCarousel>
           <div className="mt-4">
      </div>
        </div>
    )
}