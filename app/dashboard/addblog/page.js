'use client';
import { useEffect, useState } from 'react';
import styles from '@/styles/AddBlog.module.css';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: '',
    images: [''],
    description: '',
    content: '',
    author: 'Admin',
    topPick: false
  });

  const router = useRouter();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('blogs')) || [];
    setBlogs(stored);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBlog(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setNewBlog(prev => ({ ...prev, images: [e.target.value] }));
  };

  const handleSubmit = () => {
    const stored = JSON.parse(localStorage.getItem('blogs')) || [];
    const nextId = stored.length ? Math.max(...stored.map(b => b.id)) + 1 : 1;

    const updated = [
      ...stored,
      {
        ...newBlog,
        id: nextId,
        images: newBlog.images.filter(Boolean),
        topPick: Boolean(newBlog.topPick)
      }
    ];

    localStorage.setItem('blogs', JSON.stringify(updated));
    setBlogs(updated);

    alert('Blog added!');
    router.push('/');
  };

  return (
    <div className={styles.dashboard}>
      <h2>Add New Blog</h2>
      <div className={styles.form}>
        <input
          className={styles.input}
          placeholder="Title"
          name="title"
          value={newBlog.title}
          onChange={handleChange}
        />

        <input
          className={styles.input}
          placeholder="Image URL"
          value={newBlog.images[0]}
          onChange={handleImageChange}
        />

        <textarea
          className={styles.textarea}
          placeholder="Short Description"
          name="description"
          value={newBlog.description}
          onChange={handleChange}
        />

        <textarea
          className={styles.textarea}
          placeholder="Full Content"
          name="content"
          value={newBlog.content}
          onChange={handleChange}
        />

        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={newBlog.topPick}
            onChange={(e) => setNewBlog(prev => ({ ...prev, topPick: e.target.checked }))}
          />
          Mark as Top Pick
        </label>

        <button className={styles.button} onClick={handleSubmit}>
          Add Blog
        </button>
      </div>
    </div>
  );
}
