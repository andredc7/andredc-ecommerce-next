'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import ProductCard from '../../components/ProductCard';
import { getWishlist, removeFromWishlist, clearWishlist } from '../../lib/wishlist';

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    updateWishlist();
  }, []);

  const updateWishlist = () => {
    const items = getWishlist();
    setWishlistItems(items);
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
    updateWishlist();
  };

  const handleClearWishlist = () => {
    if (confirm('Are you sure you want to clear your wishlist?')) {
      clearWishlist();
      updateWishlist();
    }
  };

  return (
    <>
      <Navbar />

      <main className="container">
        <h2 className="section-title">My Wishlist</h2>

        {wishlistItems.length === 0 ? (
          <div style={{textAlign: 'center', padding: '50px 0'}}>
            <p>Your wishlist is empty.</p>
            <Link href="/products" className="btn">
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div style={{textAlign: 'right', marginBottom: '20px'}}>
              <button onClick={handleClearWishlist} className="btn secondary">
                Clear Wishlist
              </button>
            </div>

            <div className="product-grid">
              {wishlistItems.map(product => (
                <div key={product.id} style={{position: 'relative'}}>
                  <ProductCard product={product} />
                  <button
                    onClick={() => handleRemoveFromWishlist(product.id)}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px'
                    }}
                    title="Remove from wishlist"
                  >
                    ×
                  </button>
                </div>
              ))}
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