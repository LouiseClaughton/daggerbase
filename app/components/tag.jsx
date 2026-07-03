import Link from "next/link";

export default function Tag({ status, type, text, source, link, sourceType }) {
    let color;
    let sourceLink;

    if (status === 'Completed') {
        color = '#DDECD5';
    } else if (status === 'Ongoing') {
        color = '#F0CE8E';
    } else if (status === 'Upcoming') {
        color = '#F6C0C0';
    } else if (type === 'Campaign') {
        color = '#EDD3FF';
    } else if (type === 'One-Shot') {
        color = '#D9EBFF';
    }

    if (sourceType === 'Campaign') {
        sourceLink = '/campaigns';
    } else if (sourceType === 'One-Shot') {
        sourceLink = '/one-shots';
    } else {
        sourceLink = '/characters';
    }

    const label = text || status || type || source;

    if (link) {
        return (
            <Link
                className="border border-black rounded-full h-fit py-2 px-4"
                style={{ backgroundColor: color }}
                href={`${sourceLink}/${link}`}
            >
                {label && <p>{label}</p>}
            </Link>
        );
    } else {
        return (
            <div
                className="border border-black rounded-full h-fit py-2 px-4"
                style={{ backgroundColor: color }}
            >
                {label && <p>{label}</p>}
            </div>
        );
    }
}