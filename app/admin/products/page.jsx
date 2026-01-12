'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PRODUCTS } from '../../../lib/products';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    category: '',
    description: '',
    stock: ''
  });
  const router = useRouter();

  useEffect(() => {
    // Check if user is admin
    const currentUser = JSON.parse(localStorage.getItem('andre_user_current') || 'null');
    if (!currentUser || currentUser.role !== 'admin') {
      router.push('/login');
      return;
    }

    loadProducts();
  }, [router]);

  const loadProducts = () => {
    const storedProducts = JSON.parse(localStorage.getItem('andre_products') || '[]');
    setProducts(storedProducts.length > 0 ? storedProducts : PRODUCTS);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      id: editingProduct ? editingProduct.id : Date.now().toString(),
      name: formData.name,
      price: parseInt(formData.price),
      image: formData.image,
      category: formData.category,
      description: formData.description,
      stock: parseInt(formData.stock)
    };

    let updatedProducts;
    if (editingProduct) {
      updatedProducts = products.map(p => p.id === editingProduct.id ? productData : p);
    } else {
      updatedProducts = [...products, productData];
    }

    localStorage.setItem('andre_products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    resetForm();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      image: product.image,
      category: product.category,
      description: product.description,
      stock: product.stock.toString()
    });
    setShowAddForm(true);
  };

  const handleDelete = (productId) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(p => p.id !== productId);
      localStorage.setItem('andre_products', JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      image: '',
      category: '',
      description: '',
      stock: ''
    });
    setEditingProduct(null);
    setShowAddForm(false);
  };

  return (
    <div className="container">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
        <h1>Product Management</h1>
        <div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn"
            style={{marginRight: '10px'}}
          >
            {showAddForm ? 'Cancel' : 'Add Product'}
            </button>
            <Link href="/admin">
              <a className="btn secondary">Back to Dashboard</a>
            </Link>
          </div>
        </div>

        {showAddForm && (
          <div className="form-card" style={{marginBottom: '30px'}}>
            <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit}>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
                <div>
                  <label htmlFor="name">Product Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="price">Price (Rp)</label>
                  <input
                    type="number"
                    id="price"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="accessories">Accessories</option>
                    <option value="home">Home & Garden</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="stock">Stock</label>
                  <input
                    type="number"
                    id="stock"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    required
                  />
                </div>

                <div style={{gridColumn: 'span 2'}}>
                  <label htmlFor="image">Image URL</label>
                  <input
                    type="url"
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    required
                  />
                </div>

                <div style={{gridColumn: 'span 2'}}>
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows="3"
                    required
                  />
                </div>
              </div>

              <div className="form-actions" style={{marginTop: '20px'}}>
                <button type="submit" className="btn">
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button type="button" onClick={resetForm} className="btn secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="products-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '20px'
        }}>
          {products.map(product => (
            <div key={product.id} className="product-card" style={{
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              overflow: 'hidden'
            }}>
              <img
                src={product.image}
                alt={product.name}
                style={{width: '100%', height: '200px', objectFit: 'cover'}}
              />
              <div style={{padding: '15px'}}>
                <h3 style={{margin: '0 0 10px 0'}}>{product.name}</h3>
                <p style={{color: '#666', margin: '0 0 10px 0'}}>{product.description}</p>
                <p style={{fontWeight: 'bold', color: '#007bff', margin: '0 0 10px 0'}}>
                  Rp {product.price.toLocaleString()}
                </p>
                <p style={{margin: '0 0 15px 0'}}>Stock: {product.stock}</p>
                <div style={{display: 'flex', gap: '10px'}}>
                  <button
                    onClick={() => handleEdit(product)}
                    className="btn secondary"
                    style={{flex: 1, padding: '8px'}}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="btn"
                    style={{flex: 1, padding: '8px', background: '#dc3545'}}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}