import { createClient } from '@/lib/supabase/server';
import GlobalSearch from '../components/searchbar';
import Link from "next/link";

export default async function SearchPage({ searchParams }) {
    const params = await searchParams;
    const query = params?.q?.trim() || "";

    if (!query) {
        return <div className="p-8">Type something to search.</div>;
    }

    const supabase = await createClient();

    const [{ data: characters }, { data: campaigns }, { data: oneShots }] =
        await Promise.all([
            supabase
                .from("Characters")
                .select("*")
                .ilike("character_name", `%${query}%`),

            supabase
                .from("Campaigns")
                .select("*")
                .ilike("title", `%${query}%`),

            supabase
                .from("One-Shots")
                .select("*")
                .ilike("title", `%${query}%`),
        ]);

    const results = [
        ...(characters || []).map((character) => ({
            type: "Character",
            id: character.id,
            title: character.character_name,
            slug: character.slug,
        })),

        ...(campaigns || []).map((campaign) => ({
            type: "Campaign",
            id: campaign.id,
            title: campaign.title,
            slug: campaign.slug,
        })),

        ...(oneShots || []).map((oneShot) => ({
            type: "One-Shot",
            id: oneShot.id,
            title: oneShot.title,
            slug: oneShot.slug,
        })),
    ];

    return (
        <div className="p-8 sm:p-16 relative sm:ml-20 pt-28">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <h1 className="text-5xl mb-4">Search results for "{query}"</h1>
                <GlobalSearch />
            </div>

            {results.length === 0 ? (
                <p>No results found.</p>
            ) : (
                <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 lg:gap-8">
                    {results.map((result, index) => {
                        let href = "#";

                        if (result.type === "Character") {
                            href = `/characters/${result.slug}`;
                        } else if (result.type === "Campaign") {
                            href = `/campaigns/${result.slug}`;
                        } else if (result.type === "One-Shot") {
                            href = `/one-shots/${result.slug}`;
                        }

                        return (
                            <Link
                                key={index}
                                href={href}
                                className="border p-3 rounded block hover:bg-gray-50"
                            >
                                <p className="text-sm text-gray-500">{result.type}</p>
                                <p className="text-lg">{result.title}</p>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}