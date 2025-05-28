"use client";

import { useState } from "react";
import { TrendingVideosSection } from "@/modules/home/ui/sections/trending-videos-section";
import { CarouselItem } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { VideoService } from "@/service/axios/videos/video";

const MocksTrending = [
  { id: 1, value: "Mới nhất" },
  { id: 2, value: "Trò chơi" },
];

export const TrendingView = () => {
  const [selected, setSelected] = useState<string | null>("Mới nhất");
  const {data}=useQuery({
    queryKey:["videos-trending"],
    queryFn:()=>VideoService.getVideoTrending(),
  })
  console.log(data)
  return (
    <div className="max-w-[1650px]  m-auto mb-10 px-4 flex flex-col gap-y-6">
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

{/* <div className="lg:w-[50rem]">
    <TrendingVideosSection />
</div> */}
    
    </div>
  );
};
