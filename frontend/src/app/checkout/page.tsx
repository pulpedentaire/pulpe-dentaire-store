"use client"
import Link from 'next/link'
import Script from 'next/script'
import { useCart } from '../../context/CartContext'

export default function CheckoutPage() {
  const { cart, totalPrice } = useCart()

  const handlePayment = async () => {
    const name = (document.getElementById('c-name') as HTMLInputElement).value.trim()
    const email = (document.getElementById('c-email') as HTMLInputElement).value.trim()
    const phone = (document.getElementById('c-phone') as HTMLInputElement).value.trim()
    const address = (document.getElementById('c-address') as HTMLTextAreaElement).value.trim()

    if (!name || !email || !phone || !address) {
      alert("Please fill in all required shipping details before paying.")
      return
    }

    try {
      const res = await fetch('http://localhost:5000/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalPrice * 100 }) // Razorpay expects paise
      })
      const order = await res.json()

      const options = {
        key: "rzp_test_SYwa4bn612fEHl",
        amount: order.amount,
        currency: order.currency,
        name: "Pulpe Dentaire",
        description: "Dental Books Checkout",
        order_id: order.id,
        handler: async function (response: any) {
          const verifyRes = await fetch('http://localhost:5000/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              user: {
                name: name,
                email: email,
                phone: phone,
              },
              address: address,
              items: cart, // Using global cart context data!
              total_amount: totalPrice
            })
          })
          const verifyData = await verifyRes.json()
          if (verifyData.success) {
            alert('Payment Successful! Order placed.')
            window.location.href = '/dashboard'
          } else {
            alert('Payment verification failed.')
          }
        },
        prefill: {
          name: "John Doe",
        },
        theme: {
          color: "#66fcf1"
        }
      }

      // @ts-ignore
      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (e) {
      console.error(e)
      alert("Error initiating payment. Make sure the backend server (port 5000) is running.")
    }
  }

  return (
    <main className="container" style={{ padding: '4rem 0' }}>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <h1 style={{ marginBottom: '2rem' }}>Checkout</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
        
        {/* Checkout Form */}
        <div className="glass-panel" style={{ padding: '3rem' }}>
           <h3 style={{ marginBottom: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>Shipping Details</h3>
           
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                 <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Full Name *</label>
                    <input id="c-name" type="text" placeholder="John Doe" required style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'white' }} />
                 </div>
                 <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Email *</label>
                    <input id="c-email" type="email" placeholder="john@example.com" required style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'white' }} />
                 </div>
              </div>
              
              <div>
                 <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Phone Number *</label>
                 <input id="c-phone" type="tel" placeholder="+91 9876543210" required style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'white' }} />
              </div>

              <div>
                 <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Full Delivery Address *</label>
                 <textarea id="c-address" rows={3} placeholder="Street, City, State, ZIP..." required style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'white', resize: 'vertical' }} />
              </div>
           </form>
        </div>

        {/* Payment Summary */}
        <div className="glass-panel" style={{ padding: '2rem', height: 'fit-content' }}>
           <h3 style={{ marginBottom: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>Payment</h3>
           
           <div style={{ marginBottom: '2rem' }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Amount to Pay:</p>
              <h2 style={{ color: 'var(--accent-primary)' }}>₹{totalPrice}</h2>
           </div>

           <button onClick={handlePayment} className="btn-primary" style={{ width: '100%' }}>Pay with Razorpay</button>
           
           <p style={{ fontSize: '0.8rem', color: 'gray', textAlign: 'center', marginTop: '1rem' }}>
             Secure payment powered by Razorpay.
           </p>
        </div>

      </div>
    </main>
  )
}
