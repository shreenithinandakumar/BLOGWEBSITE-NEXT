'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
// import styles from '../../../styles/Dashboard.module.css';
import styles from '@/styles/Dashboard.module.css'; // ✅ alias

export default function EditBlog() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('blogs')) || [];
    const toEdit = stored.find((b) => b.id == id);
    if (!toEdit) return router.push('/dashboard');
    setBlog(toEdit);
  }, [id]);

  const handleSave = () => {
    const all = JSON.parse(localStorage.getItem('blogs')) || [];
    const updated = all.map((b) => (b.id == blog.id ? blog : b));
    localStorage.setItem('blogs', JSON.stringify(updated));
    alert('Blog updated!');
    router.push('/dashboard');
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <div className={styles.dashboard}>
      <h2>Edit Blog</h2>
      <div className={styles.form}>
        <input
  className={styles.input}
  value={blog.title}
  onChange={(e) => setBlog({ ...blog, title: e.target.value })}
/>

<textarea
  className={styles.textarea}
  value={blog.description}
  onChange={(e) => setBlog({ ...blog, description: e.target.value })}
/>

<textarea
  className={styles.textarea}
  value={blog.content}
  onChange={(e) => setBlog({ ...blog, content: e.target.value })}
/>

        <label>
          <input
            type="checkbox"
            checked={blog.topPick}
            onChange={(e) => setBlog({ ...blog, topPick: e.target.checked })}
          /> Top Pick
        </label>
        <button className={styles.edit} onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
}
