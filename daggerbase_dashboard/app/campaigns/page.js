import { fetchCampaigns } from "@/lib/api";
import Card from "@/components/card";
import Link from "next/link";

export default async function Campaigns() {
    const campaigns = await fetchCampaigns();
    console.log(campaigns);

    return (
        <div className="h-screen w-full flex">
            <div className="bg-gray-700 w-[25%] h-full flex flex-col items-center justify-center gap-1">
                <div className="w-full bg-gray-900 py-2 px-4">
                    <Link href="/">All Sessions</Link>
                </div>
                <div className="w-full bg-purple-600 py-2 px-4">
                    <Link href="/campaigns">Campaigns</Link>
                </div>
                <div className="w-full bg-gray-900 py-2 px-4">
                    <Link href="/one-shots">One-Shots</Link>
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
                            href={`/campaigns/${campaign.slug}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}