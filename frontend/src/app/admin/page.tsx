"use client"
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function AdminDashboard() {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState("")
  
  const [orders, setOrders] = useState<any[]>([])
  const [statusUpdates, setStatusUpdates] = useState<{[key:number]: string}>({})

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://pulpe-dentaire-store.onrender.com/api'}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthorized(true);
        sessionStorage.setItem('adminAuthorized', 'true');
        fetchOrders();
      } else {
        setAuthError("Incorrect password. Access denied.");
      }
    } catch (err) {
      setAuthError("Server connection failed.");
    }
  }

  const fetchOrders = () => {
    fetch(process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/orders` : 'https://pulpe-dentaire-store.onrender.com/api/orders')
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) setOrders(data)
      })
      .catch(console.error)
  }

  useEffect(() => {
    if (sessionStorage.getItem('adminAuthorized') === 'true') {
      setIsAuthorized(true);
      fetchOrders();
    }
  }, [])

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/books` : 'https://pulpe-dentaire-store.onrender.com/api/books', { method: 'POST', body: formData });
      const data = await res.json();
      if(data.success) {
        alert("Book Added successfully!");
        form.reset();
      } else {
        alert("Error: " + data.error);
      }
    } catch(err) {
      alert("Error uploading book");
    }
  }

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}/status` : `https://pulpe-dentaire-store.onrender.com/api/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        alert("Order status updated successfully!");
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
      } else {
        alert("Error updating status: " + data.error);
      }
    } catch(e) {
      alert("Connection error");
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthorized');
    setIsAuthorized(false);
  }

  if (!isAuthorized) {
    return (
      <main className="container" style={{ padding: '8rem 0', display: 'flex', justifyContent: 'center' }}>
        <div className="glass-panel" style={{ padding: '3rem', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Admin Access</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.9rem' }}>This area is restricted. Please enter the administrator password to proceed.</p>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Enter Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '8px', marginBottom: '1rem' }} 
            />
            {authError && <p style={{ color: '#ff4d4d', fontSize: '0.8rem', marginBottom: '1rem' }}>{authError}</p>}
            <button className="btn-primary" style={{ width: '100%', padding: '12px' }}>Verify Identity</button>
          </form>
        </div>
      </main>
    )
  }

  const totalRevenue = orders.reduce((sum, o) => sum + o.total_amount, 0)
  const pendingCount = orders.filter(o => o.status === 'PENDING' || o.status === 'PAID').length
  
  return (
    <main className="container" style={{ padding: '4rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Admin Control Panel</h1>
        <button 
          onClick={handleLogout}
          style={{ background: 'none', border: '1px solid #ff4d4d', color: '#ff4d4d', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
        >Admin Logout</button>
      </div>
      
      {/* Stats and Manage orders code ... remains same or similar */}
      <div className="mobile-grid-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '3rem' }}>
         <div className="glass-panel" style={{ padding: '2rem' }}>
            <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Orders</h4>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>{orders.length}</div>
         </div>
         <div className="glass-panel" style={{ padding: '2rem' }}>
            <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Pending Shipments</h4>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'orange' }}>{pendingCount}</div>
         </div>
         <div className="glass-panel" style={{ padding: '2rem' }}>
            <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Revenue</h4>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#66fcf1' }}>₹{totalRevenue}</div>
         </div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '3rem' }}>
         <h2 style={{ marginBottom: '1.5rem' }}>Add New Book to Catalog</h2>
         <form onSubmit={handleAddBook} className="mobile-grid-1" style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
            <input name="title" placeholder="Book Title" required style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '4px' }} />
            <input name="isbn" placeholder="ISBN (Unique)" required style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '4px' }} />
            <input name="price" type="number" placeholder="Offer Price (₹)" required style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '4px' }} />
            <input name="originalPrice" type="number" placeholder="Original Price (₹)" style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '4px' }} />
            <input name="features" placeholder="Features (comma separated)" required style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '4px' }} />
            <textarea name="description" placeholder="Description" required style={{ gridColumn: '1 / -1', width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '4px', minHeight: '80px' }} />
            
            <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
               <label style={{ color: 'var(--text-secondary)' }}>Upload Cover Image:</label>
               <input name="image" type="file" accept="image/*" required style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '4px' }} />
            </div>

            <button type="submit" className="btn-primary" style={{ gridColumn: '1 / -1', padding: '12px' }}>Upload Book to Database</button>
         </form>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
         <h2 style={{ marginBottom: '1.5rem' }}>Manage Orders</h2>
         <div className="table-container">
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
               <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Order ID</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Customer</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Delivery Address</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Total</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Status</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Actions</th>
               </tr>
            </thead>
            <tbody>
               {orders.length === 0 ? (
                 <tr>
                    <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: 'gray' }}>No orders found in database</td>
                 </tr>
               ) : (
                 orders.map(o => (
                   <tr key={o.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '1rem' }}>#{o.id}</td>
                      <td style={{ padding: '1rem' }}>
                         <div>{o.user?.name}</div>
                         <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{o.user?.email} <br/> {o.user?.phone}</div>
                      </td>
                      <td style={{ padding: '1rem', maxWidth: '300px', whiteSpace: 'pre-wrap', wordWrap: 'break-word', fontSize: '0.9rem' }}>
                         {o.address?.street}
                      </td>
                      <td style={{ padding: '1rem' }}>₹{o.total_amount}</td>
                      <td style={{ padding: '1rem' }}>
                         <select 
                            defaultValue={o.status} 
                            onChange={(e) => setStatusUpdates(prev => ({...prev, [o.id]: e.target.value}))}
                            style={{ background: 'black', color: 'white', padding: '4px', border: '1px solid var(--glass-border)' }}>
                            <option value="PAID">PAID</option>
                            <option value="SHIPPED">SHIPPED</option>
                            <option value="DELIVERED">DELIVERED</option>
                         </select>
                      </td>
                      <td style={{ padding: '1rem' }}>
                         <button 
                            onClick={() => handleUpdateStatus(o.id, statusUpdates[o.id] || o.status)}
                            className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                            Update
                         </button>
                      </td>
                   </tr>
                 ))
               )}
            </tbody>
         </table>
         </div>
      </div>
    </main>
  )
}
