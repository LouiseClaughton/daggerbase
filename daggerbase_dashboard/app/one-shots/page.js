import { fetchOneShots } from "@/lib/api";
import Card from "@/components/card";
import Link from "next/link";
import Sidebar from "@/components/sidebar";

export default async function OneShots() {
    const oneShots = await fetchOneShots();

    return (
        <div className="h-screen w-full flex">
            <Sidebar activeTab={"one-shots"} />
            <div className="bg-black w-[75%] h-full">
                <div className="grid grid-cols-3 gap-4 py-6 px-8">
                    {oneShots.map(oneShot => (
                        <Card
                            key={oneShot.id}
                            title={oneShot.title}
                            content={oneShot.summary}
                            startDate={oneShot.startDate}
                            endDate={oneShot.endDate}
                            href={`/one-shots/${oneShot.slug}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}