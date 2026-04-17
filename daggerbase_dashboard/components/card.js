import Link from "next/link";

export default function Card({ title, content, startDate, endDate, type, campaign, href, activeSession, image }) {
    let active;
    let formattedStartDate = new Date(startDate).toLocaleDateString('en-GB');
    let formattedEndDate = new Date(endDate).toLocaleDateString('en-GB');

    if (activeSession && title == activeSession.title) {
        active = true;
    }

    return (
        <div className={`
            bg-gray-900 rounded-md p-4 min-h-40 flex flex-col font-rubik
            ${active ? 'bg-white text-black' : 'hover:cursor-pointer hover:bg-gray-900 hover:text-white transition-colors'}
        `}>
            {image &&
                <div className="w-full h-28 pb-4">
                    <img
                        src={image?.url}
                        className="h-full w-full object-cover"
                    />
                </div>
            }
            <h3 className={`font-bold ${active ? 'text-purple-600' : 'text-white'}`}>{title}</h3>
            <span>{campaign}</span>
            <span>
                {startDate ? `${formattedStartDate}` : 'TBC'} 
                {type === 'campaign'
                    ? (endDate ? `- ${formattedEndDate}` : ' - Present') 
                    : ''
                }
                {type === 'one-shot'
                    ? (endDate ? `- ${formattedEndDate}` : '') 
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