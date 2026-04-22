import Link from "next/link";

export default function Sidebar({ activeTab }) {
    return (
        <div className="bg-gray-700 w-[25%] h-full flex flex-col gap-1 pr-8 py-12">
            <div className={`sidebar-link relative ${activeTab == "dashboard" ? 'active' : ''}`}>
                <Link href="/">
                    <h1 className="font-amagro text-white text-3xl pl-8">Daggerbase</h1>
                </Link>
            </div>
            <div className={`sidebar-link w-full pt-6 pb-2 px-4 transition-colors font-amagro pl-8 ${activeTab == "campaigns" ? 'active' : ''} relative`}>
                <Link href="/campaigns" className="block h-full w-full">Campaigns</Link>
            </div>
            <div className={`sidebar-link w-full pt-6 pb-2 px-4 transition-colors font-amagro pl-8 ${activeTab == "one-shots" ? 'active' : ''} relative`}>
                <Link href="/one-shots" className="block h-full w-full">One-Shots</Link>
            </div>
            <div className={`sidebar-link w-full pt-6 pb-2 px-4 transition-colors font-amagro pl-8 ${activeTab == "resources" ? 'active' : ''} relative`}>
                <Link href="/resources" className="block h-full w-full">Resources</Link>
            </div>
        </div>
    )
}