export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Missing query param q' });

  const apiKey = process.env.GOOGLE_API_KEY;
  const cx = process.env.GOOGLE_CX;

  if (!apiKey || !cx) {
    return res.status(500).json({ error: 'Google API keys not configured on server' });
  }

  try {
    const url = new URL('https://www.googleapis.com/customsearch/v1');
    url.searchParams.set('key', apiKey);
    url.searchParams.set('cx', cx);
    url.searchParams.set('q', q);
    url.searchParams.set('searchType', 'image');
    url.searchParams.set('num', '6');
    url.searchParams.set('imgType', 'photo');
    url.searchParams.set('safe', 'active');

    const response = await fetch(url.toString());
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'Google API error' });
    }

    // Return just what the frontend needs
    const items = (data.items || []).map(item => ({
      title: item.title,
      link: item.image?.contextLink || '#',
      image: item.link,
      displayLink: item.displayLink,
    }));

    return res.status(200).json({ items });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
