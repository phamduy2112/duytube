"use client";

import { useState } from "react";
import { TrendingVideosSection } from "@/modules/home/ui/sections/trending-videos-section";
import { CarouselItem } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const MocksTrending = [
  { id: 1, value: "Mới nhất" },
  { id: 2, value: "Trò chơi" },
];

export const TrendingView = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="max-w-[1650px]  m-auto mb-10 px-4 pt-17 flex flex-col gap-y-6">
      <div>
        <h1 className="text-2xl font-bold">Trending</h1>
        <div className="flex gap-2 mt-2">
          {MocksTrending.map((item) => (
            <div className="basis-auto z-10" key={item.id}>
              <Badge
                onClick={() => setSelected(item.value)}
                variant={selected === item.value ? "default" : "secondary"}
                className={cn(
                  "rounded-lg px-3 py-1 cursor-pointer whitespace-nowrap text-sm",
                  selected === item.value && "border border-blue-500 shadow-md"
                )}
              >
                {item.value}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      <TrendingVideosSection />
    </div>
  );
};
