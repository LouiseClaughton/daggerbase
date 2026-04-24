"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const getActive = (path) =>
        pathname.startsWith(path) ? "active" : "";

    return (
        <>
            <div className="fixed sm:hidden w-full flex justify-between items-center px-8 pb-8 pt-8 bg-black z-[99] gradient-border">
                <Link href="/" onClick={() => setOpen(false)}>
                    <h1 className="font-amagro text-white text-3xl">
                        Daggerbase
                    </h1>
                </Link>
                {/* Mobile Toggle Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="z-50 bg-gray-800 text-white px-3 py-2 rounded mb-2"
                >
                    <MenuIcon />
                </button>
            </div>

            {/* Overlay (optional but nice UX) */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40 sm:hidden"
                />
            )}

            {/* Sidebar */}
            <div
                className={`
                    fixed sm:relative sm:top-0 left-0 h-screen z-50 bg-gray-700 w-[70%] sm:w-3/12 flex flex-col gap-1 pr-8 py-12 transform transition-transform duration-300 sm:translate-x-0 pt-32 sm:pt-12
                    ${open ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <div className={`sidebar-link relative hidden sm:block ${getActive("/")}`}>
                    <Link href="/" onClick={() => setOpen(false)}>
                        <h1 className="font-amagro text-white text-3xl pl-8">
                            Daggerbase
                        </h1>
                    </Link>
                </div>

                <div className={`sidebar-link pt-6 pb-2 px-4 pl-8 font-amagro relative ${getActive("/campaigns")}`}>
                    <Link href="/campaigns" onClick={() => setOpen(false)}>
                        Campaigns
                    </Link>
                </div>

                <div className={`sidebar-link pt-6 pb-2 px-4 pl-8 font-amagro relative ${getActive("/one-shots")}`}>
                    <Link href="/one-shots" onClick={() => setOpen(false)}>
                        One-Shots
                    </Link>
                </div>

                {/* <div className={`sidebar-link pt-6 pb-2 px-4 pl-8 font-amagro relative ${getActive("/resources")}`}>
                    <Link href="/resources" onClick={() => setOpen(false)}>
                        Resources
                    </Link>
                </div> */}
            </div>
        </>
    );
}