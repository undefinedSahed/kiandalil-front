/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { getSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
});

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODRjMDdiNjNhZGU3ZjUzNzhiZTA5MjkiLCJlbWFpbCI6InppaGFkdWxpc2xhbS5iZGNhbGxpbmdAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUwMzE0MjE0LCJleHAiOjE3NTA0MDA2MTR9.XmRS9vzteH1O-tXRHXl8wWBKHhlgVqsMM47sU5SSrjw"

// Add request interceptor to add auth token
api.interceptors.request.use(
    async (config) => {
        // const session = await getSession();
        if (TOKEN) {
            config.headers.Authorization = `Bearer ${TOKEN}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);




// Properties API

export async function fetchApprovedProperties() {
    try {
        const response = await api.get(`/properties/approved/all`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to fetch approved properties");
    }
}


export async function fetchUnApprovedProperties() {
    try {
        const response = await api.get(`/properties/unapproved/all`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to fetch approved properties");
    }
}


export async function updatePropertyStatus(id: string, approve: boolean) {
    try {
        const response = await api.patch(`/properties/approve/${id}`, { approve });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to update property status");
    }
}



export async function postNews(subject: string, html: string) {
    try {
        const response = await api.post(`/newsletter/broadcast`, { subject, html });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to update property status");
    }
}