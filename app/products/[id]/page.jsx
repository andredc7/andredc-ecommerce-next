'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import ProductCard from '../../../components/ProductCard';
import { getProductById, PRODUCTS } from '../../../lib/products';
import { addToCart } from '../../../lib/cart';
import { getCurrentUser } from '../../../lib/auth';

export default function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    if (params.id) {
      const prod = getProductById(params.id);
      if (prod) {
        setProduct(prod);
        // Get recommended products from same category
        const rec = PRODUCTS.filter(p =>
          p.cat === prod.cat && p.id !== prod.id
        ).slice(0, 4);
        setRecommendedProducts(rec);
      }
    }
  }, [params.id]);

  const handleAddToCart = () => {
    try {
      const currentUser = getCurrentUser();
      if (!currentUser) {
        alert('Please login first to add items to your cart.');
        window.location.href = '/login';
        return;
      }

      for (let i = 0; i < quantity; i++) {
        addToCart(product.id);
      }
      alert('Added to cart!');
    } catch (error) {
      alert(error.message);
    }
  };

  const increaseQuantity = () => setQuantity(q => q + 1);
  const decreaseQuantity = () => setQuantity(q => q > 1 ? q - 1 : 1);

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="container">
          <p>Product not found.</p>
          <Link href="/products" className="btn">Back to Products</Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link href="/">Home</Link> /
          <Link href="/products">Products</Link> /
          <span>{product.name}</span>
        </div>

        {/* Product Detail */}
        <div className="pd-wrapper card">
          <img src={product.img} alt={product.name} />

          <div className="pd-info">
            <h2>{product.name}</h2>
            <p className="muted">Category: {product.cat}</p>
            <p className="price">Rp {product.price.toLocaleString()}</p>

            <div className="qty-box">
              <button onClick={decreaseQuantity}>–</button>
              <span id="qty">{quantity}</span>
              <button onClick={increaseQuantity}>+</button>
            </div>

            <button className="btn" onClick={handleAddToCart}>
              Add to Cart
            </button>

            <p style={{marginTop: '20px'}}>
              {product.description || "No description available."}
            </p>

            <div style={{marginTop: '20px'}}>
              <Link href="/products" className="btn secondary">
                Back to Products
              </Link>
            </div>
          </div>
        </div>

        {/* Recommended Section */}
        {recommendedProducts.length > 0 && (
          <section className="recommended">
            <h3>You may also like</h3>
            <div className="recommended-list">
              {recommendedProducts.map(prod => (
                <div key={prod.id} className="recommended-card">
                  <img src={prod.img} alt={prod.name} />
                  <h4>{prod.name}</h4>
                  <p className="price">Rp {prod.price.toLocaleString()}</p>
                  <Link href={`/products/${prod.id}`} className="btn small">
                    View
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        © 2025 andre-ecommerce
      </footer>
    </>
  );
}