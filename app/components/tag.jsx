export default function Tag({ status, type, text }) {
    let color;

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

    const label = text || status || type;

    return (
        <div
            className="border border-black rounded-full h-fit py-2 px-4"
            style={{ backgroundColor: color }}
        >
            {label && <p>{label}</p>}
        </div>
    );
}