export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import CampaignSummary from "../../components/campaignSummary";
import Link from "next/link";
import Card from "../../components/card";
import EditCampaignForm from "../../components/campaign-settings";
import RightArrow from "../../assets/right-arrow";
import SessionViewer from "../../components/sessionView";

export default async function CampaignPage({ params }) {
    const supabase = await createClient();

    const { slug } = await params;

    const { data: campaign, error } = await supabase
        .from("Campaigns")
        .select(`
            *,
            Sessions (*),
            Characters (*)
        `)
        .eq("slug", slug)
        .single();

    if (error || !campaign) {
        console.log(error);
        return <div>Campaign not found</div>;
    }

    return (
        <div className="w-full">
            <div className="bg-white text-black w-full sm:w-[9/12] h-full pt-28 sm:pt-0">
                <div className="flex flex-col">
                    <div className="p-8 sm:p-16 relative sm:ml-20">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-5xl">{campaign.title}</h1>
                        </div>

                        <div className="flex flex-col gap-8">
                            <div className="w-full h-full border border black rounded-xl flex flex-col gap-4 p-4">
                                <h2 className="text-3xl">Summary</h2>
                                <div className="whitespace-pre-line">{campaign.summary}</div>
                            </div>
                            <div className="w-full h-full border border black rounded-xl flex flex-col gap-4 p-4">
                                <h2 className="text-3xl">Characters</h2>
                                <div className="grid grid-cols-3 gap-8">
                                    {campaign.Characters.map((character) => (
                                        <div
                                            key={`${character.id}`}
                                            className="w-full h-full border border black rounded-xl flex flex-col gap-4 p-4"
                                        >
                                            <div className="flex justify-between">
                                                <h2 className="text-2xl">{character.character_name} / {character.player_name}</h2>
                                                <Link
                                                    href={`/characters/${character.slug}`}
                                                    className="bg-black text-white px-2 py-2 rounded-lg w-fit justify-self-end"
                                                >
                                                    <RightArrow className="w-5 h-5" />
                                                </Link>
                                            </div>
                                            <p>{character.ancestry} {character.class}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <SessionViewer sessions={campaign.Sessions} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}