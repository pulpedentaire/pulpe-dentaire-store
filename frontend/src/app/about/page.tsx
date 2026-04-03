import Link from 'next/link'

export default function AboutAuthor() {
  return (
    <main className="container" style={{ padding: '4rem 0' }}>
      <div className="glass-panel" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: 'var(--accent-primary)', marginBottom: '1rem', textAlign: 'center' }}>
          Dr. Adithyan V Pramod
        </h1>
        <h2 style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '3rem', fontWeight: 400, letterSpacing: '1px' }}>
          Author & Creator, Pulpe Dentaire
        </h2>

        <div style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1.5rem' }}>
            These books are carefully created based on previous year question papers from Kerala University of Health Sciences (KUHS), making them highly exam-focused and practical. 
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            The content is deliberately simplified to help students understand complex dental concepts effortlessly. Each topic is explained in a clear, structured manner, supported by hand-drawn diagrams that drastically improve visualization and retention. 
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            <strong>Our Goal:</strong> To make studying faster, easier, and more efficient while still encouraging students to refer to standard textbooks for a deeper, foundational understanding.
          </p>
          
          <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--surface-secondary)', borderRadius: '8px', borderLeft: '4px solid var(--accent-secondary)' }}>
             <h3 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>Important Notes</h3>
             <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
               <li style={{ marginBottom: '0.5rem' }}>Minor human errors may be possible, and constructive feedback is always encouraged.</li>
               <li style={{ marginBottom: '0.5rem' }}>Students can share their suggestions or corrections via email.</li>
               <li style={{ marginBottom: '0.5rem' }}>The books are priced affordably, often comparable to or less than standard photocopy costs.</li>
               <li style={{ marginBottom: '0.5rem' }}>Orders are processed efficiently and typically delivered within a week.</li>
             </ul>
          </div>

        </div>

        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
          <Link href="/books"><button className="btn-primary">Explore The Books</button></Link>
        </div>
      </div>
    </main>
  )
}
