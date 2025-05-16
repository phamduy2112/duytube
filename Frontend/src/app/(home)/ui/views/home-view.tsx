"use client";

import { useState, useMemo } from "react";
import { CategoriesSection } from "../sections/category-section";
import { HomeVideoSection } from "@/modules/home/ui/sections/home-videos-sections";
import { categoryNames } from "@/scripts/seed-catelogries";

export const HomeView = () => {
  const [categoryId, setCategoryId] = useState<string | null>(null);

  const data = useMemo(
    () =>
      categoryNames.map((category) => ({
        value: category.id,
        label: category.name,
      })),
    []
  );

  return (
    <div className="w-[1600px] mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
      {/* Danh mục */}
      <CategoriesSection data={data} categoryId={categoryId} onChange={setCategoryId} />

      {/* Video theo danh mục */}
      <HomeVideoSection categoryId={categoryId} />
    </div>
  );
};
