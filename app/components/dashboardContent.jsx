export const dynamic = "force-dynamic";

import { createClient } from '@/lib/supabase/server';
import Card from './card';
import Link from 'next/link';

export default async function DashboardContent() {
    const supabase = await createClient();

    const [campaignsRes, oneShotsRes] = await Promise.all([
        supabase.from('Campaigns').select(),
        supabase.from('One-Shots').select(),
    ]);

    const campaigns = campaignsRes.data || [];
    const oneShots = oneShotsRes.data || [];

    return (
        <div className="flex flex-col">
            <div className="gradient-border p-8 sm:p-16 relative">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl">Campaigns</h2>
                    <Link href="/campaigns" className="text-base underline">
                        All Campaigns
                    </Link>
                </div>

                <div className="flex gap-8 flex-col sm:flex-row">
                    {campaigns.map((campaign) => (
                        <Card
                            key={campaign.id}
                            title={campaign.title}
                            href={`/campaigns/${campaign.slug}`}
                            image={campaign.image_url}
                        />
                    ))}
                </div>
            </div>

            <div className="p-8 sm:p-16">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl">One-Shots</h2>
                    <Link href="/one-shots" className="text-base underline">
                        All One-Shots
                    </Link>
                </div>

                <div className="flex gap-8 flex-col sm:flex-row">
                    {oneShots.map((oneShot) => (
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
    );
}