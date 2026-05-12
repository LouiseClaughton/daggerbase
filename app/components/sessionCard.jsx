import Link from "next/link";

export default function SessionCard({ title, content, date, activeSession }) {
    let active;
    let formattedDate = new Date(date).toLocaleDateString('en-GB');

    if (activeSession && title == activeSession.title) {
        active = true;
    }

    return (
        <div className={`w-full h-full border border black rounded-xl flex flex-col gap-4 p-4 ${active ? 'bg-gray-100' : 'bg-white'}`}>
            <h3 className="font-bold text-2xl pt-4">{title}</h3>
            <span>{formattedDate}</span>
            <div className="line-clamp-3">
                {content}
            </div>
        </div>
    );
}