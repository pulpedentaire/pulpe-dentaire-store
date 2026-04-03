"use client"
import Link from 'next/link'
import { useCart } from '../../context/CartContext'

export default function CartPage() {
  const { cart: cartItems, removeFromCart, updateQuantity, totalPrice } = useCart()

  return (
    <main className="container" style={{ padding: '6rem 0' }}>
      <h1 style={{ marginBottom: '3rem' }}>Your Cart</h1>
      
      {cartItems.length === 0 ? (
         <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>Your cart is empty.</h3>
            <Link href="/books"><button className="btn-primary">Browse Books</button></Link>
         </div>
      ) : (
         <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
            {/* Cart Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
               {cartItems.map(item => (
                  <div key={item.id} className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem', alignItems: 'center' }}>
                     <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{item.title}</h4>
                        <p style={{ color: 'var(--text-secondary)' }}>ISBN: {item.isbn}</p>
                     </div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <select value={item.quantity} onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))} style={{ background: 'transparent', color: 'white', border: '1px solid var(--glass-border)', padding: '5px 10px', borderRadius: '4px' }}>
                           {[1,2,3,4,5].map(q => <option key={q} value={q} style={{ color: 'black' }}>{q}</option>)}
                        </select>
                        <div style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>₹{item.price * item.quantity}</div>
                        <button onClick={() => removeFromCart(item.id)} style={{ background: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '1.5rem' }}>×</button>
                     </div>
                  </div>
               ))}
            </div>

            {/* Order Summary */}
            <div className="glass-panel" style={{ padding: '2rem', height: 'fit-content' }}>
               <h3 style={{ marginBottom: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>Order Summary</h3>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
               </div>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span>Shipping</span>
                  <span style={{ color: 'var(--text-secondary)' }}>Calculated at checkout</span>
               </div>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)', fontSize: '1.2rem', fontWeight: 'bold' }}>
                  <span>Total</span>
                  <span style={{ color: 'var(--accent-primary)' }}>₹{totalPrice}</span>
               </div>
               
               <Link href="/checkout">
                  <button className="btn-primary" style={{ width: '100%', marginTop: '2rem' }}>Proceed to Checkout</button>
               </Link>
            </div>
         </div>
      )}
    </main>
  )
}
