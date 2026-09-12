export default async function handler(req, res) {
  const { id, action } = req.query;
  const BASE_URL = 'https://api.themoviedb.org/3';
  const API_KEY = process.env.TMDB_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: 'Server configuration error: TMDB_API_KEY is missing.' });
  }

  if (!id || !action) {
    return res.status(400).json({ error: 'Missing required parameters (id, action)' });
  }

  let endpoint = '';

  if (action === 'details') {
    endpoint = `/person/${id}?language=en-US`;
  } else if (action === 'movie_credits') {
    endpoint = `/person/${id}/movie_credits?language=en-US`;
  } else if (action === 'tv_credits') {
    endpoint = `/person/${id}/tv_credits?language=en-US`;
  } else {
    return res.status(400).json({ error: 'Invalid action parameter' });
  }

  const hasQueryParams = endpoint.includes('?');
  const url = `${BASE_URL}${endpoint}${hasQueryParams ? '&' : '?'}api_key=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: `TMDb API responded with ${response.status}` });
    }
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch from TMDb API', details: error.message });
  }
}
