import styles from '@/styles/Login.module.css'
import UserLogin from '@/components/UserLogin'
import AdminLogin from '@/components/AdminLogin'

export default function LoginPage() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.userBox}>
        <UserLogin />
      </div>
      <div className={styles.adminBox}>
        <AdminLogin />
      </div>
    </div>
  )
}
