"use client"

import * as React from "react"
import {
  BrainCircuit,
  KanbanSquare,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AppHeader from "@/components/app-header"
import DashboardPage from "@/components/dashboard-page"
import RoadmapPage from "@/components/roadmap-page"
import PrioritizationPage from "@/components/prioritization-page"

type View = "dashboard" | "roadmap" | "prioritization"

export default function InsightStreamApp() {
  const [activeView, setActiveView] = React.useState<View>("dashboard")

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardPage />
      case "roadmap":
        return <RoadmapPage />
      case "prioritization":
        return <PrioritizationPage />
      default:
        return <DashboardPage />
    }
  }

  return (
    <SidebarProvider>
      <Sidebar side="left" collapsible="icon" variant="sidebar">
        <SidebarHeader className="h-16 items-center justify-center p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="size-8 text-primary transition-all group-data-[collapsible=icon]:size-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6.2c4.5 4.5 4.5 11.8 0 16.3" />
            <path d="M7 2.2c6 6 6 15.8 0 21.8" />
            <path d="M11 6.2c-4.5 4.5 -4.5 11.8 0 16.3" />
            <path d="M15 2.2c-6 6 -6 15.8 0 21.8" />
            <path d="M19 6.2c-4.5 4.5 -4.5 11.8 0 16.3" />
          </svg>

          <span className="font-bold text-lg text-sidebar-foreground transition-opacity group-data-[collapsible=icon]:opacity-0">
            InsightStream
          </span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setActiveView("dashboard")}
                isActive={activeView === "dashboard"}
                tooltip="Dashboard"
              >
                <LayoutDashboard />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setActiveView("roadmap")}
                isActive={activeView === "roadmap"}
                tooltip="Roadmap"
              >
                <KanbanSquare />
                <span>Roadmap</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setActiveView("prioritization")}
                isActive={activeView === "prioritization"}
                tooltip="AI Prioritization"
              >
                <BrainCircuit />
                <span>AI Prioritization</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-sidebar-accent group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:p-0">
                <Avatar className="size-8">
                  <AvatarImage src="https://placehold.co/40x40.png" alt="User" data-ai-hint="person avatar" />
                  <AvatarFallback>RM</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-sm group-data-[collapsible=icon]:hidden">
                  <span className="font-semibold text-sidebar-foreground">
                    Ridham M.
                  </span>
                  <span className="text-sidebar-foreground/70">
                    Product Manager
                  </span>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <AppHeader />
        <main className="min-h-0 flex-1 overflow-y-auto p-4 lg:p-6">
          {renderView()}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
