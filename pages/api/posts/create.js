import db from "@/lib/db";

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')    // Remove special characters
    .replace(/[\s_-]+/g, '-')     // Replace spaces/underscores with hyphens
    .replace(/^-+|-+$/g, '');     // Remove extra hyphens
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { title, desc, content, img, tag, author } = req.body;
    const slug = slugify(title);
    
    const stmt = db.prepare('INSERT INTO posts (title, slug, desc, content, img, tag, author) VALUES (?, ?, ?, ?, ?, ?, ?)');
    const info = stmt.run(title, slug, desc, content, img, tag, author);

    return res.status(201).json({ id: info.lastInsertRowid, title, slug, desc, content, img, tag, author });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}