import Link from "next/link";

async function getOneShot(slug) {
    const res = await fetch(
        `https://dedicated-laughter-0dc7376bd1.strapiapp.com/api/one-shots?filters[slug][$eq]=${slug}`
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

    return (
        <div className="h-screen w-full flex">
            <div className="bg-gray-700 w-[25%] h-full flex flex-col items-center justify-center gap-1">
                <div className="w-full bg-gray-900 py-2 px-4">
                    <Link href="/">All Sessions</Link>
                </div>
                <div className="w-full bg-gray-900 py-2 px-4">
                    <Link href="/campaigns">Campaigns</Link>
                </div>
                <div className="w-full bg-purple-600 py-2 px-4">
                    <Link href="/one-shots">One-Shots</Link>
                </div>
            </div>
            <div className="bg-black w-[75%] h-full">
                <div className="gap-4 py-6 px-8 flex flex-col">
                    <h1>{oneShot.title}</h1>
                    <p>{oneShot.summary}</p>
                </div>
            </div>
        </div>
    );
}