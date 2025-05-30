"use client"

import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

interface FilterCarouselProps {
    value?: string | null;
    isLoading?: boolean;
    onSelect?: (value: string | null) => void;
    data?: {
        value: string;
        label: string;
    }[];
}
export const FilterCarouselSkeleton = () => {
    return (
        <div className="relative w-full py-4">
            {/* Left gradient */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-white to-transparent" />

            <Carousel opts={{ align: "start", dragFree: true }} className="relative w-full px-12">
                <CarouselContent className="-ml-3 z-0 flex items-center">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <CarouselItem key={index} className="pl-3 basis-auto">
                            <Skeleton className="h-8 w-20 rounded-lg" />
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious className="left-1 z-20" />
                <CarouselNext className="right-1 z-20" />
            </Carousel>

            {/* Right gradient */}
            <div className="pointer-events-none absolute right-12 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-white to-transparent" />
        </div>
    );
};
export const FilterCarousel = ({
    value,
    onSelect,
    data,
    isLoading,
}: FilterCarouselProps) => {


    return (
        <div className="relative w-full py-4">
            {/* Left gradient */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-white to-transparent" />

            <Carousel
                opts={{ align: "start", dragFree: true }}
                className="relative w-full px-12"
            >
                {/* Carousel content */}
                <CarouselContent className="-ml-3 z-0 flex items-center">
                    {/* Chỉ hiển thị "All" nếu không có giá trị nào được chọn */}
                    <CarouselItem className="pl-3 basis-auto z-10">
                        <Badge
                            onClick={() => onSelect?.(null)}
                            variant={!value ? "default" : "secondary"}
                            className={cn(
                                "rounded-lg px-3 py-1 cursor-pointer whitespace-nowrap text-sm",
                                !value && "border border-blue-500 shadow-md"
                              )}                        >
                            All
                        </Badge>
                    </CarouselItem>

                    {/* Dynamic items */}
                    {data?.map((item:any) => (
                        <CarouselItem key={item.value} className="pl-3 basis-auto">
                            <Badge
                                onClick={() => onSelect?.(item.value)}
                                variant={value === item.value ? "default" : "secondary"}
                                className={cn(
                                    "rounded-lg px-3 py-1 cursor-pointer whitespace-nowrap text-sm",
                                    value === item.value && "border border-blue-500 shadow-md"
                                  )}                            >
                                {item.label}
                            </Badge>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Navigation */}
                <CarouselPrevious className="left-1 z-20" />
                <CarouselNext className="right-1 z-20" />
            </Carousel>

            {/* Right gradient */}
            <div className="pointer-events-none absolute right-12 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-white to-transparent" />
        </div>
    );
};
