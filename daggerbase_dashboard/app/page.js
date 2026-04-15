import { fetchCampaigns } from "@/lib/api";
import Card from "@/components/card";

export default async function Home() {
  const sessions = await fetchSessions();

  return (
    <div className="h-screen w-full flex">
      <div className="bg-gray-700 w-[25%] h-full flex flex-col items-center justify-center gap-1">
        <div className="w-full bg-purple-600 py-2 px-4">
          <button>All Sessions</button>
        </div>
        <div className="w-full bg-gray-900 py-2 px-4">
          <button>Campaigns</button>
        </div>
        <div className="w-full bg-gray-900 py-2 px-4">
          <button>One-Shots</button>
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
            />
          ))}
        </div>
      </div>
    </div>
  );
}

