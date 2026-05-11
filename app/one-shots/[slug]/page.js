export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import SessionViewer from "../../components/sessionView";
import OneShotSummary from "../../components/oneShotSummary";

export default async function OneShotPage({ params }) {
    const supabase = await createClient();

    const { slug } = await params;

    const { data: oneShot, error } = await supabase
        .from("One-Shots")
        .select(`
            *,
            Sessions (*)
        `)
        .eq("slug", slug)
        .single();

    if (error || !oneShot) {
        return <div>One-shot not found</div>;
    }

    console.log(oneShot);

    return (
        <div className="h-screen w-full flex">
            <div className="bg-gray-800 text-white w-full sm:w-[9/12] h-full pt-28 sm:pt-0">
                <div className="flex flex-col">
                    <OneShotSummary title={oneShot.title} date={oneShot.start_date} slug={oneShot.slug} summary={oneShot.summary} />
                    <SessionViewer sessions={oneShot.Sessions} />
                </div>
            </div>
        </div>
    );
}