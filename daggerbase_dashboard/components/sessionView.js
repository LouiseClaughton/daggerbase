"use client";

import { act, useState } from "react";
import Card from "@/components/card";

export default function SessionViewer({ sessions }) {
  const [activeSession, setActiveSession] = useState(sessions?.[0]); // default first

    return (
        <div className={`${sessions?.length > 0 ? 'grid grid-cols-3 flex-1 min-h-0 overflow-hidden' : ''}`}>
            <div className={`${sessions?.length > 0 ? 'flex flex-col border-r border-gray-500 pr-6 pt-6 overflow-y-auto custom-scrollbar' : ''}`}>
                {sessions?.map(session => (
                    <div
                        key={session.id}
                        onClick={() => setActiveSession(session)}
                    >
                        <Card
                            title={session.title}
                            content={session.summary}
                            startDate={session.date}
                            activeSession={activeSession}
                        />
                    </div>
                ))}
            </div>

            <div className="col-span-2 p-6 overflow-y-auto custom-scrollbar whitespace-pre-line">
                {activeSession?.sessionDescription}
            </div>
        </div>
    );
}