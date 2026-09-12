export default async function handler(req, res) {
  const { query } = req.query;
  const BASE_URL = 'https://api.themoviedb.org/3';
  const API_KEY = process.env.TMDB_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: 'Server configuration error: TMDB_API_KEY is missing.' });
  }

  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter' });
  }

  const url = `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;

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
