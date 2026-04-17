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
        <div className="h-screen w-full flex overflow-hidden">

            {/* SIDEBAR */}
            <Sidebar activeTab={"campaigns"} />

            <div className="w-[75%] h-full overflow-y-auto relative">
                <div className="h-[320px] w-full">
                    <img
                        src={campaign.image?.url}
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className="sticky top-0 z-20 bg-black px-8 pt-6">
                    <div className="border-b border-gray-500 pb-6">
                        <h1 className="text-xl font-bold pb-4">{campaign.title}</h1>
                        <div className="pb-4">
                            {campaign.startDate ? `${formattedStartDate}` : "TBC"}
                            {campaign.endDate ? ` - ${formattedEndDate}` : " - Present"}
                        </div>
                        <CampaignSummary summary={campaign.summary} />
                    </div>
                </div>
                <div className="px-8 pt-6 flex flex-col min-h-0">
                    <SessionViewer sessions={campaign.session_data} />
                </div>
            </div>
        </div>
    );
}