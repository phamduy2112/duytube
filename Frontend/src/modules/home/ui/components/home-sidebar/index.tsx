import { Sidebar, SidebarContent } from "@/components/ui/sidebar"
import { MainSection } from "./main-section"
import { Separator } from "@/components/ui/separator"
import { PersonalSection } from "./personal-section"
import { SubscriptionsSection } from "@/modules/studio/ui/layouts/components/studio-sidebar/subscriptions-section"

export const HomeSidebar=()=>{
    return (
        <Sidebar className="pt-16 z-40 border-none" collapsible="icon">
            <SidebarContent className="bg-background">
                   <MainSection></MainSection>
                   <Separator></Separator>
                   <PersonalSection/>
                                      <Separator></Separator>

                     <SubscriptionsSection/>
            </SidebarContent>
        </Sidebar>
    )
}
