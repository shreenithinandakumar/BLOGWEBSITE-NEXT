'use client'

import { getProviders, signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'
import styles from '@/styles/UserLogin.module.css' 

const logoMap = {
  google: '/icons/google.png',
  github: '/icons/github.png',
  linkedin: '/icons/linkedin.png',
}

export default function UserLogin() {
  const [providers, setProviders] = useState(null)

  useEffect(() => {
    getProviders().then(setProviders)
  }, [])

  return (
    <div className={styles.userLogin}>
      <h2>User Login</h2>
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name}  className={styles.buttonWrapper}>

            <button
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              className={styles.oauthBtn}
            >
                <img
                src={logoMap[provider.id]}
                alt={`${provider.name} logo`}
                className={styles.logo}
              />

              Sign in with {provider.name}
            </button>
            
          </div>
          
        ))}
        
    </div>
  )
}
