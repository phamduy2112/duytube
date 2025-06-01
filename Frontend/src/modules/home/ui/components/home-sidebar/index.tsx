import { Sidebar, SidebarContent } from "@/components/ui/sidebar"
import { MainSection, MainSectionSkeleton } from "./main-section"
import { Separator } from "@/components/ui/separator"
import { PersonalSection, PersonalSectionSkeleton } from "./personal-section"
import { SubscriptionsSection } from "@/modules/studio/ui/layouts/components/studio-sidebar/subscriptions-section"
import { useEffect, useState } from "react"

export const HomeSidebar=()=>{
      const [showSkeleton, setShowSkeleton] = useState(true);
    
      useEffect(() => {
        const timeout = setTimeout(() => {
          setShowSkeleton(false);
        }, 500); // delay 500ms
    
        return () => clearTimeout(timeout); 
      }, []);
    
    return (
        <Sidebar className="pt-16 z-40 border-none" collapsible="icon">
            {
                showSkeleton? (
                    
                <SidebarContent className="bg-background">
                    <MainSectionSkeleton/>
                      <Separator></Separator>
                        <PersonalSectionSkeleton/>
                           <Separator></Separator>
                            <PersonalSectionSkeleton/>
                </SidebarContent>
                ) :(
                <SidebarContent className="bg-background">
            
                   <MainSection></MainSection>
                   <Separator></Separator>
                   <PersonalSection/>
                     <Separator></Separator>

                     <SubscriptionsSection/>
            </SidebarContent>
                )
            }
            
        </Sidebar>
    )
}
