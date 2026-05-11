import { createClient } from '@/lib/supabase/server';
import Card from "../components/card";
import CreateCampaignForm from '../components/create-campaign-form';
import Link from 'next/link';
import RightArrow from '../assets/right-arrow';

export default async function Campaigns() {
    const supabase = await createClient()
    const { data: campaigns, error } = await supabase
        .from("Campaigns")
        .select(`
            *,
            Sessions (*),
            Characters (*)
        `)

    if (campaigns) {
        const latestCampaign = campaigns
            .filter(
                (campaign) =>
                    campaign.campaign_status === "Completed" ||
                    campaign.campaign_status === "Ongoing"
            )
            .sort(
                (a, b) =>
                    new Date(b.start_date) - new Date(a.start_date)
            )[0];

        function formatDate(dateStr) {
            const [year, month, day] = dateStr.split("-");
            return `${day}/${month}/${year}`;
        }

        function formatDateAsYear(dateStr) {
            const [year, month, day] = dateStr.split("-");
            return `${year}`;
        }

        return (
            <div className="h-screen w-full flex">
                <div className="bg-gray-800 text-white w-full sm:w-[9/12] h-full pt-28 sm:pt-0">
                    <div className="flex flex-col">
                        <div className="p-8 sm:p-16">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-xl">Campaigns</h2>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <div className="w-full">
                                        <CreateCampaignForm />
                                    </div>
                                    <div className="bg-[#b971aa] p-4 rounded-xl mb-8 w-full flex flex-col gap-4">
                                        <span className="font-semibold">Upcoming campaigns</span>
                                        {campaigns.map((campaign) => (
                                            (campaign.campaign_status === "Upcoming" && (
                                                <div
                                                    key={campaign.id}
                                                    className="grid grid-cols-[2fr_2fr_1fr] items-center"
                                                >
                                                    <span>{campaign.title}</span>
                                                    <span>{campaign.campaign_status} - {formatDateAsYear(campaign.start_date)}</span>
                                                    <Link
                                                        href={`/campaigns/${campaign.slug}`}
                                                        className="bg-black text-white px-3 py-3 rounded-xl w-fit justify-self-end"
                                                    >
                                                        <RightArrow className="w-5 h-5" />
                                                    </Link>
                                                </div>
                                            ))
                                        ))}
                                    </div>
                                    <div className="bg-[#ce6077] p-4 rounded-xl mb-8 w-full flex flex-col gap-4">
                                        <span className="font-semibold">Previous campaigns</span>
                                        {campaigns.map((campaign) => (
                                            (campaign.campaign_status === "Completed" ||
                                                campaign.campaign_status === "Ongoing") && (
                                                <div
                                                    key={campaign.id}
                                                    className="grid grid-cols-[2fr_2fr_1fr] items-center"
                                                >
                                                    <span>{campaign.title}</span>
                                                    {(
                                                        campaign.campaign_status === "Completed" ||
                                                        campaign.campaign_status === "Ongoing"
                                                    ) && (
                                                        <span>
                                                            {campaign.start_date && 
                                                                formatDate(campaign.start_date)
                                                            }
                                                            {campaign.end_date ? (
                                                                <span> - {formatDate(campaign.end_date)}</span>
                                                            ) : (
                                                                <span> - Present</span>
                                                            )}
                                                        </span>
                                                    )}
                                                    <Link
                                                        href={`/campaigns/${campaign.slug}`}
                                                        className="bg-black text-white px-3 py-3 rounded-xl w-fit justify-self-end"
                                                    >
                                                        <RightArrow className="w-5 h-5" />
                                                    </Link>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div className="w-full h-full bg-[#f8c066] text-black p-4 rounded-xl mb-8 flex flex-col">
                                        <Link 
                                            href={`/campaigns/${latestCampaign.slug}`}
                                            className="flex justify-between items-start border-b border-black">
                                            <span className="font-semibold pb-2">Most recent campaign: 
                                                {latestCampaign && (
                                                    <span className="ml-2">{latestCampaign.title}</span>
                                                )}
                                            </span>
                                            <RightArrow className="text-black" />
                                        </Link>
                                        <div className="my-4 whitespace-pre-line line-clamp-[12]">
                                            {latestCampaign.summary}
                                        </div>
                                        {latestCampaign.Characters && (
                                            <div className="w-full">
                                                <span className="font-semibold border-b border-black py-2 mb-4 block w-full">Player Characters</span>
                                                {latestCampaign.Characters.map((character) => (
                                                    <div
                                                        key={character.id}
                                                        className="grid grid-cols-[2fr_2fr_1fr] items-center [&:not(:last-child)]:border-b border-black p-2"
                                                    >
                                                        <span>{character.character_name}</span>
                                                        <span>{character.ancestry} {character.class}</span>
                                                        <Link
                                                            href={`/characters/${character.slug}`}
                                                            className="bg-black text-white px-3 py-3 rounded-xl w-fit justify-self-end"
                                                        >
                                                            <RightArrow className="w-5 h-5" />
                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}