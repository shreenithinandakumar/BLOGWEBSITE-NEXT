'use client';
import { useState } from 'react';
import styles from '@/styles/AddBlog.module.css';
import { useRouter } from 'next/navigation';

export default function AddBlog() {
  const [newBlog, setNewBlog] = useState({
    title: '',
    images: [''],
    description: '',
    content: '',
    author: 'Admin',
    topPick: false,
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBlog((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setNewBlog((prev) => ({ ...prev, images: [e.target.value] }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newBlog,
          images: newBlog.images.filter(Boolean),
          topPick: Boolean(newBlog.topPick),
        }),
      });

      const json = await res.json();
      if (res.ok) {
        alert('Blog added!');
        router.push('/dashboard');
      } else {
        alert(json.message || 'Failed to add blog');
      }
    } catch (err) {
      console.error('Error adding blog', err);
    }
  };

  return (
    <div className={styles.dashboard}>
      <h2>Add New Blog</h2>
      <div className={styles.form}>
        <input className={styles.input} placeholder="Title" name="title" value={newBlog.title} onChange={handleChange} />
        <input className={styles.input} placeholder="Image URL" value={newBlog.images[0]} onChange={handleImageChange} />
        <textarea className={styles.textarea} placeholder="Short Description" name="description" value={newBlog.description} onChange={handleChange} />
        <textarea className={styles.textarea} placeholder="Full Content" name="content" value={newBlog.content} onChange={handleChange} />

        <label className={styles.checkbox}>
          <input type="checkbox" checked={newBlog.topPick} onChange={(e) => setNewBlog((prev) => ({ ...prev, topPick: e.target.checked }))} />
          Mark as Top Pick
        </label>

        <button className={styles.button} onClick={handleSubmit}>Add Blog</button>
      </div>
    </div>
  );
}
