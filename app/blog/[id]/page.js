'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Carousel from '../../../components/Carousel';
import styles from '../../../styles/Blog.module.css';

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('blogs')) || [];
    const found = stored.find((b) => b.id == id);
    setBlog(found);
  }, [id]);

  if (!blog) return <div>Blog not found.</div>;

  return (
    <div className={styles.blog}>
      <h1>{blog.title}</h1>
      <p><i>By {blog.author}</i></p>
      <img src={blog.images} alt={blog.title} className={styles.blogImage}/>
      <p>{blog.content}</p>
    </div>
  );
}
