import Link from "next/link";
import Card from "@/components/card";
import CampaignSummary from "@/components/campaignSummary";
import SessionViewer from "@/components/sessionView";
import Sidebar from "@/components/sidebar";

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

    let formattedStartDate = new Date(campaign.startDate).toLocaleDateString('en-GB');
    let formattedEndDate = new Date(campaign.endDate).toLocaleDateString('en-GB');

    return (
        <div className="h-screen w-full flex">
            <Sidebar activeTab={"campaigns"} />

            {/* Main Content */}
            <div className="bg-black w-[75%] h-full grid grid-rows-[1fr_2fr]">
                <div className="w-full bg-gray-800">

                </div>
                <div className="pt-6 px-8 overflow-hidden h-full flex flex-col">
                    <div className="border-b-1 border-gray-500 pb-6">
                        <h1 className="text-xl font-bold pb-4">{campaign.title}</h1>
                        <div className="pb-4">
                            {campaign.startDate ? `${formattedStartDate}` : 'TBC'} 
                            {campaign.endDate ? ` - ${formattedEndDate}` : ' - Present'}
                        </div>
                        <CampaignSummary summary={campaign.summary} />
                    </div>

                    <SessionViewer sessions={campaign.session_data} />
                </div>
            </div>
        </div>
    );
}