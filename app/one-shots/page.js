import { createClient } from '@/lib/supabase/server';
import Card from "../components/card";
import CreateAdventureForm from '../components/create-adventure-form';
import Link from 'next/link';
import RightArrow from '../assets/right-arrow';
import Tag from '../components/tag';

export default async function OneShots() {
    const supabase = await createClient()

    const { data: oneShots } = await supabase
        .from('One-Shots')
        .select(`
            *,
            Sessions (*)
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
                            <h2 className="text-5xl">One Shots</h2>
                        </div>

                        <div>
                            <div className="w-full">
                                <CreateAdventureForm />
                            </div>

                            <div className="grid grid-cols-3 gap-8">
                                {oneShots.map((item) => (
                                    <div
                                        key={`${item.type}-${item.id}`}
                                        className="w-full h-full border border black rounded-xl flex flex-col gap-4 p-4"
                                    >
                                        <h2 className="text-3xl">{item.title}</h2>
                                        <p className="line-clamp-5 leading-6 h-[7.5rem]">{item.summary}</p>
                                        <div className="flex w-full justify-between">
                                            <div className="flex gap-2">
                                                <Tag status={item.status} />
                                            </div>
                                            <Link
                                                href={`/one-shots/${item.slug}`}
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