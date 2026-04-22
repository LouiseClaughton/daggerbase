import { createClient } from "@/lib/supabase/server";
import Sidebar from "../../components/sidebar";
import CampaignSummary from "../../components/campaignSummary";
import Link from "next/link";
import Card from "../../components/card";
import SessionViewer from "../../components/sessionView";

export default async function CampaignPage({ params }) {
    const supabase = await createClient();

    const { slug } = await params;
    

    const { data: campaign, error } = await supabase
        .from("Campaigns")
        .select(`
            *,
            Sessions (*)
        `)
        .eq("slug", slug)
        .single();

    if (error || !campaign) {
        console.log(error);
        return <div>Campaign not found</div>;
    }

    console.log(JSON.stringify(campaign, null, 2));

    return (
        <div className="h-screen w-full flex">
            <Sidebar activeTab={"campaigns"} />
            <div className="bg-black w-[75%] h-full">
                <div className="flex flex-col">
                    <div className="p-16 gradient-border">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="font-amagro text-xl">{campaign.title}</h2>
                            <Link href={`/resources/${campaign.slug}`} className="font-amagro text-base underline">Downloads</Link>
                        </div>
                        <CampaignSummary summary={campaign.summary} />
                    </div>
                    <SessionViewer sessions={campaign.Sessions} />
                </div>
            </div>
        </div>
    );
}