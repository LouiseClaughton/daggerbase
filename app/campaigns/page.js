import { createClient } from '@/lib/supabase/server';
import Card from "../components/card";

export default async function Campaigns() {
    const supabase = await createClient()
    const { data: campaigns } = await supabase.from('Campaigns').select();
    return (
        <div className="h-screen w-full flex">
            <div className="bg-black w-full sm:w-[9/12] h-full pt-28 sm:pt-0">
                <div className="flex flex-col">
                    <div className="p-8 sm:p-16">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="font-amagro text-xl">Campaigns</h2>
                        </div>
                        <div className="flex gap-8 flex-col sm:flex-row">
                            {campaigns.map(campaign => (
                                <Card
                                    key={campaign.id}
                                    title={campaign.title}
                                    href={`/campaigns/${campaign.slug}`}
                                    image={campaign.image_url}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}