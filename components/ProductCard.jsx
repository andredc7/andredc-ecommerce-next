'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { addToCart } from '../lib/cart';
import { addToWishlist, removeFromWishlist, isInWishlist } from '../lib/wishlist';
import { getCurrentUser } from '../lib/auth';

export default function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    setIsWishlisted(isInWishlist(product.id));
  }, [product.id]);

  const handleAddToCart = () => {
    try {
      const currentUser = getCurrentUser();
      if (!currentUser) {
        alert('Please login first to add items to your cart.');
        window.location.href = '/login';
        return;
      }

      addToCart(product.id);
      alert('Added to cart!');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleWishlistToggle = () => {
    try {
      const currentUser = getCurrentUser();
      if (!currentUser) {
        alert('Please login first to add items to your wishlist.');
        window.location.href = '/login';
        return;
      }

      if (isWishlisted) {
        removeFromWishlist(product.id);
        setIsWishlisted(false);
      } else {
        addToWishlist(product);
        setIsWishlisted(true);
        alert('Added to wishlist!');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="product-card">
      <div style={{position: 'relative'}}>
        <img src={product.img} alt={product.name} />
        <button
          onClick={handleWishlistToggle}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: isWishlisted ? '#dc3545' : 'rgba(255, 255, 255, 0.8)',
            color: isWishlisted ? 'white' : '#333',
            border: 'none',
            borderRadius: '50%',
            width: '35px',
            height: '35px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
          title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          ♥
        </button>
      </div>
      <h3>{product.name}</h3>
      <div className="price">Rp {product.price.toLocaleString()}</div>
      <div style={{marginTop: '8px', display: 'flex', gap: '8px'}}>
        <button className="btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <Link href={`/products/${product.id}`} className="btn secondary">
          View
        </Link>
      </div>
    </div>
  );
}