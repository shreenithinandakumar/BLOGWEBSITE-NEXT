'use client';
import { useParams } from 'next/navigation';
import blogs from '../../../data/blogData';
import Carousel from '../../../components/Carousel';
import styles from '../../../styles/Blog.module.css';

export default function BlogDetail() {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id == id);

  return (
    <div className={styles.blog}>
      <h1>{blog.title}</h1>
      <p><i>By {blog.author}</i></p>
      <Carousel images={blog.images} />
      <p>{blog.content}</p>
    </div>
  );
}
