"use client";

import { FilterCarousel } from "@/components/filter-carousel";
import { Suspense, useState } from "react";

interface CategoriesSectionProps {
  data: { value: string; label: string }[];
  categoryId: string | null;
  isLoading?: boolean;
  onChange: (id: string | null) => void;
}


export const CategoriesSection=({data,onChange,categoryId,isLoading}:CategoriesSectionProps)=>{
    return (
        <Suspense fallback="<p>Loading...</p>">
            <CategoriesSectionSuspense data={data} onChange={onChange} categoryId={categoryId}/>
        </Suspense>
    )
}
const CategoriesSkeleton=()=>{
    return <FilterCarousel isLoading data={[]} onSelect={()=>{}}/>
    
}
export const CategoriesSectionSuspense=({data,onChange,categoryId}:CategoriesSectionProps)=>{

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