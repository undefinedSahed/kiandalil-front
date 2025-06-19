import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import QueryProvider from "@/providers/query-provider";

export const metadata: Metadata = {
  title: "Hidden Props",
  description: "Created with Love by the Hidden Props Team",
  generator: "Created with Love by the Hidden Props Team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
