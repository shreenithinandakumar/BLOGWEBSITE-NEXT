'use client';
import { useState } from 'react';
import styles from '../styles/Carousel.module.css';

export default function Carousel({ images }) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((index - 1 + images.length) % images.length);
  const next = () => setIndex((index + 1) % images.length);

  return (
    <div className={styles.carousel}>
      <button onClick={prev}>‹</button>
      <img src={images[index]} alt="slide" />
      <button onClick={next}>›</button>
    </div>
  );
}
