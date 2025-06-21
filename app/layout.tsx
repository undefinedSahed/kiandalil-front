// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import SessionWrapper from "./SessionWrapper";

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
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
