import Link from "next/link";
import Card from "@/components/card";
import CampaignSummary from "@/components/campaignSummary";
import SessionViewer from "@/components/sessionView";

async function getCampaign(slug) {
  const res = await fetch(
    `https://dedicated-laughter-0dc7376bd1.strapiapp.com/api/campaigns?filters[slug][$eq]=${slug}&populate=*`
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("Strapi error response:", text);
    throw new Error(`Strapi request failed: ${res.status}`);
  }

  const data = await res.json();
  return data.data?.[0] || null;
}

export default async function CampaignPage({ params }) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;

    const campaign = await getCampaign(slug);

    if (!campaign) {
        return <div>Not found</div>;
    }

    return (
        <div className="h-screen w-full flex">
            {/* Sidebar */}
            <div className="bg-gray-700 w-[25%] h-full flex flex-col items-center justify-center gap-1">
                <div className="w-full bg-gray-900 py-2 px-4">
                    <Link href="/">All Sessions</Link>
                </div>
                <div className="w-full bg-purple-600 py-2 px-4">
                    <Link href="/campaigns">Campaigns</Link>
                </div>
                <div className="w-full bg-gray-900 py-2 px-4">
                    <Link href="/one-shots">One-Shots</Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-black w-[75%] h-full">
                <div className="w-full h-[40%] bg-gray-800">

                </div>
                <div className="py-6 px-8 flex flex-col">
                    <div className="border-b-1 border-gray-500 pb-6">
                        <h1 className="text-xl font-bold pb-4">{campaign.title}</h1>
                        <CampaignSummary summary={campaign.summary} />
                    </div>

                    <SessionViewer sessions={campaign.session_data} />
                </div>
            </div>
        </div>
    );
}