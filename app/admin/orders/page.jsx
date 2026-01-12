'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  // useEffect(() => {
  //   // Check if user is admin
  //   const currentUser = JSON.parse(localStorage.getItem('andre_user_current') || 'null');
  //   if (!currentUser || currentUser.role !== 'admin') {
  //     router.push('/login');
  //     return;
  //   }

  //   loadOrders();
  // }, [router]);

  const loadOrders = () => {
    const storedOrders = JSON.parse(localStorage.getItem('andre_orders') || '[]');
    setOrders(storedOrders);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? {...order, status: newStatus} : order
    );
    localStorage.setItem('andre_orders', JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ffc107';
      case 'processing': return '#17a2b8';
      case 'shipped': return '#007bff';
      case 'delivered': return '#28a745';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  return (
    <div className="container">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
        <h1>Order Management</h1>
        <Link href="/admin">
          <a className="btn secondary">Back to Dashboard</a>
        </Link>
      </div>

        <div className="orders-list">
          {orders.length === 0 ? (
            <div style={{textAlign: 'center', padding: '50px 0'}}>
              <p>No orders found.</p>
            </div>
          ) : (
            orders.map(order => (
              <div key={order.id} className="order-card" style={{
                background: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                marginBottom: '20px',
                padding: '20px'
              }}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px'}}>
                  <h3>Order #{order.id}</h3>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    background: getStatusColor(order.status),
                    color: 'white'
                  }}>
                    {order.status}
                  </span>
                </div>

                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '15px'}}>
                  <div>
                    <strong>Customer:</strong> {order.customerName}
                  </div>
                  <div>
                    <strong>Email:</strong> {order.customerEmail}
                  </div>
                  <div>
                    <strong>Phone:</strong> {order.customerPhone}
                  </div>
                  <div>
                    <strong>Date:</strong> {new Date(order.date).toLocaleDateString()}
                  </div>
                </div>

                <div style={{marginBottom: '15px'}}>
                  <strong>Shipping Address:</strong><br />
                  {order.shippingAddress}
                </div>

                <div style={{marginBottom: '15px'}}>
                  <strong>Items:</strong>
                  <div style={{marginTop: '10px'}}>
                    {order.items.map((item, index) => (
                      <div key={index} style={{display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #eee'}}>
                        <span>{item.name} (x{item.qty})</span>
                        <span>Rp {(item.price * item.qty).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div>
                    <strong>Total: Rp {order.total}</strong>
                  </div>
                  <div>
                    <label htmlFor={"status-" + order.id} style={{marginRight: '10px'}}>Update Status:</label>
                    <select
                      id={"status-" + order.id}
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      style={{padding: '5px', borderRadius: '4px', border: '1px solid #ccc'}}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
    </div>
  );
}