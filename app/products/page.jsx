'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import ProductCard from '../../components/ProductCard';
import { PRODUCTS, getProductsByCategory, searchProducts } from '../../lib/products';

export default function Products() {
  const [products, setProducts] = useState(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    filterAndSortProducts();
  }, [searchQuery, selectedCategory, sortBy]);

  const filterAndSortProducts = () => {
    let filtered = getProductsByCategory(selectedCategory);
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setProducts(filtered);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  return (
    <>
      <Navbar />

      <div className="hero" style={{display: 'block'}}>
        <div className="hero-inner">
          <h1>Fresh drops — curated for you</h1>
          <p>Electronics • Fashion • Accessories</p>
        </div>
      </div>

      <main className="container">
        <h2 className="section-title">Products</h2>

        <div className="controls">
          <div className="categories">
            <button
              className={`cat ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('all')}
            >
              All
            </button>
            <button
              className={`cat ${selectedCategory === 'electronics' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('electronics')}
            >
              Electronics
            </button>
            <button
              className={`cat ${selectedCategory === 'fashion' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('fashion')}
            >
              Fashion
            </button>
            <button
              className={`cat ${selectedCategory === 'accessories' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('accessories')}
            >
              Accessories
            </button>
          </div>
          <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              style={{padding: '8px', borderRadius: '4px', border: '1px solid #ddd'}}
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <input
              id="searchInput"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <footer className="footer">
        © 2025 andre-ecommerce
      </footer>
    </>
  );
}