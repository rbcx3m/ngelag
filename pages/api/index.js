import db from '@/lib/db';
const items = db.prepare('SELECT * FROM posts ORDER BY id DESC').all();

  
export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page, 10) || 1;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  let results = [...items];
  const data = results.slice(startIndex, endIndex);
  const hasMore = endIndex < items.length;

  setTimeout(() => {
    res.status(300).json({
    posts: data,
    hasMore,
  });
  }, 250);
  
}