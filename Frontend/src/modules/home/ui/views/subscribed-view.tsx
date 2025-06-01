'use client'

import { Suspense, useState } from "react";
import { HomeVideoSection } from "@/modules/home/ui/sections/home-videos-sections";
import { TrendingVideosSection } from "@/modules/home/ui/sections/trending-videos-section";
import { SubcribedVideosSection } from "../sections/subscribed-videos-sections";
import Link from "next/link";
import { LayoutGrid, List } from "lucide-react";
import { SubscriptionsService } from "@/service/axios/subscriptions/subscriptions.service";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { UserService } from "@/service/axios/user/user.service";
import { useDelayedSkeleton } from "@/hooks/use-delayed-skeleton";
import { useUserSubscriptions } from "@/hooks/api/use-user";

interface HomeViewProps{
    categoryId?:string;
}

export const SubbscribedView=()=>{
 const { user } = useUser()


   const { data } = useUserSubscriptions(user?.id);
   const [selected,setSelected]=useState("grid")
   const handleSelected=(item:string)=>{
    setSelected(item)
   }
    return (
        <div className="w-[1650px] mx-auto mb-10 px-4 pt-15 flex flex-col gap-y-6">
                {/*  */}
               
             <div className="flex justify-between items-center  w-[100%]">
                <h1 className="text-2xl font-bold">Subscribed</h1>
                <div className="flex items-center justify-center gap-1">
                    <Link href="" className="">Manage</Link>
                    <LayoutGrid 
                    onClick={()=>handleSelected("grid")}
                    className="size-5"/>
                    <List className="size-5" 
                    onClick={()=>handleSelected("list")}
                    />
                </div>
              
             </div>
             
             {data?.subscriptions_subscriptions_viewer_idTousers?.length > 0          ?   
              <SubcribedVideosSection
              selected={selected}
              data={data?.subscriptions_subscriptions_viewer_idTousers}/>
:"Chưa có người đăng kí "}
      
              
        </div>
    )
}