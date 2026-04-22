import { createClient } from "@/lib/supabase/server";
import CampaignSummary from "../../components/campaignSummary";
import Sidebar from "../../components/sidebar";
import Link from "next/link";

export default async function OneShotPage({ params }) {
    const supabase = await createClient();

    const { slug } = await params;

    const { data: oneShot, error } = await supabase
        .from("One-Shots")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error || !oneShot) {
        return <div>One-shot not found</div>;
    }

    return (
        <div className="h-screen w-full flex">
            <Sidebar activeTab={"one-shots"} />
            <div className="bg-black w-[75%] h-full">
                <div className="flex flex-col">
                    <div className="p-16 gradient-border">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="font-amagro text-xl">{oneShot.title}</h2>
                            <Link href={`/resources/${oneShot.slug}`} className="font-amagro text-base underline">Downloads</Link>
                        </div>
                        <CampaignSummary summary={oneShot.summary} />
                    </div>
                </div>
            </div>
        </div>
    );
}