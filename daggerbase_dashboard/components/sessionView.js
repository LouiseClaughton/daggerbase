"use client";

import { act, useState } from "react";
import Card from "@/components/card";

export default function SessionViewer({ sessions }) {
    const [activeSession, setActiveSession] = useState(sessions?.[0]);

    return (
        <div className="grid grid-cols-3 h-[70vh] min-h-0 overflow-hidden">
        
            <div className="flex flex-col border-r border-gray-500 pr-6 pt-6 h-full overflow-y-auto custom-scrollbar min-h-0">
                {sessions?.map(session => (
                    <div key={session.id} onClick={() => setActiveSession(session)}>
                        <Card
                            title={session.title}
                            content={session.summary}
                            startDate={session.date}
                            activeSession={activeSession}
                        />
                    </div>
                ))}
            </div>

            <div className="col-span-2 p-6 h-full overflow-y-auto custom-scrollbar whitespace-pre-line min-h-0">
                {activeSession?.sessionDescription}
            </div>

        </div>
    );
}