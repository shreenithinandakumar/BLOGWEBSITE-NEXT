'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../styles/Navbar.module.css';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react'

export default function Navbar() {
  
  // let [user, setUser] = useState(null);
  // const router = useRouter(); 

  // useEffect(() => {
  //   const loadUser = () => {
  //     const u = JSON.parse(localStorage.getItem('user'));
  //     setUser(u);
  //   };

  //   loadUser(); 

  //   window.addEventListener('userChange', loadUser);

  //   return () => {
  //     window.removeEventListener('userChange', loadUser);
  //   };
  // }, []);

  // const logout = () => {
  //   localStorage.removeItem('user');
  //   window.dispatchEvent(new Event('userChange'));
  //   router.push('/')
  // };

  const { data: session } = useSession()
  const [role, setRole] = useState('guest')

  useEffect(() => {
    const loadRole = () => {
      const storedRole = localStorage.getItem('role')
      if (storedRole) {
        setRole(storedRole)
      } else if (session) {
        setRole('user')
      } else {
        setRole('guest')
      }
    }

    loadRole(); 

    window.addEventListener('roleChange', loadRole);

    return () => {
      window.removeEventListener('roleChange', loadRole);
    }
  }, [session]);

  const handleLogout = () => {
    localStorage.removeItem('role')
    localStorage.removeItem('user')
    localStorage.removeItem('users')
    signOut({ callbackUrl: '/' })
  }

  return (
    <nav className={styles.navBar}>
      <div className={styles.leftBar}>
        <Link href="/">Home</Link>
        {role === 'user' && ( <Link href="/userprofile">Profile</Link> )}
        {role === 'admin' && ( <Link href="/dashboard">Dashboard</Link> )}
      </div>
      <div className={styles.rightBar}>
        {role === 'guest' && <Link href="/login">Login</Link>}
        {role === 'user' && ( <button onClick={handleLogout}>Logout</button> )}
        {role === 'admin' && ( <button onClick={handleLogout}>Logout</button> )}
        {/* {!user && (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
          </>
        )}
        {user && <button onClick={logout}>Logout</button>} */}
      </div>
    </nav>
  );
}
