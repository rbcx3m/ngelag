import db from "@/lib/db";

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { title, slug, content, img } = req.body;
   
    try {
      const stmt = db.prepare(`
        UPDATE posts 
        set slug = ?, title = ?, content = ?, img = ? 
        WHERE id = ?
      `);
      
      const info = stmt.run(slug, title, content,img, id);
console.log(title)
      if (info.changes === 0) {
        return res.status(404).json({ error: 'Post not found' });
      }

      return res.status(200).json({ message: 'Post updated successfully' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader('Allow', ['PUT']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}