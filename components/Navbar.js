'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('user'));
    setUser(u);
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <nav className={styles.nav}>
      <Link href="/">Home</Link>
      {!user && (
        <>
          <Link href="/login">Login</Link>
          <Link href="/signup">Signup</Link>
        </>
      )}
      {user?.role === 'admin' && <Link href="/dashboard">Dashboard</Link>}
      {user && <button onClick={logout}>Logout</button>}
    </nav>
  );
}
