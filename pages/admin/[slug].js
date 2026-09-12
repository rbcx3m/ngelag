import { useState} from 'react';
import { useRouter } from 'next/router';
import db from '@/lib/db';
function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')    // Remove special characters
    .replace(/[\s_-]+/g, '-')     // Replace spaces/underscores with hyphens
    .replace(/^-+|-+$/g, '');     // Remove extra hyphens
}

const EditPost = ({ data }) => { 
  const [slug, setSlug]  = useState(data.slug)
  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);
  const [img, setImg] = useState(data.img);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
 async function handleSubmit(e) {
  setLoading(true)
    e.preventDefault();
try {
    const res = await fetch(`http://localhost:3000/api/posts/edit?id=${data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, slug, content, img }),
    });
    if (res.ok) {
      router.push(`/post/${slug}`);
    } else {
      alert('Failed to update post');
    }
    } catch (error) {
      console.error('Database fetch failed:', error);
    return {
      notFound: true,
    };
    } finally {
      setLoading(false)
    }
  }
  

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Post</h1>
      <div>
        <label>Title:</label>
        <textarea value={title} onChange={(e) => {
          setTitle(e.target.value);
          setSlug(slugify(e.target.value));
          }} placeholder={title} />
      </div>
      <div>
        <label>Content:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)}
         placeholder={content} />
      </div>
            <div>
        <label>Image:</label>
        <textarea value={img} onChange={(e) => setImg(e.target.value)}
         placeholder={img} />
      </div>
      <button type="submit">Save Changes</button>
    </form>
  );
}
export default EditPost;

export const getServerSideProps = async ({ params }) => {
      const { slug } = params;
    try {
       const [ data ] = db.prepare('SELECT * FROM posts WHERE slug = ?').all(slug);
    return {
      props: {
        data,
      }
    };
  } catch (error) {
    console.error('Database fetch failed:', error);
    return {
      notFound: true,
    };
  }
}