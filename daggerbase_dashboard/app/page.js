import { fetchSessions } from "@/lib/api";
import Card from "@/components/card";
import Sidebar from "@/components/sidebar";

export default async function Home() {
  const sessions = await fetchSessions();

  return (
    <div className="h-screen w-full flex">
      <Sidebar activeTab={"sessions"} />
      <div className="bg-black w-[75%] h-full">
        <div className="grid grid-cols-3 gap-4 py-6 px-8">
          {sessions.map(session => (
            <Card
              key={session.id}
              title={session.title}
              content={session.summary}
              startDate={session.date}
              campaign={session.campaign?.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

