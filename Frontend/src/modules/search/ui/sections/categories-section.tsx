"use client";

import { FilterCarousel } from "@/components/filter-carousel";
import { categoryNames } from "@/scripts/seed-catelogries";
import { Suspense, useState } from "react";

interface categorySectionProps{
    categoryId?:string;
}

export const CategoriesSection=({data,onChange,categoryId}:any)=>{
    return (
        <Suspense fallback="<p>Loading...</p>">
            <CategoriesSectionSuspense data={data} onChange={onChange} categoryId={categoryId}/>
        </Suspense>
    )
}
const CategoriesSkeleton=()=>{
    return <FilterCarousel isLoading data={[]} onSelect={()=>{}}/>
    
}
export const CategoriesSectionSuspense=({data,onChange,categoryId}:any)=>{

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
        ID được chọn: {categoryId ?? "Tất cả"}
      </div>
        </div>
    )
}