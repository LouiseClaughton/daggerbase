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

    const navItem = (path, Icon) => {
        const active =
            path === "/"
                ? pathname === "/"
                : pathname.startsWith(path);

        return (
            <div
                className={`
                    relative overflow-hidden
                    h-12 w-12 rounded-xl mx-4 my-4
                    flex items-center justify-center
                    group
                    transition-colors duration-300
                    ${
                        active
                            ? "bg-white text-black"
                            : "text-white hover:text-black hover:bg-white"
                    }
                `}
            >
                <Link
                    href={path}
                    onClick={() => setOpen(false)}
                    className="relative z-10"
                >
                    <Icon />
                </Link>
            </div>
        );
    };

    return (
        <div
            className={`
                fixed sm:relative sm:top-0 left-0
                h-[calc(100vh-2rem)]
                z-50 bg-zinc-700 mx-6 my-4 rounded-3xl
                flex flex-col items-center gap-1
                transform transition-transform duration-300 sm:translate-x-0
                ${open ? "translate-x-0" : "-translate-x-full"}
            `}
        >
            {navItem("/", HomeIcon)}
            {navItem("/campaigns", BookmarkIcon)}
            {navItem("/one-shots", BookIcon)}
            {navItem("/characters", UserIcon)}
        </div>
    );
}