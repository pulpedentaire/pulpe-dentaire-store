import Link from 'next/link'

const books = [
  {
    id: 1,
    isbn: "978-93-344-0482-1",
    title: "Pulpe Dentaire - General Medicine",
    image: "/general-medicine.jpg"
  },
  {
    id: 2,
    isbn: "978-93-344-2283-2",
    title: "Pulpe Dentaire - Oral Pathology",
    image: "/oral-pathology.jpg"
  },
  {
    id: 3,
    isbn: "978-93-343-9228-9",
    title: "Pulpe Dentaire - General Surgery",
    image: "/general-surgery.jpg"
  }
]

export default function BooksPage() {
  return (
    <main className="container" style={{ padding: '4rem 0' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '4rem' }}>The Collection</h1>
      <div className="mobile-grid-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {books.map(book => (
          <div key={book.id} className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
            <img src={book.image} alt={book.title} style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>{book.title}</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>ISBN: {book.isbn}</p>
            <Link href={`/books/${book.isbn}`}>
              <button className="btn-secondary" style={{ width: '100%' }}>View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </main>
  )
}
