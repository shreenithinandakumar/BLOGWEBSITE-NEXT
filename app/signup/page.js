'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/Auth.module.css';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const router = useRouter();

  const handleSignup = () => {
    if (!username || !password) {
      alert('Please fill all fields');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find((u) => u.username === username);
    if (existingUser) {
      alert('Username already exists');
      return;
    }

    const newUser = { username, password, role };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Signup successful! Please login.');
    router.push('/login');
  };

  return (
    <div className={styles.auth}>
      <h2>Signup</h2>
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
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}