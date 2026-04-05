"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import CartButton from './CartButton'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav 
      className={`glass-nav ${isOpen ? 'mobile-menu-active' : ''}`} 
      style={{ 
        minHeight: 'var(--nav-height)', 
        display: 'flex', 
        alignItems: 'center', 
        position: 'sticky', 
        top: 0, 
        zIndex: 1000, 
        padding: '0.5rem 0',
        transition: 'background 0.3s ease, backdrop-filter 0.3s ease',
        background: scrolled ? 'rgba(11, 12, 16, 0.9)' : 'rgba(11, 12, 16, 0.4)'
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', zIndex: 1100 }}>
          <Link href="/" onClick={() => setIsOpen(false)}>
            <img src="/logo.png" alt="Pulpe Dentaire Logo" style={{ height: '50px', width: 'auto' }} />
          </Link>
        </div>

        {/* Desktop & Mobile Links */}
        <div className="nav-links">
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/books" onClick={() => setIsOpen(false)}>Books</Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>About Author</Link>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', zIndex: 1100 }}>
          <CartButton />
          
          {/* Hamburger Icon */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '10px',
              display: 'none', /* Hidden by media query in globals.css if we use it, but easier to handle here */
              flexDirection: 'column',
              gap: '6px',
              zIndex: 1100
            }}
            className="mobile-toggle"
          >
            <motion.span 
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
              style={{ width: '24px', height: '2px', background: 'var(--accent-primary)', display: 'block' }}
            />
            <motion.span 
              animate={{ opacity: isOpen ? 0 : 1 }}
              style={{ width: '24px', height: '2px', background: 'var(--accent-primary)', display: 'block' }}
            />
            <motion.span 
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
              style={{ width: '24px', height: '2px', background: 'var(--accent-primary)', display: 'block' }}
            />
          </button>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  )
}
