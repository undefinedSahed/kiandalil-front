"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function SessionWrapper({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <Header />
      {children}
      <Footer />
    </SessionProvider>
  )
}
