'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCurrentUser, logout } from '../lib/auth';
import { updateCartCount } from '../lib/cart';

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    setCurrentUser(getCurrentUser());
    updateCartCountDisplay();
    updateWishlistCountDisplay();
  }, []);

  const updateCartCountDisplay = () => {
    const cart = JSON.parse(localStorage.getItem('andre_cart') || '[]');
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    setCartCount(totalQty);
  };

  const updateWishlistCountDisplay = () => {
    const wishlist = JSON.parse(localStorage.getItem('andre_wishlist') || '[]');
    setWishlistCount(wishlist.length);
  };

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    window.location.href = '/login';
  };

  return (
    <header className="nav">
      <div className="brand">
        <Link href="/">andre<span>dc</span> Store</Link>
      </div>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        {currentUser && <Link href="/wishlist">Wishlist ({wishlistCount})</Link>}
        {currentUser && <Link href="/cart">Cart ({cartCount})</Link>}
        {currentUser ? (
          <>
            <Link href="/profile">Profile</Link>
            {currentUser.role === 'admin' && <Link href="/admin">Admin</Link>}
            <button onClick={handleLogout} className="btn secondary" style={{marginLeft: '18px', padding: '6px 12px'}}>
              Logout
            </button>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}