'use client';
import { useEffect, useState } from 'react';
import blogSeed from '../data/blogData'; 
import BlogCard from '../components/BlogCard';
import Carousel from '../components/Carousel';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const storedBlogs = localStorage.getItem('blogs');
    if (!storedBlogs) {
      localStorage.setItem('blogs', JSON.stringify(blogSeed));
      setBlogs(blogSeed);
    } else {
      try {
        setBlogs(JSON.parse(storedBlogs));
      } catch (err) {
        console.error("Failed to parse blogs from localStorage", err);
        setBlogs(blogSeed); // fallback
      }
    }
  }, []);

  const topPicks = blogs.filter(blog => blog.topPick);
  const otherBlogs = blogs;

  return (
    <div className={styles.container}>
      {topPicks.length > 0 && (
        <div className={styles.topPicks}>
          <h2>Top Picks</h2>
          <Carousel blogs={topPicks} />
        </div>
      )}

      <h2>All Blogs</h2>
      <div className={styles.grid}>
        {otherBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}
