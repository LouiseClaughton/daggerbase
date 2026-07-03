"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function GlobalSearch() {
    const router = useRouter();
    const [q, setQ] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        if (!q.trim()) return;
        router.push(`/search?q=${encodeURIComponent(q)}`);
    };

    return (
        <form onSubmit={onSubmit} className="w-full max-w-md">
            <div className="flex items-center rounded border px-3 py-2">
                <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search characters, campaigns or one-shots..."
                    className="w-full bg-white outline-none"
                />

                <button type="submit" className="ml-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                    </svg>
                </button>
            </div>
        </form>
    );
}