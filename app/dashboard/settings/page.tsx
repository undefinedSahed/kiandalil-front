"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Save } from "lucide-react"

// Static user data
const userData = {
    firstName: "John",
    lastName: "Edwards",
    email: "steward@gmail.com",
    phone: "(307) 555-0133",
    country: "USA",
    cityState: "Berlin",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
}

export default function SettingsPage() {
    const [isEditing, setIsEditing] = useState(false)
    const [showPasswordForm, setShowPasswordForm] = useState(false)
    const [formData, setFormData] = useState(userData)
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSave = () => {
        // Here you would typically save to an API
        console.log("Saving user data:", formData)
        setIsEditing(false)
        alert("Profile updated successfully!")
    }

    const handlePasswordSave = () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("New passwords do not match!")
            return
        }
        // Here you would typically save to an API
        console.log("Updating password")
        setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        })
        setShowPasswordForm(false)
        alert("Password updated successfully!")
    }

    const handleEdit = () => {
        setIsEditing(true)
        setShowPasswordForm(false)
    }

    const handleChangePassword = () => {
        setShowPasswordForm(true)
        setIsEditing(true)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Personal Information</h1>
                <Button onClick={isEditing ? handleSave : handleEdit} className="bg-black text-white hover:bg-gray-800">
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
                    <div className="flex items-start justify-between">
                        {/* Avatar and Name */}
                        <div className="flex flex-col items-center space-y-4">
                            <Avatar className="w-32 h-32">
                                <AvatarImage src="/placeholder-user.jpg" />
                                <AvatarFallback>HM</AvatarFallback>
                            </Avatar>
                            <h2 className="text-xl font-bold">Henry Moses</h2>
                        </div>

                        {/* Bio Section */}
                        <div className="max-w-5xl text-center">
                            <h3 className="text-xl font-semibold mb-4">Bio</h3>
                            <p className="text-gray-600 leading-relaxed text-base">{formData.bio}</p>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="mt-8 space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                                    First Name
                                </Label>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                                    Last Name
                                </Label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="mt-1"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                    Email Address
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                                    Phone
                                </Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="mt-1"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="country" className="text-sm font-medium text-gray-700">
                                    Country
                                </Label>
                                <Input
                                    id="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="cityState" className="text-sm font-medium text-gray-700">
                                    City/State
                                </Label>
                                <Input
                                    id="cityState"
                                    name="cityState"
                                    value={formData.cityState}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="mt-1"
                                />
                            </div>
                        </div>

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
    )
}
