"use client";
import Link from "next/link";
import { ChevronDown, LogOut, User } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserProfile } from "@/hooks/use-user-profile";
import { signOut, useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { fetchSingleUser } from "@/lib/api";

export function DashboardHeader() {
    const { data: session, status } = useSession();
    const { profile, loading } = useUserProfile();


    const { data: userDetails, isLoading, isError } = useQuery({
        queryKey: ["userDetails", session?.user?.id],
        queryFn: ({ queryKey }) => fetchSingleUser(queryKey[1] as string),
        select: (data) => data.data,
        staleTime: 5 * 60 * 1000,
    });

    const handleLogout = async () => {
        await signOut({ callbackUrl: "/" });
    };

    return (
        <header className="flex w-full items-center justify-between border-b border-[#222] bg-[#131313] p-4 backdrop-blur-xl">
            <h1 className="text-xl font-bold">Dashboard</h1>

            <div className="flex items-center gap-4">
                {status === "authenticated" && session ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex cursor-pointer items-center space-x-2">
                                <Avatar className="border border-red-600">
                                    <AvatarImage
                                        src={userDetails?.avatar?.url}
                                        alt={userDetails?.name}
                                        className="object-cover"
                                    />
                                    <AvatarFallback className="bg-red-900 text-white">
                                        {loading ? (
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            userDetails?.name.split(" ").map((word: string) => word[0]).join("").toUpperCase()
                                        )}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="hidden text-sm text-white md:block">
                                    {loading ? "Loading..." : userDetails?.name}
                                    {userDetails?.role && (
                                        <span className="ml-1 text-xs text-red-300">
                                            ({userDetails?.role})
                                        </span>
                                    )}
                                </span>
                                <ChevronDown className="h-4 w-4 text-white" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <div className="flex items-center justify-start gap-2 p-2">
                                <div className="flex flex-col space-y-1 text-left">
                                    <p className="text-sm font-medium leading-none">
                                        {loading ? "Loading..." : userDetails?.name}
                                    </p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {loading ? "Loading..." : profile?.email}
                                    </p>
                                    {profile?.role && (
                                        <p className="text-xs leading-none text-muted-foreground capitalize">
                                            Role: {profile.role}
                                        </p>
                                    )}
                                    {profile?.companyName && (
                                        <p className="text-xs leading-none text-muted-foreground">
                                            Company: {profile.companyName}
                                        </p>
                                    )}
                                    {profile?.phone && (
                                        <p className="text-xs leading-none text-muted-foreground">
                                            Phone: {profile.phone}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild className="cursor-pointer">
                                <Link href="/dashboard">Dashboard</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600"
                                onClick={handleLogout}
                            >
                                <LogOut className="mr-3 h-5 w-5" aria-hidden="true" />
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    // Fallback for unauthenticated users
                    <div className="flex cursor-pointer items-center space-x-2">
                        <Avatar className="border border-red-600">
                            <AvatarFallback className="bg-red-900 text-white">
                                <User className="h-4 w-4" />
                            </AvatarFallback>
                        </Avatar>
                        <span className="hidden text-sm text-white md:block">Guest</span>
                    </div>
                )}
            </div>
        </header>
    );
}