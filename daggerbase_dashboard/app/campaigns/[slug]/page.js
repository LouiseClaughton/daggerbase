async function getCampaign(slug) {
  const res = await fetch(
    `https://dedicated-laughter-0dc7376bd1.strapiapp.com/api/campaigns?filters[slug][$eq]=${slug}`
  );

  const data = await res.json();
  return data.data[0];
}

export default async function CampaignPage({ params }) {
  const campaign = await getCampaign(params.slug);

  if (!campaign) {
    return <div>Not found</div>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>{campaign.Title}</h1>
      <p>{campaign.Summary}</p>
    </div>
  );
}