import type React from "react"
import { Inter } from "next/font/google"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
    title: "Dashboard",
    description: "Application dashboard",
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className={`${inter.className} `}>
            <SidebarProvider>
                <div className="flex min-h-screen">
                    <DashboardSidebar />
                    <div className="flex-1 md:w-[calc(100vw-108px)]">
                        <div className="sticky top-0 z-10 flex ">
                            <DashboardHeader />
                        </div>
                        <main className="md:mx-16 md:py-7">{children}</main>
                    </div>
                </div>
            </SidebarProvider>
        </div>
    )
}