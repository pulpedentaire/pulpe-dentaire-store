"use client"
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function UserDashboard() {
  const [email, setEmail] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail')
    if (storedEmail) {
      setEmail(storedEmail)
      handleLookup(storedEmail)
    }
  }, [])

  const handleLookup = async (lookupEmail?: string) => {
    const targetEmail = lookupEmail || email
    if (!targetEmail) return
    
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://pulpe-dentaire-store.onrender.com/api'}/users/orders/${targetEmail}`)
      const data = await res.json()
      if (res.ok) {
        setOrders(data.orders || [])
        setIsLoggedIn(true)
        localStorage.setItem('userEmail', targetEmail)
      } else {
        setError(data.error || "No orders found for this email.")
      }
    } catch (err) {
      setError("Failed to connect to the server.")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('userEmail')
    setIsLoggedIn(false)
    setOrders([])
    setEmail("")
  }

  if (!isLoggedIn) {
    return (
      <main className="container" style={{ padding: '6rem 0' }}>
        <div style={{ maxWidth: '450px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ marginBottom: '1.5rem' }}>Track Order</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>Enter the email address you used during checkout to view your order history and tracking status.</p>
          
          <div className="glass-panel" style={{ padding: '2.5rem' }}>
            <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="me@example.com"
                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white' }} 
              />
            </div>
            {error && <p style={{ color: '#ff4d4d', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{error}</p>}
            <button 
              onClick={() => handleLookup()}
              disabled={loading}
              className="btn-primary" 
              style={{ width: '100%', padding: '12px' }}
            >
              {loading ? "Searching..." : "View My Orders"}
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="container" style={{ padding: '4rem 0' }}>
      <h1 style={{ marginBottom: '2rem' }}>My Account</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 3fr', gap: '2rem' }}>
        
        {/* Sidebar */}
        <div className="glass-panel" style={{ padding: '2rem', height: 'fit-content' }}>
           <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>Menu</h3>
           <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             <li><Link href="/dashboard" style={{ color: 'white', fontWeight: 'bold' }}>Order History</Link></li>
             <li><Link href="/dashboard/profile" style={{ color: 'var(--text-secondary)' }}>Profile Settings</Link></li>
             <li><button 
                onClick={handleLogout}
                style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', textAlign: 'left', padding: 0, fontSize: '1rem' }}
             >Logout</button></li>
           </ul>
        </div>

        {/* Content area */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
           <h2 style={{ marginBottom: '2rem' }}>Recent Orders</h2>
           
           {orders.length === 0 ? (
             <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '3rem' }}>You haven't placed any orders yet.</p>
           ) : (
             orders.map(order => (
                <div key={order.id} style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <span style={{ color: 'var(--text-secondary)', marginRight: '1rem' }}>Order #{order.id}</span>
                      <span style={{ 
                        background: order.status === 'DELIVERED' ? 'rgba(0,255,0,0.1)' : 'rgba(255,165,0,0.1)', 
                        color: order.status === 'DELIVERED' ? '#4dff4d' : 'orange', 
                        padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' 
                      }}>
                        {order.status}
                      </span>
                    </div>
                    <div style={{ fontWeight: 'bold' }}>Total: ₹{order.total_amount}</div>
                  </div>
                  
                  {order.order_items.map((item: any) => (
                    <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                      <img src={item.book.image} alt={item.book.title} style={{ width: '40px', height: '60px', borderRadius: '4px', objectFit: 'cover' }} />
                      <div>
                        <h4 style={{ fontSize: '1rem' }}>{item.book.title}</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Quantity: {item.quantity}</span>
                      </div>
                    </div>
                  ))}
                  
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
                    <p style={{ fontSize: '0.9rem' }}>Tracking Status: <span style={{ color: 'var(--accent-primary)' }}>{order.tracking_status || "Awaiting Shipment Details"}</span></p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Ordered on {new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
             ))
           )}
        </div>
      </div>
    </main>
  )
}
