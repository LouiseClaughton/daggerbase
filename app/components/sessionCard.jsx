import Link from "next/link";

export default function SessionCard({ title, content, date, activeSession }) {
    let active;
    let formattedDate = new Date(date).toLocaleDateString('en-GB');

    if (activeSession && title == activeSession.title) {
        active = true;
    }

    return (
        <div className={`
            bg-gray-900 rounded-lg h-full flex flex-col font-rubik flex-1 w-80 overflow-hidden text-center p-4 pb-8
            ${active ? 'bg-white text-black' : 'hover:cursor-pointer hover:bg-gray-900 hover:text-white transition-colors'}
        `}>
            <h3 className={`font-bold ${active ? 'text-purple-600' : 'text-white'} text-center font-amagro pt-4 pb-2`}>{title}</h3>
            <span className="pb-4">{formattedDate}</span>
            <div className="line-clamp-3">
                {content}
            </div>
        </div>
    );
}