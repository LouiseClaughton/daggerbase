export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import CampaignSummary from "../../components/campaignSummary";
import Link from "next/link";
import Card from "../../components/card";
import SessionViewer from "../../components/sessionView";
import EditCampaignForm from "../../components/campaign-settings";

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
        <div className="w-full">
            <div className="bg-white text-black h-full p-8 sm:p-16 relative sm:ml-20">
                <div className="flex flex-col">
                    <CampaignSummary campaign={campaign} />
                    <SessionViewer sessions={campaign.Sessions} />
                </div>
            </div>
        </div>
    );
}