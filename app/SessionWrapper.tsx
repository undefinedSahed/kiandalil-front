"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function SessionWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const hiddenRoutes = [
    "/dashboard",
    "/login",
    "/register",
    "/verify-email",
    "/forgot-password",
    "/reset-password",
  ];
  const shouldHide = hiddenRoutes.some((route) => pathname.startsWith(route));

  return (
    <SessionProvider>
      {!shouldHide && <Header />}
      {children}
      {!shouldHide && <Footer />}
    </SessionProvider>
  );
}
