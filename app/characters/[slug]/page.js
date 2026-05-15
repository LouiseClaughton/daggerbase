export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import CampaignSummary from "../../components/campaignSummary";
import Link from "next/link";
import Card from "../../components/card";
import EditCampaignForm from "../../components/campaign-settings";
import RightArrow from "../../assets/right-arrow";
import SessionViewer from "../../components/sessionView";
import Tag from "../../components/tag";

import PlusIcon from "../../assets/plus-icon";
import MinusIcon from "../../assets/minus-icon";
import CharactersCard from "../../components/charactersCard";
import SummaryCard from "../../components/summaryCard";

export default async function CharacterPage({ params }) {
    const supabase = await createClient();

    const { slug } = await params;

    const [
        { data: campaign, error: campaignError },
        { data: oneShot, error: oneShotError }
    ] = await Promise.all([
        supabase
            .from("Campaigns")
            .select(`
                *,
                Characters!inner (*)
            `)
            .eq("Characters.slug", slug),

        supabase
            .from("One-Shots")
            .select(`
                *,
                Characters!inner (*)
            `)
            .eq("Characters.slug", slug)
    ]);

    const combined = [
        ...(campaign?.length ? [{
            ...campaign[0],
            type: "Campaign"
        }] : []),

        ...(oneShot?.length ? [{
            ...oneShot[0],
            type: "One-Shot"
        }] : [])
    ];

    const allCharacters = combined.flatMap(item =>
        (item.Characters || []).map(character => ({
            ...character,
            source: {
                id: item.id,
                title: item.title,
                type: item.type,
            }
        }))
    );

    const character = allCharacters.find(
        character => character.slug === slug
    );

    if (!character) {
        return <div>Character not found</div>;
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

                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <Tag type={character.source.type} />
                            <Tag source={character.source.title} />
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