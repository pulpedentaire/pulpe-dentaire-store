"use client"
import Link from 'next/link'

export default function UserDashboard() {
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
             <li><button style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', textAlign: 'left', padding: 0, fontSize: '1rem' }}>Logout</button></li>
           </ul>
        </div>

        {/* Content area */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
           <h2 style={{ marginBottom: '2rem' }}>Recent Orders</h2>
           
           {/* Mock Order Item */}
           <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                 <div>
                    <span style={{ color: 'var(--text-secondary)', marginRight: '1rem' }}>Order #1024</span>
                    <span style={{ background: 'rgba(255, 165, 0, 0.2)', color: 'orange', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>Processing</span>
                 </div>
                 <div style={{ fontWeight: 'bold' }}>Total: ₹200</div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                 <div style={{ width: '40px', height: '60px', background: 'linear-gradient(135deg, #1f2833, #0b0c10)', borderRadius: '4px' }}></div>
                 <div>
                    <h4>Pulpe Dentaire – General Medicine</h4>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Quantity: 1</span>
                 </div>
              </div>
              
              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
                 <p style={{ fontSize: '0.9rem' }}>Tracking Status: <span style={{ color: 'var(--accent-primary)' }}>Awaiting Shipment Details</span></p>
              </div>
           </div>

        </div>

      </div>
    </main>
  )
}
