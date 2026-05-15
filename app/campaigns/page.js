import { createClient } from '@/lib/supabase/server';
import Card from "../components/card";
import CreateCampaignForm from '../components/create-campaign-form';
import Link from 'next/link';
import RightArrow from '../assets/right-arrow';
import Tag from '../components/tag';

export default async function Campaigns() {
    const supabase = await createClient()

    const { data: campaigns, error } = await supabase
        .from("Campaigns")
        .select(`
            *,
            Sessions (*),
            Characters (*)
        `);

    function formatDate(dateStr) {
        const [year, month, day] = dateStr.split("-");
        return `${day}/${month}/${year}`;
    }

    function formatDateAsYear(dateStr) {
        const [year, month, day] = dateStr.split("-");
        return `${year}`;
    }

    return (
        <div className="w-full">
            <div className="bg-white text-black w-full sm:w-[9/12] h-full pt-28 sm:pt-0">
                <div className="flex flex-col">
                    <div className="p-8 sm:p-16 relative sm:ml-20">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-5xl">Campaigns</h2>
                        </div>

                        <div className="flex flex-col gap-8">
                            <div className="w-full mb-8 sm:mb-0">
                                <CreateCampaignForm />
                            </div>

                            <div className="w-full flex flex-col lg:grid lg:grid-cols-3 gap-4 lg:gap-8">
                                {campaigns.map((item) => (
                                    <div
                                        key={`${item.type}-${item.id}`}
                                        className="w-full h-full border border black rounded-xl flex flex-col gap-4 p-4"
                                    >
                                        <h2 className="text-3xl">{item.title}</h2>
                                        <p className="line-clamp-5 leading-6 h-[7.5rem]">{item.summary}</p>
                                        <div className="flex flex-col xl:flex-row gap-4 w-full justify-between">
                                            <div className="flex gap-2">
                                                <Tag status={item.status} />
                                            </div>
                                            <Link
                                                href={`/campaigns/${item.slug}`}
                                                className="bg-black text-white px-3 py-3 rounded-xl w-fit justify-self-end"
                                            >
                                                <RightArrow className="w-5 h-5" />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}