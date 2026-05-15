export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import SessionViewer from "../../components/sessionView";
import OneShotSummary from "../../components/oneShotSummary";
import Tag from "../../components/tag";

import SummaryCard from "../../components/summaryCard";
import CharactersCard from "../../components/charactersCard";

export default async function OneShotPage({ params }) {
    const supabase = await createClient();

    const { slug } = await params;

    const { data: oneShot, error } = await supabase
        .from("One-Shots")
        .select(`
            *,
            Sessions (*),
            Characters (*)
        `)
        .eq("slug", slug)
        .single();

    if (error || !oneShot) {
        return <div>One-shot not found</div>;
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
                            <h1 className="text-5xl">{oneShot.title}</h1>
                        </div>

                        <div className="mb-4">
                            {oneShot.start_date && oneShot.end_date &&
                                <p>{formatDate(oneShot.start_date)} - {formatDate(oneShot.end_date)}</p>
                            }

                            {oneShot.start_date && !oneShot.end_date && oneShot.status == 'Completed' || oneShot.status == 'Ongoing' &&
                                <p>{formatDate(oneShot.start_date)} - Present</p>
                            }

                            {oneShot.start_date && !oneShot.end_date && oneShot.status == 'Upcoming' &&
                                <p>{formatDateAsYear(oneShot.start_date)}</p>
                            }
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <Tag type='One-Shot' />
                            <Tag status={oneShot.status} />
                        </div>

                        <div className="flex flex-col gap-8">
                            {oneShot.summary &&
                                <SummaryCard summary={oneShot.summary} openByDefault={true} />
                            }
                            {oneShot.Characters?.length > 0 &&
                                <CharactersCard characters={oneShot.Characters} openByDefault={false} />
                            }
                            {oneShot.Sessions?.length > 0 &&
                                <SessionViewer sessions={oneShot.Sessions} openByDefault={false} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}