async function fetchWithRetry(url, options = {}, retries = 3) {
  try {
    const res = await fetch(url, options);

    // Retry on server errors (like your 500)
    if (!res.ok) {
      const text = await res.text();

      console.error("STATUS:", res.status);
      console.error("ERROR BODY:", text);

      if (res.status >= 500 && retries > 0) {
        await new Promise(r => setTimeout(r, 500));
        return fetchWithRetry(url, options, retries - 1);
      }

      throw new Error(`Request failed: ${res.status}`);
    }

    return res;
  } catch (err) {
    // Retry on network-level failures too
    if (retries > 0) {
      await new Promise(r => setTimeout(r, 500));
      return fetchWithRetry(url, options, retries - 1);
    }
    throw err;
  }
}

const BASE_URL = "https://dedicated-laughter-0dc7376bd1.strapiapp.com/api";

export async function fetchCampaigns() {
  const res = await fetchWithRetry(`${BASE_URL}/campaigns?populate[session_data]=*`);
  const data = await res.json();
  return data.data;
}

export async function fetchSessions() {
  const res = await fetchWithRetry(`${BASE_URL}/sessions-data?populate=*`);
  const data = await res.json();
  return data.data;
}

export async function fetchOneShots() {
  const res = await fetchWithRetry(`${BASE_URL}/one-shots?populate=*`);
  const data = await res.json();
  return data.data;
}