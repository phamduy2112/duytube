import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { HomeNavBar } from "./components/home-navbar";
import {  HomeSidebar } from "./components/home-sidebar";
import { Suspense } from "react";

interface HomeLayoutProps{
    children:React.ReactNode;
}
export const HomeLayout=({children}:HomeLayoutProps)=>{
    return (
 <SidebarProvider>
 <div>
           <div className="w-full">
          

            <Suspense fallback={<div>Loading navbar...</div>}>
        <HomeNavBar />
      </Suspense>
           </div>
        <div className="flex min-h-screen">
          {/* HomeSidebar */}
          <HomeSidebar></HomeSidebar>
          <main className="flex-1 overflow-y-auto mt-20">
          {children}  
          </main>
        </div>
         
        </div>
        
 </SidebarProvider>

    )
}
