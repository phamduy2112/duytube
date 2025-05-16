"use client";

import { FilterCarousel } from "@/components/filter-carousel";
import { categoryNames } from "@/scripts/seed-catelogries";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import CategoriesService from "@/service/axios/categories/categories.api";

interface CategoriesSectionProps {
  data: { value: string; label: string }[];
  categoryId: string | null;
  onChange: (id: string | null) => void;
}
export const CategoriesSection=({ data, categoryId, onChange }:CategoriesSectionProps)=>{
    return (
        <Suspense fallback="<p>Loading...</p>">
            <CategoriesSectionSuspense data={data} categoryId={categoryId} onChange={onChange}/>
        </Suspense>
    )
}
const CategoriesSkeleton=()=>{
    return <FilterCarousel isLoading data={[]} onSelect={()=>{}}/>
    
}

export const CategoriesSectionSuspense=({ data, categoryId, onChange }:CategoriesSectionProps)=>{
    // const {data}=useQuery({
    //     queryKey:['category'],
    //     queryFn: ()=> CategoriesService.getCategory()
    // })


    return (
        <div>
           <FilterCarousel
        data={data}
        value={categoryId}
        onSelect={(id) => onChange(id)}
      />
        </div>
    )
}