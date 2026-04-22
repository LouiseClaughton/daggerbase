import { createClient } from '@/lib/supabase/server';
import Card from './components/card';
import Sidebar from './components/sidebar';
import Link from 'next/link';

export default async function Dashboard() {
    const supabase = await createClient()
    const { data: campaigns } = await supabase.from('Campaigns').select();
    const { data: oneShots } = await supabase.from('One-Shots').select();

    return (
        <div className="h-screen w-full flex">
            <Sidebar activeTab={"dashboard"} />
            <div className="bg-black w-[75%] h-full">
                <div className="flex flex-col">
                    <div className="gradient-border p-16">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="font-amagro text-xl">Campaigns</h2>
                            <Link href="/campaigns" className="font-amagro text-base underline">All Campaigns</Link>
                        </div>
                        <div className="flex gap-8">
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
                    <div className="p-16">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="font-amagro text-xl">One-Shots</h2>
                            <Link href="/one-shots" className="font-amagro text-base underline">All One-Shots</Link>
                        </div>
                        <div className="flex gap-8">
                            {oneShots.map(oneShot => (
                                <Card
                                    key={oneShot.id}
                                    title={oneShot.title}
                                    href={`/one-shots/${oneShot.slug}`}
                                    image={oneShot.image_url}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

