import Link from "next/link";

export default function Card({ title, content, startDate, endDate, type, campaign, href, activeSession }) {
    return (
        <div className={`
            border-1 border-white p-4 rounded-md mb-12 flex flex-col font-rubik
            ${activeSession ? 'bg-white text-black' : 'hover:cursor-pointer hover:bg-gray-900 hover:text-white transition-colors'}
        `}>
            <h3 className={`font-bold ${activeSession ? 'text-purple-600' : 'text-white'}`}>{title}</h3>
            <span>{campaign}</span>
            <span>{startDate ? `${startDate}` : 'TBC'} 
                {type === 'campaign' || type === 'one-shot' 
                    ? (endDate ? `- ${endDate}` : '- Present') 
                    : ''
                }
                </span>
            <p className="line-clamp-3">{content}</p>
            {href &&
                <Link href={href}><span className="text-purple-400">View</span></Link>
            }
        </div>
    );
}