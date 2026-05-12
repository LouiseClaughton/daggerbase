"use client";

import { act, useState } from "react";
import SessionCard from "../components/sessionCard";

export default function SessionViewer({ sessions }) {
    const [activeSession, setActiveSession] = useState(sessions?.[0]);

    function formatDate(dateStr) {
        const [year, month, day] = dateStr.split("-");
        return `${day}/${month}/${year}`;
    }

    return (
        <div className="w-full h-[30rem] flex flex-col">
            <div className="flex-1 min-h-0 flex flex-col sm:grid sm:grid-cols-[1fr_2fr] gap-8 overflow-hidden">
            
                <div className={`flex flex-col h-full overflow-y-auto min-h-0 items-center gap-8 pr-6`}>
                    {sessions?.map(session => (
                        <div key={session.id} onClick={() => setActiveSession(session)}>
                            <SessionCard
                                title={session.title}
                                content={session.summary}
                                date={session.date}
                                activeSession={activeSession}
                            />
                        </div>
                    ))}
                </div>

                <div className="p-6 sm:overflow-y-auto whitespace-pre-line min-h-0 border border-black rounded-xl">
                    <div className="pb-4">
                        <h3 className="text-2xl pb-4">{activeSession?.title}</h3>
                        <span className="mb-4">
                            {activeSession && activeSession.date &&
                                formatDate(activeSession.date)
                            }
                        </span>
                    </div>
                    <div className="pb-8">{activeSession?.summary}</div>
                </div>

            </div>
        </div>
    );
}