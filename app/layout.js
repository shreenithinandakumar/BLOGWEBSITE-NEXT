import '../styles/globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Next Blog App',
  description: 'A blog app with admin and user access',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
