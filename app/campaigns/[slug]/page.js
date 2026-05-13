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

    function formatDate(dateStr) {
        const [year, month, day] = dateStr.split("-");
        return `${day}/${month}/${year}`;
    }

    function formatDateAsYear(dateStr) {
        const [year, month, day] = dateStr.split("-");
        return `${year}`;
    }

    return (
        <div className="w-full">
            <div className="bg-white text-black w-full sm:w-[9/12] h-full pt-28 sm:pt-0">
                <div className="flex flex-col">
                    <div className="p-8 sm:p-16 relative sm:ml-20">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-5xl">{campaign.title}</h1>
                        </div>

                        <div className="mb-4">
                            {campaign.start_date && campaign.end_date &&
                                <p>{formatDate(campaign.start_date)} - {formatDate(campaign.end_date)}</p>
                            }

                            {campaign.start_date && !campaign.end_date && campaign.status == 'Completed' || campaign.status == 'Ongoing' &&
                                <p>{formatDate(campaign.start_date)} - Present</p>
                            }

                            {campaign.start_date && !campaign.end_date && campaign.status == 'Upcoming' &&
                                <p>{formatDateAsYear(campaign.start_date)}</p>
                            }
                        </div>

                        <div className="flex gap-4 mb-8">
                            <Tag type='Campaign' />
                            <Tag status={campaign.status} />
                        </div>

                        <div className="flex flex-col gap-8">
                            {campaign.summary &&
                                <SummaryCard summary={campaign.summary} openByDefault={true} />
                            }
                            {campaign.Characters?.length > 0 &&
                                <CharactersCard characters={campaign.Characters} openByDefault={false} />
                            }
                            {campaign.Sessions?.length > 0 &&
                                <SessionViewer sessions={campaign.Sessions} openByDefault={false} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}