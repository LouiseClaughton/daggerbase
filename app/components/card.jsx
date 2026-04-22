import Link from "next/link";

export default function Card({ title, content, startDate, endDate, type, campaign, href, activeSession, image }) {
    let active;
    let formattedStartDate = new Date(startDate).toLocaleDateString('en-GB');
    let formattedEndDate = new Date(endDate).toLocaleDateString('en-GB');

    if (activeSession && title == activeSession.title) {
        active = true;
    }

    return (
        <Link href={href ? href : '/'}>
            <div className={`
                bg-gray-900 rounded-lg h-full flex flex-col font-rubik flex-1 w-80 overflow-hidden
                ${active ? 'bg-white text-black' : 'hover:cursor-pointer hover:bg-gray-900 hover:text-white transition-colors'}
            `}>
                {image ? (
                    <div className="w-full h-40 mb-4">
                        <img
                            src={image}
                            className="h-full w-full object-cover"
                            alt={title}
                        />
                    </div>
                ) : (
                    <div className="w-full h-40 mb-4 bg-gray-400"></div>
                )}
                <h3 className={`font-bold ${active ? 'text-purple-600' : 'text-white'} text-center font-amagro pb-4`}>{title}</h3>
            </div>
        </Link>
    );
}