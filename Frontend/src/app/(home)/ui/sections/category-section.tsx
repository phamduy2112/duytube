"use client";

import { FilterCarousel } from "@/components/filter-carousel";
import { categoryNames } from "@/scripts/seed-catelogries";
import { Suspense } from "react";

interface categorySectionProps{
    categoryId?:string;
}
// export const CategoriesSection()=>{
//     return (
//         <Suspense fallback={<p>Loading....</p>}>
//             <CategoriesSectionSuspense />

//         </Suspense>
//     )
// }


export const CategoriesSection=({categoryId}:categorySectionProps)=>{
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