"use client";

import { act, useState } from "react";
import SessionCard from "../components/sessionCard";

export default function SessionViewer({ sessions }) {
    const [activeSession, setActiveSession] = useState(sessions?.[0]);

    return (
        <div className="grid grid-cols-3 h-[70vh] min-h-0 overflow-hidden">
        
            <div className="flex flex-col border-r border-gray-500 pt-6 h-full overflow-y-auto min-h-0 items-center">
                {sessions?.map(session => (
                    <div key={session.id} onClick={() => setActiveSession(session)}>
                        <SessionCard
                            title={session.title}
                            content={session.summary}
                            startDate={session.date}
                            activeSession={activeSession}
                        />
                    </div>
                ))}
            </div>

            <div className="col-span-2 p-6 h-full overflow-y-auto whitespace-pre-line min-h-0">
                {activeSession?.summary}
            </div>

        </div>
    );
}