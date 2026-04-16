import Link from "next/link";

export default function Sidebar({ activeTab }) {
    return (
        <div className="bg-gray-700 w-[25%] h-full flex flex-col items-center justify-center gap-1">
            <div className={`w-full py-2 px-4 transition-colors ${activeTab == "sessions" ? 'bg-purple-600' : 'bg-gray-900 hover:bg-gray-800'}`}>
                <Link href="/" className="block h-full w-full">All Sessions</Link>
            </div>
            <div className={`w-full py-2 px-4 transition-colors ${activeTab == "campaigns" ? 'bg-purple-600' : 'bg-gray-900 hover:bg-gray-800'}`}>
                <Link href="/campaigns" className="block h-full w-full">Campaigns</Link>
            </div>
            <div className={`w-full py-2 px-4 transition-colors ${activeTab == "one-shots" ? 'bg-purple-600' : 'bg-gray-900 hover:bg-gray-800'}`}>
                <Link href="/one-shots" className="block h-full w-full">One-Shots</Link>
            </div>
        </div>
    )
}