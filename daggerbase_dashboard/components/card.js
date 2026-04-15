export default function Card({ title, content, startDate, endDate }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      padding: "16px",
      borderRadius: "8px",
      marginBottom: "12px"
    }}>
      <h3>{title}</h3>
      <span>{startDate} {endDate ? `- ${endDate}` : '- Present'}</span>
      <p className="line-clamp-3">{content}</p>
    </div>
  );
}