import { createClient } from "@/lib/supabase/server";

export default async function CampaignPage({ params }) {
    const supabase = await createClient();

    const { slug } = await params;

    const { data: campaign, error } = await supabase
        .from("Campaigns")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error || !campaign) {
        return <div>Campaign not found</div>;
    }

    return (
        <div>
            <h1>{campaign.title}</h1>
            <p>{campaign.summary}</p>
        </div>
    );
}