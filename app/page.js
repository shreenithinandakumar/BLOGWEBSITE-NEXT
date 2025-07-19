'use client';
import { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';
import Carousel from '../components/Carousel';
import styles from '../styles/Home.module.css';
import Loading from '@/components/Loading';
import { useSession } from 'next-auth/react';

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session, status } = useSession(); // NextAuth session
  const isLoggedIn = status === 'authenticated';

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch('/api/blogs');
        const json = await res.json();

        if (res.ok) {
          setBlogs(json.data);
        } else {
          console.error(json.message);
        }
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  const topPicks = blogs.filter(blog => blog.topPick);

  if (loading) return <Loading />;

  return (
    <div className={styles.container}>
      {isLoggedIn && topPicks.length > 0 && (
        <div className={styles.topPicks}>
          <h2>Top Picks</h2>
          <Carousel blogs={topPicks} />
        </div>
      )}

      <h2>All Blogs</h2>
      <div className={styles.grid}>
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
}
