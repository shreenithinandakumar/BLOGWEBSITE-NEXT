'use client';
import '@/styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SessionProvider } from 'next-auth/react'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <SessionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
