"use client";

import { FilterCarousel } from "@/components/filter-carousel";
import { categoryNames } from "@/scripts/seed-catelogries";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import CategoriesService from "@/service/axios/categories/categories.api";

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
    const {data}=useQuery({
        queryKey:['category'],
        queryFn: ()=> CategoriesService.getCategory()
    })

    const dataCate=data?.content.map((category)=>({
        value:category.id,
        label:category.name
    }))
    return (
        <div>
           <FilterCarousel
           value={categoryId}
           data={dataCate}>

           </FilterCarousel>
        </div>
    )
}