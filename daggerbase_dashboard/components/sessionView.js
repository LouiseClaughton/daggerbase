"use client";

import { act, useState } from "react";
import Card from "@/components/card";

export default function SessionViewer({ sessions }) {
  const [activeSession, setActiveSession] = useState(sessions?.[0]); // default first

    return (
        <div className="grid grid-cols-3">
            <div className="flex flex-col border-r border-gray-500 pr-6 pt-6">
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

            <div className="col-span-2 p-6">
                {activeSession?.sessionDescription}
            </div>
        </div>
    );
}