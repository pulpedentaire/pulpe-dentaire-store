"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, hoverScale } from '../../lib/animations'

const books = [
  {
    id: 1,
    isbn: "978-93-344-0482-1",
    title: "Pulpe Dentaire - General Medicine",
    image: "/general-medicine.png"
  },
  {
    id: 2,
    isbn: "978-93-344-2283-2",
    title: "Pulpe Dentaire - Oral Pathology",
    image: "/oral-pathology.png"
  },
  {
    id: 3,
    isbn: "978-93-343-9228-9",
    title: "Pulpe Dentaire - General Surgery",
    image: "/general-surgery.png"
  }
]

export default function BooksPage() {
  return (
    <main className="container" style={{ padding: '4rem 0' }}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.h1 
          variants={fadeInUp}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          The Collection
        </motion.h1>
        
        <div className="mobile-grid-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {books.map(book => (
            <motion.div 
              key={book.id} 
              variants={fadeInUp}
              className="glass-panel" 
              style={{ padding: '2rem', textAlign: 'center' }}
            >
              <div style={{ overflow: 'hidden', borderRadius: '8px', marginBottom: '1rem' }}>
                <img 
                  src={book.image} 
                  alt={book.title} 
                  style={{ width: '100%', height: '350px', objectFit: 'cover' }} 
                />
              </div>
              <h3 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>{book.title}</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>ISBN: {book.isbn}</p>
              <Link href={`/books/${book.isbn}`}>
                <motion.button 
                  variants={hoverScale}
                  whileHover="whileHover"
                  whileTap="whileTap"
                  className="btn-secondary" 
                  style={{ width: '100%' }}
                >
                  View Details
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  )
}
