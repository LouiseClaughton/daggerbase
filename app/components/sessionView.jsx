"use client";

import { act, useState } from "react";
import SessionCard from "../components/sessionCard";
import PlusIcon from "../assets/plus-icon";
import MinusIcon from "../assets/minus-icon";

export default function SessionViewer({ sessions, openByDefault }) {
    const [activeSession, setActiveSession] = useState(sessions?.[0]);
    const [isOpen, setIsOpen] = useState(openByDefault);

    function formatDate(dateStr) {
        const [year, month, day] = dateStr.split("-");
        return `${day}/${month}/${year}`;
    }

    return (
        <div className="w-full border border-black rounded-xl p-4">
            <div className="flex items-center gap-x-4">
                <h2 className="text-3xl">Sessions</h2>
        
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
                    <div className="flex flex-col sm:grid sm:grid-cols-[1fr_2fr] gap-8 h-[30rem]">

                        <div className="
                            flex sm:flex-col items-stretch gap-8 overflow-x-auto
                            sm:overflow-y-auto sm:overflow-x-hidden sm:h-full sm:min-h-0 sm:pr-6
                        ">
                            {sessions?.map(session => (
                                <div
                                    key={session.id}
                                    onClick={() => setActiveSession(session)}
                                    className="w-80 sm:w-full flex-shrink-0"
                                >
                                    <SessionCard
                                        title={session.title}
                                        content={session.summary}
                                        date={session.date}
                                        activeSession={activeSession}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="p-6 whitespace-pre-line border border-black rounded-xl flex-1 overflow-y-auto sm:min-h-0">
                            <div className="pb-4">
                                <h3 className="text-2xl pb-4">
                                    {activeSession?.title}
                                </h3>

                                <span className="mb-4">
                                    {activeSession?.date &&
                                        formatDate(activeSession.date)}
                                </span>
                            </div>

                            <div className="pb-8">
                                {activeSession?.summary}
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}