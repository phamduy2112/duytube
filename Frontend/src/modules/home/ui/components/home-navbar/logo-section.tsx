import Image from "next/image";
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const LogoSectionSkeleton=()=>{
    return (
             <>
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="w-24 h-6 rounded" />
            </>
    )
}

export const LogoSection = () => {
  return (
      <div className="flex items-center flex-shrink-0">
                   
                   <SidebarTrigger />

                 
                    <Link href="">
                    <div className="p-4 flex items-center gap-1">
                    <Image src="/youtube.jpg" alt="Logo" width={32} height={32}>
                        </Image>
                        <p className="text-xl font-semibold tracking-tight">DuyTuBe</p>
                    </div>
                   

                        </Link>
                </div>
  );
};
