import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Inria_Serif } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Sidebar from "./components/sidebar";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Daggerbase",
  description: "A database powered by Supabase for storing Daggerheart campaigns",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

const inriaSerif = Inria_Serif({
  variable: "--font-inria-serif",
  weight: "400"
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="sm:overflow-hidden">
      <body className={`${geistSans.className} ${inriaSerif.className} antialiased flex`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Sidebar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
