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
        <div className="w-full h-full flex flex-col">
            <div className="flex flex-col sm:grid sm:grid-cols-3 h-[65vh] min-h-0 sm:overflow-hidden">
            
                <div className={`flex sm:flex-col h-full overflow-y-auto min-h-0 items-center gap-8`}>
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

                <div className="col-span-2 p-6 h-full sm:overflow-y-auto whitespace-pre-line min-h-0">
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