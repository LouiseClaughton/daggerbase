// app/page.jsx
import { Suspense } from 'react';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import RightArrow from '../assets/right-arrow';
import Tag from '../components/tag';
import CreateCharacterForm from '../components/create-character-form';
import GlobalSearch from '../components/searchbar';

export default async function Characters({ searchParams }) {
    const params = await searchParams;
    const selectedSource = params?.source || "all";

    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    const signedIn = Boolean(session?.user);
    const [
        { data: campaigns, error: campaignsError },
        { data: oneShots, error: oneShotsError },
        { data: campaignList, error: campaignListError }
    ] = await Promise.all([
        supabase
                .from("Campaigns")
                .select(`
                    *,
                    Characters (*)
                `),

        supabase
                .from("One-Shots")
                .select(`
                    *,
                    Characters (*)
                `),

        supabase
                .from("Campaigns")
                .select(`id,title,slug`)
                .order('title', { ascending: true })
        ])

        if (campaignsError) throw campaignsError
        if (oneShotsError) throw oneShotsError
        if (campaignListError) throw campaignListError

        const combined = [
        ...(campaigns || []).map(campaign => ({
            ...campaign,
            type: "Campaign"
        })),

        ...(oneShots || []).map(oneShot => ({
            ...oneShot,
            type: "One-Shot"
        }))
    ]

    const allCharacters = combined.flatMap(item =>
        (item.Characters || []).map(character => ({
            ...character,
            source: {
                id: item.id,
                title: item.title,
                type: item.type,
                link: item.slug
            }
        }))
    );

    const sourceList = [
        ...(campaigns || []).map(campaign => ({
            id: campaign.id,
            title: campaign.title,
            type: "Campaign",
            link: campaign.slug
        })),
        ...(oneShots || []).map(oneShot => ({
            id: oneShot.id,
            title: oneShot.title,
            type: "One-Shot",
            link: oneShot.slug
        })),
    ];

    const sourceCounts = allCharacters.reduce((acc, character) => {
        const key = character.source?.title;
        if (!key) return acc;

        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});

    const filteredCharacters =
    selectedSource === "all"
        ? allCharacters
        : allCharacters.filter(
            (character) => character.source?.title === selectedSource
        );

    return (
        <div className="h-screen w-full flex">
            <div className="bg-white w-full sm:w-[9/12] h-full pt-28 sm:pt-0">
                <Suspense>
                    <div className="w-full">
                        <div className="bg-white text-black w-full sm:w-[9/12] h-full">
                            <div className="flex flex-col">
                                <div className="p-8 sm:p-16 relative sm:ml-20">
                                    <div className="flex flex-col md:flex-row justify-between md:items-center mb-8">
                                        <h2 className="text-5xl mb-4 md:mb-0">Characters</h2>
                                        <GlobalSearch />
                                    </div>

                                    {/* Filter */}
                                    <div className="flex gap-2 flex-wrap mb-6">
                                        <Link
                                            href="/characters?source=all"
                                            className={`px-3 py-1 border rounded transition ${
                                                selectedSource === "all"
                                                    ? "bg-black text-white"
                                                    : "bg-white text-black"
                                            }`}
                                        >
                                            All ({allCharacters.length})
                                        </Link>

                                        {sourceList
                                            ?.filter((source) => sourceCounts[source.title])
                                            .map((source) => (
                                                <Link
                                                    key={`${source.type}-${source.id}`}
                                                    href={`/characters?source=${encodeURIComponent(source.title)}`}
                                                    className={`px-3 py-1 border rounded transition ${
                                                        selectedSource === source.title
                                                            ? "bg-black text-white"
                                                            : "bg-white text-black"
                                                    }`}
                                                >
                                                    {source.title} ({sourceCounts[source.title] || 0})
                                                </Link>
                                            ))}
                                    </div>

                                    <div className="flex flex-col gap-8">
                                        {signedIn &&
                                            <CreateCharacterForm campaigns={campaignList || []} />
                                        }

                                        <div className="w-full flex flex-col lg:grid lg:grid-cols-3 gap-4 lg:gap-8">
                                            {filteredCharacters.map((character) => (
                                                <div
                                                    key={`${character.id}`}
                                                    className="w-full h-full border border black rounded-xl flex flex-col gap-4 p-4"
                                                >
                                                    {character.image_url &&
                                                        <div className="h-16 w-16 pt-2 pb-2 flex items-center">
                                                            <img src={character.image_url} />
                                                        </div>
                                                    }
                                                    <h2 className="text-2xl">{character.character_name} / {character.player_name}</h2>
                                                    <p>{character.ancestry} {character.class}</p>
                                                    <div className="flex gap-2 justify-between items-center">
                                                        {character.source && (
                                                            <Tag
                                                                text={character.source.title}
                                                                type={character.source.type}
                                                                link={character.source.link}
                                                                sourceType={character.source.type}
                                                            />
                                                        )}
                                                        <Link
                                                            href={`/characters/${character.slug}`}
                                                            className="bg-black text-white px-2 py-2 rounded-lg w-fit justify-self-end h-fit"
                                                        >
                                                            <RightArrow className="w-5 h-5" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Suspense>
            </div>
        </div>
    );
}