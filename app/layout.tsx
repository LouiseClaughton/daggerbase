import type { Metadata } from "next";
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

import { Bebas_Neue } from "next/font/google";
import { Afacad } from "next/font/google";

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: "--font-bebas",
})

const afacad = Afacad({
  subsets: ['latin'],
  weight: '400',
  variable: "--font-afacad",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="sm:overflow-hidden">
      <body className={`${bebasNeue.variable} ${afacad.variable} antialiased flex bg-white text-black`}>
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
