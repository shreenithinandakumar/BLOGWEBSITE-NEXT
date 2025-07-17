'use client';

import '../styles/globals.css';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// export const metadata = {
//   title: 'Next Blog App',
//   description: 'A blog app with admin and user access',
// };

export default function RootLayout({ children }) {

  let [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  return (
    <html lang="en">
      <body>
        <Navbar user={user} setUser={setUser}/>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
