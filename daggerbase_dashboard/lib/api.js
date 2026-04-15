// CAMPAIGNS
export async function fetchCampaigns() {
  const res = await fetch(
    "https://dedicated-laughter-0dc7376bd1.strapiapp.com/api/campaigns?populate=*"
  );

  console.log("STATUS:", res.status);

  if (!res.ok) {
    const text = await res.text();
    console.error("ERROR BODY:", text);
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data.data;
}

// SESSIONS
export async function fetchSessions() {
    const res = await fetch(
    "https://dedicated-laughter-0dc7376bd1.strapiapp.com/api/sessions-data?populate=*"
  );

  console.log("STATUS:", res.status);

  if (!res.ok) {
    const text = await res.text();
    console.error("ERROR BODY:", text);
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data.data;
}

// ONE-SHOTS
export async function fetchOneShots() {
    const res = await fetch(
    "https://dedicated-laughter-0dc7376bd1.strapiapp.com/api/one-shots?populate=*"
  );

  console.log("STATUS:", res.status);

  if (!res.ok) {
    const text = await res.text();
    console.error("ERROR BODY:", text);
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data.data;
}