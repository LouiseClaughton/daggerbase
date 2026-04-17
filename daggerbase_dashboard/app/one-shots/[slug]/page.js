import CampaignSummary from "@/components/campaignSummary";
import SessionViewer from "@/components/sessionView";
import Sidebar from "@/components/sidebar";

async function getOneShot(slug) {
    const res = await fetch(
        `https://dedicated-laughter-0dc7376bd1.strapiapp.com/api/one-shots?filters[slug][$eq]=${slug}&populate=*`
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

    console.log(oneShot)

    return (
        <div className="h-screen w-full flex overflow-hidden">

            {/* SIDEBAR */}
            <Sidebar activeTab={"one-shots"} />

            <div className="w-[75%] h-full overflow-y-auto relative">
                <div className="h-[320px] w-full">
                    <img
                        src={oneShot.image?.url}
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className="sticky top-0 z-20 bg-black px-8 pt-6">
                    <div className="border-b border-gray-500 pb-6">
                        <h1 className="text-xl font-bold pb-4">{oneShot.title}</h1>
                        <div className="pb-4">
                            {oneShot.startDate ? `${formattedStartDate}` : "TBC"}
                            {oneShot.endDate ? ` - ${formattedEndDate}` : ""}
                        </div>
                        <CampaignSummary summary={oneShot.summary} />
                    </div>
                </div>
                <div className="px-8 pt-6 flex flex-col min-h-0">
                    <SessionViewer sessions={oneShot.one_shot_session_data} />
                </div>
            </div>
        </div>
    );
}