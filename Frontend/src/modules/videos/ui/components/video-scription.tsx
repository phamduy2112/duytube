'use client'

import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useState } from "react";

interface VideoDecriptionProps{
    compactViews:string;
    expandedViews:string;
    compactDate:string;
    expandedDate:string;
    description?:string|null

}

export const VideoDecription=({
    compactViews,
    expandedViews,
    compactDate,
    expandedDate,
    description,

}:VideoDecriptionProps)=>{
    const [isExpanded,setIsExpanded]=useState(false);
   return (
    <div 
    onClick={()=>setIsExpanded((current)=>!current)}
className="bg-secondary/50 rounded-xl p-3 cursor-pointer hover:bg-secondary/70 transition">
    <div className="flex gap-2 text-sm mb-2"> 
        <span className="font-medium">
                {isExpanded ? expandedViews : compactViews} views
        </span>
        <span className="font-medium">
                {isExpanded ? expandedDate : compactDate} 
        </span>
    </div>
    <div className="relative">
            <p className={cn("text-sm whitespace-pre-wrap", !isExpanded&&"line-clamp-2")}>
            {description || "No description"}
            </p>
            <div>
                {
                    isExpanded  ?(
                        <div className="flex gap-1 items-center">Show less <ChevronUpIcon className="size-4"/></div>
                    ) : (
                      <div className="flex gap-1 items-center"> Show more <ChevronDownIcon className="size-4"/></div>
                    )

                }
            </div>
    </div>
</div>
   )
}