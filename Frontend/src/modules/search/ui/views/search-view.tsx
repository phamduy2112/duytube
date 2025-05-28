'use client'

import { useIsMobile } from "@/hooks/use-mobile";
import { CategoriesSection } from "../sections/categories-section";
import { ResultsSection } from "../sections/results-section";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import categoriesApi from "@/service/axios/categories/categories.api";
import { VideoService } from "@/service/axios/videos/video";
import { ICategory } from "@/service/type/categories.type";
import { IVideo } from "@/service/type/video.type";

interface PageProps{
    query:any
}

export const SearchView=({
    query,
  
}:PageProps)=>{
    const isMobile=useIsMobile()
      const [categoryId, setCategoryId] = useState<string | null>(null);

      const {data:categories}=useQuery({
        queryKey:['category'],
        queryFn: ()=> categoriesApi.getCategory()
    })
        const dataCategories = useMemo(() => {
          return categories?.content?.map((category:ICategory) => ({
            value: category.id,
            label: category.name,
          })) || [];
        }, [categories]);
        const {data,error,isLoading}=useQuery({
            queryKey:["searchVideos",query],
            queryFn:()=>VideoService.searchVideo(query),
            enabled:!!query,
        })
      const dataVideos = useMemo(() => {
        if (!data) return [];
      
        return categoryId
          ? data.filter((item:IVideo) => item.category_id === categoryId)
          : data;
      }, [data, categoryId]);
      
    return(
        <div className="max-w-[1300px] mx-auto mb-10 flex flex-col gap-y-6 px-4 pt-2.5">
      {/* <CategoriesSection data={dataCategories} categoryId={categoryId} onChange={setCategoryId} /> */}
            <ResultsSection data={dataVideos}/>
        </div>
    )
}