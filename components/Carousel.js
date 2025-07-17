// components/Carousel.js
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/Carousel.module.css';

export default function Carousel({ blogs }) {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const prev = () => setIndex((index - 1 + blogs.length) % blogs.length);
  const next = () => setIndex((index + 1) % blogs.length);

  const handleClick = (id) => {
    router.push(`/blog/${id}`);
  };

  if (!blogs || blogs.length === 0) {
    return <p>No top picks available.</p>;
  }

  const blog = blogs[index];

  return (
    <div className={styles.carousel}>
      <button onClick={prev}>‹</button>

      <div className={styles.slide} onClick={() => handleClick(blog.id)} style={{ cursor: 'pointer' }}>
        <img src={blog.images[0]} alt={blog.title} />
        <h3>{blog.title}</h3>
      </div>

      <button onClick={next}>›</button>
    </div>
  );
}
