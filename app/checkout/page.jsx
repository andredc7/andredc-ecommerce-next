'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { getCart, getCartTotal, checkout } from '../../lib/cart';
import { getCurrentUser } from '../../lib/auth';

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [shippingAddress, setShippingAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      router.push('/login');
      return;
    }

    setCurrentUser(user);
    const items = getCart();
    setCartItems(items);
    setTotal(getCartTotal());
  }, [router]);

  const handleCheckout = async () => {
    if (!shippingAddress.trim() || !phone.trim()) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsProcessing(true);

    try {
      const orderData = {
        address: shippingAddress,
        phone: phone,
        paymentMethod: paymentMethod
      };

      const order = checkout(orderData);
      alert(`Order placed successfully! Order ID: ${order.id}`);
      router.push('/');
    } catch (error) {
      alert(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />

      <main className="container">
        <h2 className="section-title">Checkout</h2>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px'}}>
          {/* Order Summary */}
          <div className="card">
            <h3>Order Summary</h3>
            <div className="cart-list">
              {cartItems.map(item => (
                <div key={item.id} style={{display: 'flex', gap: '14px', padding: '12px', borderBottom: '1px solid #eee'}}>
                  <img src={item.image} alt={item.name} style={{width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px'}} />
                  <div>
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.qty}</p>
                    <p className="price">Rp {(item.price * item.qty).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #eee'}}>
              <h3>Total: Rp {total.toLocaleString()}</h3>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="card">
            <h3>Shipping Information</h3>
            <div style={{marginBottom: '20px'}}>
              <p><strong>Name:</strong> {currentUser.name}</p>
              <p><strong>Email:</strong> {currentUser.email}</p>
            </div>

            <div style={{marginBottom: '20px'}}>
              <label style={{display: 'block', marginBottom: '8px'}}>Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e6eef6'}}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div style={{marginBottom: '20px'}}>
              <label style={{display: 'block', marginBottom: '8px'}}>Shipping Address</label>
              <textarea
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e6eef6', minHeight: '80px'}}
                placeholder="Enter your complete shipping address"
                required
              />
            </div>

            <div style={{marginBottom: '20px'}}>
              <label style={{display: 'block', marginBottom: '8px'}}>Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e6eef6'}}
              >
                <option>Cash on Delivery</option>
                <option>Credit Card</option>
                <option>Bank Transfer</option>
              </select>
            </div>

            <button
              onClick={handleCheckout}
              className="btn"
              style={{width: '100%'}}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>

        <div style={{textAlign: 'center', marginTop: '30px'}}>
          <Link href="/cart" className="btn secondary">
            Back to Cart
          </Link>
        </div>
      </main>

      <footer className="footer">
        © 2025 andre-ecommerce
      </footer>
    </>
  );
}