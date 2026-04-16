import Link from "next/link";
import CampaignSummary from "@/components/campaignSummary";
import SessionViewer from "@/components/sessionView";
import Sidebar from "@/components/sidebar";

async function getOneShot(slug) {
    const res = await fetch(
        `https://dedicated-laughter-0dc7376bd1.strapiapp.com/api/one-shots?filters[slug][$eq]=${slug}`
    );

    const data = await res.json();
    return data.data[0];
}

export default async function OneShotPage({ params }) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;

    const oneShot = await getOneShot(slug);

    if (!oneShot) {
        return <div>Not found</div>;
    }

    let formattedStartDate = new Date(oneShot.startDate).toLocaleDateString('en-GB');
    let formattedEndDate = new Date(oneShot.endDate).toLocaleDateString('en-GB');

    return (
        <div className="h-screen w-full flex">
            <Sidebar activeTab={"one-shots"} />

            {/* Main Content */}
            <div className="bg-black w-[75%] h-full">
                <div className="w-full h-[40%] bg-gray-800">

                </div>
                <div className="py-6 px-8 flex flex-col">
                    <div className="border-b-1 border-gray-500 pb-6">
                        <h1 className="text-xl font-bold pb-4">{oneShot.title}</h1>
                        <div className="pb-4">
                            {oneShot.startDate ? `${formattedStartDate}` : 'TBC'} 
                            {oneShot.startDate
                                ? (oneShot.endDate ? `- ${formattedEndDate}` : '- Present') 
                                : ''
                            }
                        </div>
                        <CampaignSummary summary={oneShot.summary} />
                    </div>

                    <SessionViewer sessions={oneShot.session_data} />
                </div>
            </div>
        </div>
    );
}