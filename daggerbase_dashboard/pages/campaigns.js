import { fetchCampaigns } from "@/lib/api";
import Card from "@/components/card";

export default async function Campaigns() {
    const campaigns = await fetchCampaigns();

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
                    {campaigns.map(campaign => (
                        <Card
                            key={campaign.id}
                            title={campaign.title}
                            content={campaign.summary}
                            startDate={campaign.startDate}
                            endDate={campaign.endDate}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

