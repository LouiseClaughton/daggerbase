"use client";

import { useState, useRef, useEffect } from "react";

import PlusIcon from "../assets/plus-icon";
import MinusIcon from "../assets/minus-icon";

export default function SummaryCard ({ summary, title = "Summary", openByDefault }) {
    const [isOpen, setIsOpen] = useState(openByDefault);

    const contentRef = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (contentRef.current) {
          setHeight(contentRef.current.scrollHeight);
        }
      }, [summary, isOpen]);

    return (
        <div className="w-full h-full border border-black rounded-xl flex flex-col p-4">
            <div className="flex items-center gap-x-4">
                <h2 className="text-3xl">{title}</h2>
        
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2"
                >
                    {isOpen ? <MinusIcon /> : <PlusIcon />}
                </button>
            </div>
        
            <div
                style={{
                    maxHeight: isOpen ? `${height}px` : "0px",
                }}
                className="overflow-hidden transition-all duration-300 ease-in-out"
            >
                <div ref={contentRef} className="whitespace-pre-line">{summary}</div>
            </div>
        </div>
    )
}