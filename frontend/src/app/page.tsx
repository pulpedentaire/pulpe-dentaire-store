"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] })
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacityParallax = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const [books, setBooks] = useState<any[]>([])

  useEffect(() => {
    fetch('http://localhost:5000/api/books')
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) {
          const colors = ["linear-gradient(135deg, #1f2833, #0b0c10)", "linear-gradient(135deg, #2b1f33, #110b10)", "linear-gradient(135deg, #33241f, #100d0b)"]
          const accents = ["#66fcf1", "#c166fc", "#fc8c66"]
          
          setBooks(data.map((b, i) => ({
            ...b,
            color: colors[i % colors.length],
            accent: accents[i % accents.length]
          })))
        }
      })
      .catch(console.error)
  }, [])

  return (
    <main>
      {/* Hero Section */}
      <section 
        ref={containerRef}
        style={{ 
          height: '90vh', 
          display: 'flex', 
          alignItems: 'center', 
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <motion.div 
          className="container"
          style={{ width: '100%', zIndex: 10, y: yParallax, opacity: opacityParallax }}
        >
          <div style={{ maxWidth: '600px' }}>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.1 }}
            >
              Master Dentistry. <br/>
              <span style={{ color: 'var(--accent-primary)' }}>Simplified.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2.5rem' }}
            >
              These books are carefully created based on previous year question papers from Kerala University of Health Sciences, making them highly exam-focused and practical. The content is simplified to help students understand complex dental concepts easily. Each topic is explained in a clear and structured manner, supported by hand-drawn diagrams that improve visualization and retention. These books are designed to make studying faster, easier, and more efficient while still encouraging students to refer standard textbooks for deeper understanding
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ display: 'flex', gap: '1rem' }}
            >
              <Link href="/books"><button className="btn-primary">Explore Series</button></Link>
              <Link href="/about"><button className="btn-secondary">Meet the Author</button></Link>
            </motion.div>
          </div>
        </motion.div>

        {/* 3D Animated Books Background */}
        <div style={{ position: 'absolute', right: '5%', top: '10%', width: '50%', height: '80%', perspective: '1200px', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 20 }}>
          {books.map((book, i) => (
            <motion.div
              key={book.id}
              onClick={() => router.push(`/books/${book.isbn}`)}
              initial={{ opacity: 0, x: 100, rotateY: -30, rotateX: 10, zIndex: 10 - i }}
              animate={{ 
                opacity: 1, 
                x: i * 40 - 40,
                y: i * 20 - 20,
                rotateY: -25 + (i * 5),
                rotateX: 15,
                z: -i * 50,
                zIndex: 10 - i,
                transition: { duration: 1, delay: 0.5 + (i * 0.2), type: 'spring' }
              }}
              whileHover={{
                scale: 1.05,
                filter: 'brightness(1.2)',
                transition: { duration: 0.3 }
              }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="glass-panel"
              style={{
                position: 'absolute',
                width: '180px',
                height: '260px',
                background: book.color,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0',
                borderLeft: `4px solid ${book.accent}`,
                boxShadow: '-10px 10px 30px rgba(0,0,0,0.8), inset 2px 2px 10px rgba(255,255,255,0.1)',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              <img src={book.image} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Collection Strip */}
      <section style={{ padding: '6rem 0', background: 'var(--surface-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>The Collection</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>Three essential volumes crafted meticulously from past KUHS papers to guarantee exam success.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {books.map(book => (
              <motion.div 
                key={book.id}
                whileHover={{ y: -10 }}
                className="glass-panel"
                style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}
              >
                <img src={book.image} alt={book.title} style={{ 
                  height: '350px', 
                  width: '100%',
                  objectFit: 'cover',
                  background: book.color, 
                  borderRadius: '8px', 
                  marginBottom: '1.5rem',
                  borderLeft: `3px solid ${book.accent}`
                }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{book.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1 }}>
                  Comprehensive guides designed to simplify complex concepts and maximize retention.
                </p>
                <Link href={`/books/${book.isbn}`}>
                  <button className="btn-secondary" style={{ width: '100%', borderColor: book.accent, color: book.accent }}>
                    View Details
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
