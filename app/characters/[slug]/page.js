export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import Tag from "../../components/tag";
import SummaryCard from "../../components/summaryCard";

export default async function CharacterPage({ params }) {
    const supabase = await createClient();

    const { slug } = await params;

    const { data: character, error: characterError } = await supabase
        .from("Characters")
        .select("*")
        .eq("slug", slug)
        .single();

    if (characterError || !character) {
        return <div>Character not found</div>;
    }

    let source = null;

    if (character.campaign) {
        const { data: campaign } = await supabase
            .from("Campaigns")
            .select("id,title")
            .eq("id", character.campaign)
            .single();

        if (campaign) {
            source = {
                id: campaign.id,
                title: campaign.title,
                type: "Campaign"
            };
        }
    } else if (character.one_shot_id || character.oneShot_id) {
        const oneShotId = character.one_shot_id || character.oneShot_id;
        const { data: oneShot } = await supabase
            .from("One-Shots")
            .select("id,title")
            .eq("id", oneShotId)
            .single();

        if (oneShot) {
            source = {
                id: oneShot.id,
                title: oneShot.title,
                type: "One-Shot"
            };
        }
    }

    return (
        <div className="w-full">
            <div className="bg-white text-black w-full sm:w-[9/12] h-full pt-28 sm:pt-0">
                <div className="flex flex-col">
                    <div className="p-8 sm:p-16 relative sm:ml-20">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-5xl">{character.character_name}</h1>
                        </div>

                        <div className="mb-4">
                            {character.ancestry} {character.class}
                        </div>

                        <div className="flex flex-row gap-4 mb-8">
                            {source ? (
                                <>
                                    <Tag type={source.type} />
                                    <Tag source={source.title} />
                                </>
                            ) : (
                                <Tag text="Unlinked character" />
                            )}
                        </div>

                        <div className="flex flex-col gap-8">
                            {character.backstory &&
                                <SummaryCard summary={character.backstory} openByDefault={true} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}