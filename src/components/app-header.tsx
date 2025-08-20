"use client"

import { SidebarTrigger } from "./ui/sidebar"

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <SidebarTrigger className="md:hidden" />
      <div>
        {/* Placeholder for breadcrumbs or title */}
      </div>
    </header>
  )
}
