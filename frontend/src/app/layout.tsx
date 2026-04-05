import './globals.css'
import type { Metadata } from 'next'
import { CartProvider } from '../context/CartContext'
import Navbar from '../components/Navbar'
import DentalBackground from '../components/DentalBackground'

export const metadata: Metadata = {
  title: 'Pulpe Dentaire - Premium Dental Books',
  description: 'High-end exam-focused dental books by Dr. Adithyan V Pramod',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <DentalBackground />
          <Navbar />
          {children}
          <footer style={{
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(10px)',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            padding: '3rem 0',
            marginTop: 'auto',
            textAlign: 'center'
          }}>
            <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600 }}>We'd Love Your Feedback!</h3>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '500px' }}>
                Your thoughts and suggestions matter to us. Reach out directly and let us know how we can improve our books or what you'd like to see next!
              </p>
              <a 
                href="https://www.instagram.com/pulpe_dentaire/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="insta-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.8rem 1.5rem',
                  background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                  color: '#fff',
                  borderRadius: '30px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  marginTop: '1rem',
                  boxShadow: '0 4px 15px rgba(220, 39, 67, 0.4)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                Follow & Message us on Instagram
              </a>
              <div style={{ marginTop: '2rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', position: 'relative', paddingRight: '20px' }}>
                &copy; {new Date().getFullYear()} Pulpe Dentaire. All rights reserved.
                <span style={{ position: 'absolute', bottom: '2px', right: '-15px', fontSize: '11px', opacity: 0.15, pointerEvents: 'none', userSelect: 'none', letterSpacing: '2px' }}>meg</span>
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  )
}
