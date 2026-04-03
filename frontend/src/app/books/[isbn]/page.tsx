"use client"
import Link from 'next/link'
import { useCart } from '../../../context/CartContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function BookDetails({ params }: { params: { isbn: string } }) {
  const { addToCart } = useCart()
  const router = useRouter()
  
  const [book, setBook] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/books/${params.isbn}` : `https://pulpe-dentaire-store.onrender.com/api/books/${params.isbn}`)
      .then(r => r.json())
      .then(d => {
        if(!d.error) setBook(d)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [params.isbn])

  if (loading) {
    return (
      <main className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--text-secondary)' }}>Loading Book Details...</h2>
      </main>
    )
  }

  if (!book) {
    return (
      <main className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h1 style={{ color: 'var(--accent-primary)' }}>Book Not Found</h1>
        <Link href="/"><button className="btn-secondary" style={{ marginTop: '2rem' }}>Back to Home</button></Link>
      </main>
    )
  }

  return (
    <main className="container" style={{ padding: '4rem 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
        
        {/* Left Image View */}
        <div style={{ position: 'sticky', top: '120px', display: 'flex', justifyContent: 'center' }}>
           <img src={book.image} alt={book.title} className="glass-panel" style={{ width: '100%', maxWidth: '350px', height: 'auto', objectFit: 'cover', borderRadius: '16px', padding: 0 }} />
        </div>

        {/* Right Info View */}
        <div>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', lineHeight: 1.2 }}>{book.title}</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>ISBN: {book.isbn}</p>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-primary)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            ₹{book.price} <span style={{ textDecoration: 'line-through', color: 'gray', fontSize: '1.2rem' }}>₹300</span>
          </div>

          <p style={{ fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.8 }}>
            {book.description}
          </p>

          <h3 style={{ marginBottom: '1rem' }}>Key Features</h3>
          <ul style={{ listStyleType: 'none', padding: 0, marginBottom: '3rem' }}>
            {book.features && book.features.map((feature: string, idx: number) => (
              <li key={idx} style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <span style={{ color: 'var(--accent-primary)' }}>✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              className="btn-primary" 
              style={{ flex: 1, padding: '16px' }}
              onClick={() => addToCart({ id: book.id, isbn: book.isbn, title: book.title, price: book.price, quantity: 1, image: book.image })}
            >
              Add to Cart
            </button>
            <button 
              className="btn-secondary" 
              style={{ flex: 1, padding: '16px' }}
              onClick={() => {
                addToCart({ id: book.id, isbn: book.isbn, title: book.title, price: book.price, quantity: 1, image: book.image })
                router.push('/checkout')
              }}
            >
              Buy Now
            </button>
          </div>


        </div>

      </div>
    </main>
  )
}
