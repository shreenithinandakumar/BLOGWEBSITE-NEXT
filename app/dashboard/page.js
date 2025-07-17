'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/Dashboard.module.css';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('user'));
    if (!u || u.role !== 'admin') {
      router.push('/');
    } else {
      setUser(u);
      fetchBlogs();
    }
  }, []);

  async function fetchBlogs() {
    try {
      const res = await fetch('/api/blogs');
      const json = await res.json();
      if (res.ok) setBlogs(json.data);
      else console.error(json.message);
    } catch (err) {
      console.error('Error fetching blogs', err);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });
      const json = await res.json();

      if (res.ok) {
        setBlogs(blogs.filter((b) => b.id !== id));
        alert('Blog deleted!');
      } else {
        alert(json.message || 'Delete failed');
      }
    } catch (err) {
      console.error('Error deleting blog', err);
    }
  }

  return (
    <div className={styles.dashboard}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user?.username}</p>

      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <div key={blog.id} className={styles.item}>
          <h3>{blog.title}</h3>
          <div className={styles.controls}>
            <button className={`${styles.button} ${styles.edit}`} onClick={() => router.push(`/dashboard/edit/${blog.id}`)}>Edit</button>
            <button className={`${styles.button} ${styles.delete}`} onClick={() => handleDelete(blog.id)}>Delete</button>
          </div>
        </div>
      ))}

      <button className={`${styles.button} ${styles.add}`} onClick={() => router.push('/dashboard/addblog')}>+ Add Blog</button>
    </div>
  );
}
