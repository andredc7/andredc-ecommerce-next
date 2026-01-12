'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import CartItem from '../../components/CartItem';
import { getCart, getCartTotal, clearCart } from '../../lib/cart';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    updateCart();
  }, []);

  const updateCart = () => {
    const items = getCart();
    setCartItems(items);
    setTotal(getCartTotal());
  };

  const handleClearCart = () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      clearCart();
      updateCart();
    }
  };

  return (
    <>
      <Navbar />

      <main className="container">
        <h2 className="section-title">Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <div style={{textAlign: 'center', padding: '50px 0'}}>
            <p>Your cart is empty.</p>
            <Link href="/products" className="btn">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-list">
              {cartItems.map(item => (
                <CartItem key={item.id} item={item} onUpdate={updateCart} />
              ))}
            </div>

            <div className="cart-summary">
              <div>
                <h3>Total: Rp {total.toLocaleString()}</h3>
              </div>
              <div>
                <button onClick={handleClearCart} className="btn secondary" style={{marginRight: '10px'}}>
                  Clear Cart
                </button>
                <Link href="/checkout" className="btn">
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </main>

      <footer className="footer">
        © 2025 andre-ecommerce
      </footer>
    </>
  );
}