"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import MenuIcon from "../assets/menu-icon";
import HomeIcon from "../assets/home-icon";
import BookmarkIcon from "../assets/bookmark-icon";
import BookIcon from "../assets/book-icon";
import UserIcon from "../assets/user-icon";

export default function Sidebar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const getActive = (path) => {
        if (path === "/") {
            return pathname === "/" ? "bg-white text-black" : "";
        }

        return pathname.startsWith(path)
            ? "bg-white text-black"
            : "";
    };

    return (
        <>
            <div className="fixed sm:hidden w-full flex justify-between items-center px-8 pb-8 pt-8 bg-black z-[99] gradient-border">
                <Link href="/" onClick={() => setOpen(false)}></Link>
                {/* Mobile Toggle Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="z-50 bg-gray-800 text-white px-3 py-2 rounded mb-2"
                >
                    <MenuIcon />
                </button>
            </div>

            {/* Overlay */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40 sm:hidden"
                />
            )}

            {/* Sidebar */}
            <div
                className={`
                    fixed sm:relative sm:top-0 left-0 h-[calc(100vh-2rem)] z-50 bg-black mx-6 my-4 rounded-3xl w-1/12 flex flex-col items-center gap-1 transform transition-transform duration-300 sm:translate-x-0
                    ${open ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <div className={`${getActive("/")} h-12 w-12 rounded-xl m-6 flex items-center justify-center`}>
                    <Link href="/" onClick={() => setOpen(false)}><HomeIcon /></Link>
                </div>

                <div className={`${getActive("/campaigns")} h-12 w-12 rounded-xl m-6 flex items-center justify-center`}>
                    <Link href="/campaigns" onClick={() => setOpen(false)}><BookmarkIcon /></Link>
                </div>

                <div className={`${getActive("/one-shots")} h-12 w-12 rounded-xl m-6 flex items-center justify-center`}>
                    <Link href="/one-shots" onClick={() => setOpen(false)}><BookIcon /></Link>
                </div>

                <div className={`${getActive("/characters")} h-12 w-12 rounded-xl m-6 flex items-center justify-center`}>
                    <Link href="/characters" onClick={() => setOpen(false)}><UserIcon /></Link>
                </div>
            </div>
        </>
    );
}