export default function Tag({ status, type }) {

    let color;

    if (status === 'Completed') {
        color = '#DDECD5';
    } else if (status === 'Ongoing') {
        color = '#F0CE8E';
    } else if (status === 'Upcoming') {
        color = '#F6C0C0';
    }

    if (type === 'Campaign') {
        color = '#EDD3FF';
    } else if (type === 'One-Shot') {
        color = '#D9EBFF';
    }

    return (
        <div className="border border-black rounded-full h-fit py-2 px-4" style={{ backgroundColor: color }}>
            {status &&
                <p>{status}</p>
            }
            {type && 
                <p>{type}</p>
            }
        </div>
    )
}