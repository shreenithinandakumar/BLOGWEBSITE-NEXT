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
    if (!u || u.role !== 'admin') router.push('/');
    setUser(u);

    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    setBlogs(storedBlogs);
  }, []);

  const handleEdit = (id) => {
    router.push(`/dashboard/edit/${id}`);
  };

  const handleDelete = (id) => {
    const filtered = blogs.filter((b) => b.id !== id);
    setBlogs(filtered);
    localStorage.setItem('blogs', JSON.stringify(filtered));
    alert('Blog deleted!');
  };

  const handleAdd = () => {
    router.push('/dashboard/addblog'); 
  };

  return (
    <div className={styles.dashboard}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user?.username}</p>

      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <div key={blog.id} className={styles.item}>
          <h3>{blog.title}</h3>
          <div className={styles.controls}>
            <button className={`${styles.button} ${styles.edit}`} onClick={() => handleEdit(blog.id)}>Edit</button>
            <button className={`${styles.button} ${styles.delete}`} onClick={() => handleDelete(blog.id)}>Delete</button>
          </div>
        </div>
      ))}

      <button className={`${styles.button} ${styles.add}`} onClick={handleAdd}>+ Add Blog</button>
    </div>
  );
}
