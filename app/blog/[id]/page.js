'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '../../../styles/Blog.module.css';

export default function BlogDetail() {
  
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const blogId = params.id;
  
  useEffect(() => {
    if (!blogId) return;
    async function fetchBlog() {
      try {
        const res = await fetch(`/api/blogs/${blogId}`);

        if (!res.ok) {
        console.error("Failed to fetch blog:", res.status);
        return null; 
      }

        const data = await res.json();

        if (res.ok) {
          setBlog(data.data);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error("Failed to fetch blog", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [blogId]);

  if (loading) return <p>Loading blog...</p>;
  if (!blog) return <p>Blog not found.</p>;

  return (
    <div className={styles.blog}>
      <h1>{blog.title}</h1>
      <p><i>By {blog.author}</i></p>
      <img src={blog.images?.[0]} alt={blog.title} className={styles.blogImage} />
      <p>{blog.content}</p>
    </div>
  );
}
