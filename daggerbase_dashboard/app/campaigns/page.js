import { fetchCampaigns } from "@/lib/api";
import Card from "@/components/card";
import Sidebar from "@/components/sidebar";

export default async function Campaigns() {
    const campaigns = await fetchCampaigns();
    console.log(campaigns);

    return (
        <div className="h-screen w-full flex">
            <Sidebar activeTab={"campaigns"} />
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
                            image={campaign.Image}
                            type={"campaign"}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}