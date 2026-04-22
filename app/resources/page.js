import { createClient } from '@/lib/supabase/server';
import Card from "../components/card";
import Sidebar from "../components/sidebar";

export default async function Resources() {
    // const supabase = await createClient()
    // const { data: resources } = await supabase.from('Resources').select();
    return (
        <div className="h-screen w-full flex">
            <Sidebar activeTab={"resources"} />
            <div className="bg-black w-[75%] h-full">
                <div className="flex flex-col">
                    <div className="p-16">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="font-amagro text-xl">Resources</h2>
                        </div>
                        {/* <div className="flex gap-8">
                            {campaigns.map(campaign => (
                                <Card
                                    key={campaign.id}
                                    title={campaign.title}
                                    href={`/campaigns/${campaign.slug}`}
                                    image={campaign.image_url}
                                />
                            ))}
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}