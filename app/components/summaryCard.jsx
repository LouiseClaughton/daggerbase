"use client";

import { useState } from "react";

import PlusIcon from "../assets/plus-icon";
import MinusIcon from "../assets/minus-icon";

export default function SummaryCard ({ summary }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="w-full h-full border border-black rounded-xl flex flex-col p-4">
            <div className="flex items-center gap-x-4">
                <h2 className="text-3xl">Summary</h2>
        
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2"
                >
                    {isOpen ? <MinusIcon /> : <PlusIcon />}
                </button>
                </div>
        
                <div
                className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? "max-h-[2000px] opacity-100 mt-4" : "max-h-0 opacity-0"}
                `}
                >
                <div className="whitespace-pre-line">{summary}</div>
            </div>
        </div>
    )
}