'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '@/styles/Dashboard.module.css';

export default function EditBlog() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        const json = await res.json();
        if (res.ok) {
          setBlog(json.data);
        } else {
          alert(json.message || 'Failed to load blog');
          router.push('/dashboard');
        }
      } catch (err) {
        console.error('Error loading blog', err);
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [id]);

  async function handleSave() {
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blog),
      });

      const json = await res.json();

      if (res.ok) {
        alert('Blog updated!');
        router.push('/dashboard');
      } else {
        alert(json.message || 'Update failed');
      }
    } catch (err) {
      console.error('Error updating blog', err);
    }
  }

  if (loading || !blog) return <div>Loading...</div>;

  return (
    <div className={styles.dashboard}>
      <h2>Edit Blog</h2>
      <div className={styles.form}>
        <input className={styles.input} value={blog.title} onChange={(e) => setBlog({ ...blog, title: e.target.value })} />
        <textarea className={styles.textarea} value={blog.description} onChange={(e) => setBlog({ ...blog, description: e.target.value })} />
        <textarea className={styles.textarea} value={blog.content} onChange={(e) => setBlog({ ...blog, content: e.target.value })} />

        <label>
          <input type="checkbox" checked={blog.topPick} onChange={(e) => setBlog({ ...blog, topPick: e.target.checked })} />
          Top Pick
        </label>

        <button className={styles.edit} onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
}
