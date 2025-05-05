"use client"

import { Sidebar, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { MainSection } from "./main-section"
import { Separator } from "@/components/ui/separator"
import { PersonalSection } from "./personal-section"
import Link from "next/link"
import { LogOutIcon, VideoIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import { StudioSidebarHeader } from "./studio-sidebar-header"

export const SudioSidebar=()=>{
    const pathname=usePathname()
    return (
        <Sidebar className="pt-16 z-40"  collapsible="icon">
            <SidebarContent className="bg-background">
                  
                    <SidebarGroup>
                    <SidebarMenu>
                        {/* StudioSidebarHeader */}
                        <StudioSidebarHeader/>
                 <SidebarMenuItem>
                    <SidebarMenuButton isActive={pathname==="/studio"} asChild tooltip="Exit studio">
                        <Link href="/studio"><VideoIcon className="size-5"/>
                        <span className="text-sm">Content</span></Link>
                    </SidebarMenuButton>
                 </SidebarMenuItem>
                 <Separator></Separator>

                 <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Exit studio">
                        <Link href="/"><LogOutIcon className="size-5"/>
                        <span className="text-sm">Exit studio</span></Link>
                    </SidebarMenuButton>
                 </SidebarMenuItem>
                 </SidebarMenu>
                    </SidebarGroup>
            
            </SidebarContent>
        </Sidebar>
    )
}
