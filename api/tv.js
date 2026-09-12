export default async function handler(req, res) {
  const { action, year } = req.query;
  const BASE_URL = 'https://api.themoviedb.org/3';
  const API_KEY = process.env.TMDB_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: 'Server configuration error: TMDB_API_KEY is missing.' });
  }

  let endpoint = '';
  let url = '';

  if (action === 'discover') {
    endpoint = `/discover/tv?sort_by=popularity.desc`;
  } else if (action === 'filtered') {
    endpoint = `/discover/tv?language=en-US&sort_by=popularity.desc`;
    if (year) {
      endpoint += `&primary_release_year=${year}`;
    }
  } else {
    return res.status(400).json({ error: 'Invalid action parameter' });
  }

  const hasQueryParams = endpoint.includes('?');
  url = `${BASE_URL}${endpoint}${hasQueryParams ? '&' : '?'}api_key=${API_KEY}`;

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
