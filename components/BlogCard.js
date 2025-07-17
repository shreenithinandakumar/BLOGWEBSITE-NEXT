'use client';
import styles from '../styles/BlogCard.module.css';
import Link from 'next/link';

export default function BlogCard({ blog }) {
  return (
    <div className={styles.card}>
      <img src={blog.images[0]} alt="blog" />
      <h3>{blog.title}</h3>
      <p>{blog.description}</p>
      <Link href={`/blog/${blog._id}`}>Read More →</Link>
    </div>
  );
}
