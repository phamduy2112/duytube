import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { StudioNavbar } from "./components/studio-navbar";
import {  SudioSidebar } from "./components/studio-sidebar";

interface StudioLayoutProps{
    children:React.ReactNode;
}
export const StudioLayout=({children}:StudioLayoutProps)=>{
    return (
 <SidebarProvider>
 <div>
           <div className="w-full">
          

            <StudioNavbar></StudioNavbar>
           </div>
        <div className="flex min-h-screen">
          {/* StudioSidebar */}
          <SudioSidebar></SudioSidebar>
          <main className="flex-1 overflow-y-auto">
          {children}  
          </main>
        </div>
         
        </div>
        
 </SidebarProvider>

    )
}
