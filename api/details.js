export default async function handler(req, res) {
  const { id, type, action } = req.query;
  const BASE_URL = 'https://api.themoviedb.org/3';
  const AUTH_TOKEN = process.env.TMDB_AUTH_TOKEN;

  if (!AUTH_TOKEN) {
    return res.status(500).json({ error: 'Server configuration error: TMDB_AUTH_TOKEN is missing.' });
  }

  if (!id || !type || !action) {
    return res.status(400).json({ error: 'Missing required parameters (id, type, action)' });
  }

  let endpoint = '';

  if (action === 'all') {
    endpoint = `/${type}/${id}?append_to_response=reviews,videos,credits,images`;
  } else if (action === 'reviews') {
    endpoint = `/${type}/${id}/reviews?language=en-US&page=1`;
  } else if (action === 'videos') {
    endpoint = `/${type}/${id}/videos?language=en-US`;
  } else if (action === 'credits') {
    endpoint = `/${type}/${id}/credits?language=en-US`;
  } else if (action === 'images') {
    endpoint = `/${type}/${id}/images`;
  } else {
    return res.status(400).json({ error: 'Invalid action parameter' });
  }

  const url = `${BASE_URL}${endpoint}`;
  
  const headers = {
    Authorization: `Bearer ${AUTH_TOKEN}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      return res.status(response.status).json({ error: `TMDb API responded with ${response.status}` });
    }
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch from TMDb API', details: error.message });
  }
}
