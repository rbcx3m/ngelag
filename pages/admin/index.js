import { useState } from 'react';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [desc, setDesc] = useState('');
  const [content, setContent] = useState('');
  const [img, setImg] = useState('');
  const [tag, setTag] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hostname = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${hostname}/api/posts/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, slug, desc, content, img, tag, author }),
    });

    if (res.ok) {
      alert('Post added!');
      setTitle('');
      setSlug('');
      setDesc('');
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Post</h1>
      <input 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Title" 
        required 
      />
       <input 
        value={desc} 
        onChange={(e) => setDesc(e.target.value)} 
        placeholder="Description" 
        required 
      />
      <textarea 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        placeholder="Content" 
        required 
      />
      <textarea 
        value={img} 
        onChange={(e) => setImg(e.target.value)} 
        placeholder="Image URL" 
        required 
      />
      <textarea 
        value={tag} 
        onChange={(e) => setTag(e.target.value)} 
        placeholder="Tag" 
        required 
      />
      <textarea 
        value={author} 
        onChange={(e) => setAuthor(e.target.value)} 
        placeholder="Author" 
        required 
      />
      <button type="submit">Save</button>
    </form>
  );
}