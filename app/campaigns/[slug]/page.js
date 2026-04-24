import { createClient } from "@/lib/supabase/server";
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

    return (
        <div className="h-screen w-full flex">
            <div className="bg-black w-full sm:w-[9/12] h-full pt-28 sm:pt-0">
                <div className="flex flex-col">
                    <CampaignSummary title={campaign.title} slug={campaign.slug} startDate={campaign.start_date} endDate={campaign.end_date} summary={campaign.summary} />
                    <SessionViewer sessions={campaign.Sessions} />
                </div>
            </div>
        </div>
    );
}