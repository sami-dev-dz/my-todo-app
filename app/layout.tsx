import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Modern Todo App",
  description: "A clean and efficient task management application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white">{children}</body>
    </html>
  );
}
