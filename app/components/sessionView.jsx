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
        <div className="flex flex-col sm:grid sm:grid-cols-3 h-[70vh] min-h-0 sm:overflow-hidden pb-12 sm:p-0">
        
            <div className={`flex sm:flex-col ${sessions.length > 0 ? 'border-r border-gray-500' : ''} px-6 sm:py-6 sm:px-6 h-full overflow-y-auto min-h-0 items-center gap-8`}>
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

            <div className="col-span-2 p-6 h-full sm:overflow-y-auto whitespace-pre-line min-h-0 text-white">
                <div className="pb-4">
                    <h3 className="font-amagro text-xl pb-4">{activeSession?.title}</h3>
                    <span className="mb-4">
                        {activeSession && activeSession.date &&
                            formatDate(activeSession.date)
                        }
                    </span>
                </div>
                <div className="pb-8">{activeSession?.summary}</div>
            </div>

        </div>
    );
}