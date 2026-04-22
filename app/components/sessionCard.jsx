import Link from "next/link";

export default function SessionCard({ title, content, startDate, endDate, type, campaign, href, activeSession }) {
    let active;
    let formattedStartDate = new Date(startDate).toLocaleDateString('en-GB');
    let formattedEndDate = new Date(endDate).toLocaleDateString('en-GB');

    if (activeSession && title == activeSession.title) {
        active = true;
    }

    return (
        <div className={`
            bg-gray-900 rounded-lg h-full flex flex-col font-rubik flex-1 w-80 overflow-hidden text-center pb-4
            ${active ? 'bg-white text-black' : 'hover:cursor-pointer hover:bg-gray-900 hover:text-white transition-colors'}
        `}>
            <h3 className={`font-bold ${active ? 'text-purple-600' : 'text-white'} text-center font-amagro pt-4 pb-2`}>{title}</h3>
            <span className="pb-4">{startDate}</span>
            <p className="lineclamp-3">
                {content}
            </p>
        </div>
    );
}