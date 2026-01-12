'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0
  });
  const router = useRouter();

  useEffect(() => {
    // Check if user is admin
    const currentUser = JSON.parse(localStorage.getItem('andre_user_current') || 'null');
    if (!currentUser || currentUser.role !== 'admin') {
      router.push('/login');
      return;
    }

    // Load stats
    loadStats();
  }, [router]);

  const loadStats = () => {
    const users = JSON.parse(localStorage.getItem('andre_users') || '[]');
    const products = JSON.parse(localStorage.getItem('andre_products') || '[]');
    const orders = JSON.parse(localStorage.getItem('andre_orders') || '[]');

    setStats({
      totalUsers: users.length,
      totalProducts: products.length,
      totalOrders: orders.length,
      totalRevenue: orders.reduce((sum, order) => sum + order.total, 0)
    });
  };

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
        <h1>Admin Dashboard</h1>
        <div>
          <Link href="/admin/products">
            <a className="btn" style={{marginRight: '10px'}}>Manage Products</a>
          </Link>
          <Link href="/admin/users">
            <a className="btn" style={{marginRight: '10px'}}>Manage Users</a>
          </Link>
          <Link href="/admin/orders">
            <a className="btn">Manage Orders</a>
          </Link>
        </div>
      </div>

        <div className="stats-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div className="stat-card" style={{
            background: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{margin: '0 0 10px 0', color: '#333'}}>Total Users</h3>
            <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#007bff', margin: '0'}}>{stats.totalUsers}</p>
          </div>

          <div className="stat-card" style={{
            background: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{margin: '0 0 10px 0', color: '#333'}}>Total Products</h3>
            <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#28a745', margin: '0'}}>{stats.totalProducts}</p>
          </div>

          <div className="stat-card" style={{
            background: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{margin: '0 0 10px 0', color: '#333'}}>Total Orders</h3>
            <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#ffc107', margin: '0'}}>{stats.totalOrders}</p>
          </div>

          <div className="stat-card" style={{
            background: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{margin: '0 0 10px 0', color: '#333'}}>Total Revenue</h3>
            <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#dc3545', margin: '0'}}>Rp {stats.totalRevenue}</p>
          </div>
        </div>

        <div className="admin-actions" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '20px'
        }}>
          <div className="action-card" style={{
            background: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h3>Product Management</h3>
            <p>Manage your product catalog, add new items, update prices, and handle inventory.</p>
            <Link href="/admin/products">
              <a className="btn" style={{marginTop: '10px'}}>Go to Products</a>
            </Link>
          </div>

          <div className="action-card" style={{
            background: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h3>User Management</h3>
            <p>View and manage user accounts, roles, and permissions.</p>
            <Link href="/admin/users">
              <a className="btn" style={{marginTop: '10px'}}>Go to Users</a>
            </Link>
          </div>

          <div className="action-card" style={{
            background: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h3>Order Management</h3>
            <p>Process orders, update order status, and handle customer inquiries.</p>
            <Link href="/admin/orders">
              <a className="btn" style={{marginTop: '10px'}}>Go to Orders</a>
            </Link>
          </div>
        </div>
    </div>
  );
}