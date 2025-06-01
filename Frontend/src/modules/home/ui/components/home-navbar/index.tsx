'use client'

import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"
import { SearchInput, SearchInputSkeleton } from "./search-input"
import { AuthButton, AuthButtonSkeleton } from "@/modules/auth/ui/components/auth-button"
import { LogoSection, LogoSectionSkeleton } from "./logo-section"
import { useEffect, useState } from "react"

export const HomeNavBar=()=>{
       const [showSkeleton, setShowSkeleton] = useState(true);
        
          useEffect(() => {
            const timeout = setTimeout(() => {
              setShowSkeleton(false);
            }, 500); // delay 500ms
        
            return () => clearTimeout(timeout); 
          }, []);
        
    return (
        <div className="fixed top-0 left-0 right-0 h-16 bg-white flex items-center px-2 pr-5 z-50">
           {
            showSkeleton ? (
               <div className="flex items-center gap-4 w-full">
            <LogoSectionSkeleton/>
                {/* Search bar */}
                <div className="flex-1 flex justify-center max-w-[720px] mx-auto">
                    <SearchInputSkeleton/>
                </div>
                <div className="flex-shrink-0 items-center flex gap-4">
                    {/*  */}
                    <AuthButtonSkeleton/>
                </div>
            </div>
            ):(
            
                  <div className="flex items-center gap-4 w-full">
            <LogoSection/>
                {/* Search bar */}
                <div className="flex-1 flex justify-center max-w-[720px] mx-auto">
                    <SearchInput/>
                </div>
                <div className="flex-shrink-0 items-center flex gap-4">
                    {/*  */}
                    <AuthButton/>
                </div>
            </div>
            )
           }
        </div>
    )
}