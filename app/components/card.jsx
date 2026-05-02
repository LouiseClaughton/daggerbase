"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Card({ title, href, activeSession, image }) {
    let active;
    const [loaded, setLoaded] = useState(false);

    if (activeSession && title == activeSession.title) {
        active = true;
    }

    return (
        <Link href={href ? href : '/'}>
            <div className={`
                bg-gray-900 rounded-lg h-full flex flex-col font-rubik flex-1 w-80 overflow-hidden
                ${active ? 'bg-white text-black' : 'hover:cursor-pointer hover:bg-gray-900 hover:text-white transition-colors'}
            `}>
                {image ? (
                    <div className="w-full h-40 mb-4 relative bg-gray-800 overflow-hidden">
                        
                        {/* Skeleton */}
                        {!loaded && (
                            <div className="absolute inset-0 animate-pulse bg-gray-700" />
                        )}

                        {/* Image */}
                        <Image
                            src={image}
                            alt={title}
                            fill
                            onLoad={() => setLoaded(true)}
                            className={`object-cover transition-opacity duration-500 ${
                                loaded ? "opacity-100" : "opacity-0"
                            }`}
                        />
                    </div>
                ) : (
                    <div className="w-full h-40 mb-4 bg-gray-400"></div>
                )}
                <h3 className={`font-bold ${active ? 'text-purple-600' : 'text-white'} text-center pb-4`}>{title}</h3>
            </div>
        </Link>
    );
}