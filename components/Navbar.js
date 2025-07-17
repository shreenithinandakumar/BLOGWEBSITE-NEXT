'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../styles/Navbar.module.css';
import { useRouter } from 'next/navigation';


export default function Navbar() {
  
  let [user, setUser] = useState(null);
  const router = useRouter(); 

  useEffect(() => {
    const loadUser = () => {
      const u = JSON.parse(localStorage.getItem('user'));
      setUser(u);
    };

    loadUser(); 

    window.addEventListener('userChange', loadUser);

    return () => {
      window.removeEventListener('userChange', loadUser);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('userChange'));
    router.push('/')
  };


  return (
    <nav className={styles.navBar}>
      <div className={styles.leftBar}>
        <Link href="/">Home</Link>
        {user?.role === 'admin' && <Link href="/dashboard">Dashboard</Link>}
        {user?.role === 'user' && <Link href="/userprofile">Profile</Link>}
      </div>
      <div className={styles.rightBar}>
        {!user && (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
          </>
        )}
        {user && <button onClick={logout}>Logout</button>}
      </div>
    </nav>
  );
}
