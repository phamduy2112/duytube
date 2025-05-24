"use client";

import { useState, useMemo } from "react";
import { CategoriesSection } from "../sections/category-section";
import { HomeVideoSection } from "@/modules/home/ui/sections/home-videos-sections";
import { categoryNames } from "@/scripts/seed-catelogries";
import { useQuery } from "@tanstack/react-query";
import categoriesApi from "@/service/axios/categories/categories.api";
import { ICategory } from "@/service/type/categories.type";
export const HomeView = () => {
  const [categoryId, setCategoryId] = useState<string | null>(null);
    const {data}=useQuery({
        queryKey:['category'],
        queryFn: ()=> categoriesApi.getCategory()
    })
    const dataCategories = useMemo(() => {
      return data?.content?.map((category:ICategory ) => ({
        value: category.id,
        label: category.name,
      })) || [];
    }, [data]);

  return (
    <div className="sm:w-[100%] 2xl:w-[1600px] mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
      {/* Danh mục */}
      <CategoriesSection data={dataCategories} categoryId={categoryId} onChange={setCategoryId} />

      {/* Video theo danh mục */}
      <HomeVideoSection /> 
    </div>
  );
};
