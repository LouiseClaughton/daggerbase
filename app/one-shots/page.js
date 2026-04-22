import { createClient } from '@/lib/supabase/server';
import Card from "../components/card";
import Sidebar from "../components/sidebar";

export default async function OneShots() {
    const supabase = await createClient()
    const { data: oneShots } = await supabase.from('One-Shots').select();

    return (
        <div className="h-screen w-full flex">
            <Sidebar activeTab={"one-shots"} />
            <div className="bg-black w-[75%] h-full">
                <div className="flex flex-col">
                    <div className="p-16">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="font-amagro text-xl">One-Shots</h2>
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