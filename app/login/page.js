'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/Auth.module.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const router = useRouter();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const match = users.find(
      (u) => u.username === username && u.password === password && u.role === role
    );

    if (match) {
      localStorage.setItem('user', JSON.stringify(match));
      window.dispatchEvent(new Event('userChange'));
      router.push(role === 'admin' ? '/dashboard' : '/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className={styles.auth}>
      <h2>Login</h2>
      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <select onChange={(e) => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
