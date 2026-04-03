"use client"
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function ProfileSettings() {
  const [email, setEmail] = useState("")

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail')
    if (storedEmail) setEmail(storedEmail)
  }, [])

  return (
    <main className="container" style={{ padding: '4rem 0' }}>
      <h1 style={{ marginBottom: '2rem' }}>My Account</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 3fr', gap: '2rem' }}>
        
        {/* Sidebar */}
        <div className="glass-panel" style={{ padding: '2rem', height: 'fit-content' }}>
           <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>Menu</h3>
           <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             <li><Link href="/dashboard" style={{ color: 'var(--text-secondary)' }}>Order History</Link></li>
             <li><Link href="/dashboard/profile" style={{ color: 'white', fontWeight: 'bold' }}>Profile Settings</Link></li>
             <li><button 
                onClick={() => { localStorage.removeItem('userEmail'); window.location.href = '/dashboard'; }}
                style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', textAlign: 'left', padding: 0, fontSize: '1rem' }}
             >Logout</button></li>
           </ul>
        </div>

        {/* Content area */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
           <h2 style={{ marginBottom: '2rem' }}>Profile Settings</h2>
           <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Email Address</label>
                <input 
                  type="text" 
                  value={email} 
                  readOnly 
                  style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white' }} 
                />
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>This is the email linked to your orders.</p>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontStyle: 'italic' }}>Note: Profile editing is currently disabled. Please contact support via Instagram to update your phone or shipping details.</p>
           </div>
        </div>
      </div>
    </main>
  )
}
