export default function Card({ title, content, startDate, endDate, type, campaign }) {
  return (
    <div className="border-1 border-white p-4 rounded-md mb-12 flex flex-col">
      <h3 className="text-purple-400">{title}</h3>
      <span>{campaign}</span>
      <span>{startDate ? `${startDate}` : 'TBC'} 
        {type === 'campaign' 
            ? (endDate ? `- ${endDate}` : '- Present') 
            : ''
        }
        </span>
      <p className="line-clamp-3">{content}</p>
    </div>
  );
}