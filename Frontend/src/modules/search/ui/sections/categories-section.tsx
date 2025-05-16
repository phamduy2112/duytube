"use client";

import { FilterCarousel } from "@/components/filter-carousel";
import { categoryNames } from "@/scripts/seed-catelogries";
import { Suspense, useState } from "react";

interface categorySectionProps{
    categoryId?:string;
}

export const CategoriesSection=({data}:any)=>{
    return (
        <Suspense fallback="<p>Loading...</p>">
            <CategoriesSectionSuspense data={data}/>
        </Suspense>
    )
}
const CategoriesSkeleton=()=>{
    return <FilterCarousel isLoading data={[]} onSelect={()=>{}}/>
    
}
export const CategoriesSectionSuspense=({data}:any)=>{
      const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
        <div>
           <FilterCarousel
           value={selectedId}
           data={data}
            onSelect={(id) => {
          console.log("Selected ID:", id); // lấy ra ID tại đây
          setSelectedId(id);
        }}
           >

           </FilterCarousel>
           <div className="mt-4">
        ID được chọn: {selectedId ?? "Tất cả"}
      </div>
        </div>
    )
}