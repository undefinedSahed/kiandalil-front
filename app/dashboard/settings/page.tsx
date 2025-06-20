"use client"

import type React from "react"
import { useState, useEffect } from "react" // Import useEffect
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Save } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { fetchSingleUser } from "@/lib/api" // Ensure this path is correct

// Import for react-hook-form and zod
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

// Define the Zod schema for your form data
// We are making fields optional if they are not directly provided by the API
// but exist in your form (e.g., lastName, country, cityState, bio)
const profileFormSchema = z.object({
    firstName: z.string().min(1, {
        message: "First Name is required.",
    }),
    lastName: z.string().optional(), // Not in API response example
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    phone: z.string().optional(), // Mapped from whatsappNum
    country: z.string().optional(), // Not in API response example
    cityState: z.string().optional(), // Not in API response example
    bio: z.string().optional(), // Not in API response example
});

// Infer the type from the schema for strong typing
type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function SettingsPage() {
    const [isEditing, setIsEditing] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);

    // Initialize react-hook-form with a resolver and default values
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            firstName: "John",
            lastName: ".....",
            email: "steward@gmail.com",
            phone: "(307) 555-0133",
            country: "USA",
            cityState: "Berlin",
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    // Fetch user details using react-query
    const { data: userDetails, isLoading, isError } = useQuery({
        queryKey: ["userDetails", "684c07b63ade7f5378be0929"],
        queryFn: ({ queryKey }) => fetchSingleUser(queryKey[1] as string),
        select: (data) => data.data,
        staleTime: 5 * 60 * 1000,
    });

    // Use useEffect to update the form's default values once userDetails is fetched
    useEffect(() => {
        if (userDetails) {
            form.reset({
                firstName: userDetails.name || "",
                lastName: "", // API doesn't provide lastName directly
                email: userDetails.email || "",
                phone: userDetails.whatsappNum || "", // Map whatsappNum to phone
                // Keep existing dummy data for fields not present in API response
                country: form.getValues("country"), // Get current value from form state
                cityState: form.getValues("cityState"),
                bio: form.getValues("bio"),
            });
        }
    }, [userDetails, form.reset]); // Re-run when userDetails changes or form.reset is available

    // Handle form submission using react-hook-form's handleSubmit
    const onSubmit = (data: ProfileFormValues) => {
        console.log("Saving user data (Shadcn Form):", data);
        // Here you would typically send `data` to your API for update
        setIsEditing(false);
        alert("Profile updated successfully!");
        // If API call fails, you might want to revert `isEditing` or show an error
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value,
        });
    };

    const handlePasswordSave = () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("New passwords do not match!");
            return;
        }
        // Here you would typically save to an API
        console.log("Updating password");
        setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
        setShowPasswordForm(false);
        alert("Password updated successfully!");
    };

    const handleEdit = () => {
        setIsEditing(true);
        setShowPasswordForm(false);
    };

    const handleChangePassword = () => {
        setShowPasswordForm(true);
        setIsEditing(true); // Allow editing when password form is shown
    };

    // Show loading state or error message while data is being fetched
    if (isLoading) {
        return <div className="space-y-6 max-w-4xl mx-auto py-8 text-center">Loading user data...</div>;
    }

    if (isError) {
        return <div className="space-y-6 max-w-4xl mx-auto py-8 text-center text-red-500">Error loading user data.</div>;
    }

    // Determine the name to display (from API or fallback)
    const displayName = userDetails?.name || form.getValues("firstName") || "N/A";
    const displayEmail = userDetails?.email || form.getValues("email") || "N/A";
    const displayBio = form.getValues("bio"); // Bio is from static data or updated form


    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Personal Information</h1>
                <Button
                    onClick={isEditing ? form.handleSubmit(onSubmit) : handleEdit} // Use form.handleSubmit for Save
                    className="bg-black text-white hover:bg-gray-800"
                >
                    {isEditing ? (
                        <>
                            <Save className="w-4 h-4 mr-2" />
                            Save
                        </>
                    ) : (
                        <>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                        </>
                    )}
                </Button>
            </div>

            <Card>
                <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-4">
                        <div className="flex flex-col items-center space-y-4 md:basis-1/4">
                            <Avatar className="w-32 h-32">
                                <AvatarImage src={userDetails?.avatar?.url || "/placeholder-user.jpg"} />
                                <AvatarFallback>
                                    {/* eslint-diable-next-line @typescript-eslint/no-explicit-any */}
                                    {displayName.split(' ').map((n: any) => n[0]).join('').toUpperCase().substring(0, 2) || "NN"}
                                </AvatarFallback>
                            </Avatar>
                            <h2 className="text-xl font-bold">{displayName}</h2>
                        </div>

                        {/* Bio Section */}
                        <div className="md:basis-3/4 max-w-full text-center md:text-left">
                            <h3 className="text-xl font-semibold mb-4">Bio</h3>
                            <p className="text-gray-600 leading-relaxed text-base">{displayBio}</p>
                        </div>
                    </div>

                    {/* Form Fields using Shadcn Form components */}
                    <div className="mt-8 space-y-6">
                        <Form {...form}> {/* Wrap your form fields with the Form component */}
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-medium text-gray-700">First Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id="firstName"
                                                        placeholder="John" // Added placeholder
                                                        disabled={!isEditing}
                                                        className="mt-1"
                                                        {...field} // Binds value, onChange, onBlur etc.
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-medium text-gray-700">Last Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id="lastName"
                                                        placeholder="..." // Added placeholder
                                                        disabled={!isEditing}
                                                        className="mt-1"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-medium text-gray-700">Email Address</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        readOnly
                                                        id="email"
                                                        type="email"
                                                        placeholder="email@example.com"
                                                        disabled={!isEditing}
                                                        className="mt-1"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-medium text-gray-700">Phone</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id="phone"
                                                        placeholder="(xxx) xxx-xxxx" // Added placeholder
                                                        disabled={!isEditing}
                                                        className="mt-1"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="country"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-medium text-gray-700">Country</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id="country"
                                                        placeholder="USA" // Added placeholder
                                                        disabled={!isEditing}
                                                        className="mt-1"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="cityState"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-medium text-gray-700">City/State</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id="cityState"
                                                        placeholder="New York, NY" // Added placeholder
                                                        disabled={!isEditing}
                                                        className="mt-1"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {/* No explicit submit button here for the main form.
                                    The top "Save" button will trigger this form's submission. */}
                            </form>
                        </Form>


                        {/* Change Password Section */}
                        {showPasswordForm && (
                            <div className="mt-8 pt-8 border-t">
                                <h3 className="text-lg font-semibold mb-6 text-center">Change Your Password</h3>
                                <div className="max-w-xl mx-auto space-y-4">
                                    <div>
                                        <Label
                                            htmlFor="currentPassword"
                                            className="text-sm font-medium text-gray-700 block text-center mb-2"
                                        >
                                            Enter previous password
                                        </Label>
                                        <Input
                                            id="currentPassword"
                                            name="currentPassword"
                                            type="password"
                                            placeholder="Password"
                                            value={passwordData.currentPassword}
                                            onChange={handlePasswordChange}
                                            className="text-center"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700 block text-center mb-2">
                                            Enter new password
                                        </Label>
                                        <Input
                                            id="newPassword"
                                            name="newPassword"
                                            type="password"
                                            placeholder="Password"
                                            value={passwordData.newPassword}
                                            onChange={handlePasswordChange}
                                            className="text-center"
                                        />
                                    </div>

                                    <div>
                                        <Label
                                            htmlFor="confirmPassword"
                                            className="text-sm font-medium text-gray-700 block text-center mb-2"
                                        >
                                            Confirm password
                                        </Label>
                                        <Input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            placeholder="Password"
                                            value={passwordData.confirmPassword}
                                            onChange={handlePasswordChange}
                                            className="text-center"
                                        />
                                    </div>

                                    <Button onClick={handlePasswordSave} className="w-full bg-black text-white hover:bg-gray-800 mt-6">
                                        Save
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Change Password Button - Only show when not in password form mode */}
                        {!showPasswordForm && (
                            <div className="flex justify-end mt-8">
                                <Button onClick={handleChangePassword} className="bg-black text-white hover:bg-gray-800">
                                    Change Password
                                </Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}