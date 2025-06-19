"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface UserProfile {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    phone: string;
    imageLink: string;
    role: string;
    country: string;
    cityOrState: string;
    roadOrArea: string;
    postalCode: string;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
}

interface UseUserProfileReturn {
    profile: UserProfile | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useUserProfile(): UseUserProfileReturn {
    const { data: session } = useSession();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProfile = async () => {
        if (!session?.user?.accessToken) {
            setError("No access token available");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `${session.user.accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to fetch profile: ${response.statusText}`);
            }

            const data = await response.json();

            if (data.success) {
                setProfile(data.data);
            } else {
                throw new Error(data.message || "Failed to fetch profile");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            console.error("Error fetching user profile:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (session?.user?.accessToken) {
            fetchProfile();
        }
    }, [session?.user?.accessToken]);

    return {
        profile,
        loading,
        error,
        refetch: fetchProfile,
    };
}