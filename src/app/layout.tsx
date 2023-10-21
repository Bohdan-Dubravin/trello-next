import { ReactQueryProvider } from "@/providers";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NavBar } from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trello clone",
  description: "Trello clone with ts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className="dark bg-gray-900 ">
        <ReactQueryProvider>
          <NavBar />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
