import type React from "react"
import { Inter } from "next/font/google"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import 'react-quill/dist/quill.snow.css';


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
    // Define the sidebar width as a constant for clarity and easier maintenance
    const sidebarWidth = '180px'; // Your sidebar's width

    return (
        <div className={`${inter.className} `}>
            <div className="sticky top-0 z-10 flex w-full">
                <DashboardHeader />
            </div>

            <SidebarProvider>
                <div className="flex min-h-screen">
                    <DashboardSidebar />
                    <div
                        className="flex-1 md:w-[calc(100vw-108px)]"
                        style={{ paddingLeft: sidebarWidth }}
                    >
                        <main className="md:py-7">{children}</main>
                    </div>
                </div>
            </SidebarProvider>
        </div>
    )
}