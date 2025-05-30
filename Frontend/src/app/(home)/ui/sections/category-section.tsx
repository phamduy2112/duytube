"use client";

import { useEffect, useState } from "react";
import { FilterCarousel, FilterCarouselSkeleton } from "@/components/filter-carousel";

interface CategoriesSectionProps {
  data: { value: string; label: string }[];
  categoryId: string | null;
  isLoading?: boolean;
  onChange: (id: string | null) => void;
}

export const CategoriesSection = ({ data, categoryId, onChange, isLoading }: CategoriesSectionProps) => {
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSkeleton(false);
    }, 500); // delay 500ms

    return () => clearTimeout(timeout); 
  }, []);

  return (
    <div>
      {isLoading || showSkeleton ? (
        <FilterCarouselSkeleton />
      ) : (
        <FilterCarousel data={data} value={categoryId} onSelect={onChange} />
      )}
    </div>
  );
};
