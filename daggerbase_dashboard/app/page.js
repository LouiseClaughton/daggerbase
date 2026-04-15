import { fetchSessions } from "@/lib/api";
import Card from "@/components/card";
import Link from "next/link";

export default async function Home() {
  const sessions = await fetchSessions();

  return (
    <div className="h-screen w-full flex">
      <div className="bg-gray-700 w-[25%] h-full flex flex-col items-center justify-center gap-1">
        <div className="w-full bg-purple-600 py-2 px-4">
          <Link href="/sessions">All Sessions</Link>
        </div>
        <div className="w-full bg-gray-900 py-2 px-4">
          <Link href="/campaigns">Campaigns</Link>
        </div>
        <div className="w-full bg-gray-900 py-2 px-4">
          <Link href="/one-shots">One-Shots</Link>
        </div>
      </div>
      <div className="bg-black w-[75%] h-full">
        <div className="grid grid-cols-3 gap-4 py-6 px-8">
          {sessions.map(session => (
            <Card
              key={session.id}
              title={session.title}
              content={session.summary}
              startDate={session.date}
              campaign={session.campaign.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

