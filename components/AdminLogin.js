'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from '@/styles/AdminLogin.module.css'

const AdminLogin = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('role', 'admin')
      window.dispatchEvent(new Event('roleChange'))
      router.push('/dashboard')
    } else {
      setError('Invalid admin credentials')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Admin Login</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            autoComplete="new-password"
            required
          />
          <button type="submit" className={styles.button}>
            Login as Admin
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
