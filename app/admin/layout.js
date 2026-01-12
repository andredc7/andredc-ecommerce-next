'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser, logout } from '../../lib/auth';

export default function AdminLayout({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user || user.role !== 'admin') {
      router.push('/login');
      return;
    }
    setCurrentUser(user);
  }, [router]);

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    window.location.href = '/login';
  };

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/products', label: 'Products', icon: '📦' },
    { href: '/admin/orders', label: 'Orders', icon: '📋' },
    { href: '/admin/users', label: 'Users', icon: '👥' },
  ];

  if (!currentUser) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <html lang="en">
      <body>
        <div className="admin-layout">
          {/* Sidebar */}
          <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
              <Link href="/admin" className="brand">
                andre<span>dc</span> Admin
              </Link>
              <button
                className="sidebar-close"
                onClick={() => setSidebarOpen(false)}
              >
                ✕
              </button>
            </div>
            <nav className="sidebar-nav">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`sidebar-link ${pathname === item.href ? 'active' : ''}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="icon">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="sidebar-footer">
              <Link href="/" className="sidebar-link">
                <span className="icon">🏪</span>
                Back to Store
              </Link>
              <button onClick={handleLogout} className="sidebar-link logout">
                <span className="icon">🚪</span>
                Logout
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="admin-main">
            <header className="admin-header">
              <button
                className="sidebar-toggle"
                onClick={() => setSidebarOpen(true)}
              >
                ☰
              </button>
              <div className="header-info">
                <span>Welcome, {currentUser.name}</span>
              </div>
            </header>
            <main className="admin-content">
              {children}
            </main>
          </div>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div
              className="sidebar-overlay"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </div>

        <style jsx>{`
          .admin-layout {
            display: flex;
            min-height: 100vh;
          }

          .admin-sidebar {
            width: 250px;
            background: #2c3e50;
            color: white;
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            z-index: 1000;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }

          .admin-sidebar.open {
            transform: translateX(0);
          }

          @media (min-width: 768px) {
            .admin-sidebar {
              position: static;
              transform: none;
            }
          }

          .sidebar-header {
            padding: 20px;
            border-bottom: 1px solid #34495e;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .brand {
            color: white;
            text-decoration: none;
            font-size: 1.2rem;
            font-weight: bold;
          }

          .brand span {
            color: #3498db;
          }

          .sidebar-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            display: block;
          }

          @media (min-width: 768px) {
            .sidebar-close {
              display: none;
            }
          }

          .sidebar-nav {
            padding: 20px 0;
          }

          .sidebar-link {
            display: flex;
            align-items: center;
            padding: 12px 20px;
            color: #bdc3c7;
            text-decoration: none;
            transition: all 0.3s ease;
          }

          .sidebar-link:hover,
          .sidebar-link.active {
            background: #34495e;
            color: white;
          }

          .sidebar-link .icon {
            margin-right: 10px;
            font-size: 1.2rem;
          }

          .sidebar-footer {
            position: absolute;
            bottom: 0;
            width: 100%;
            border-top: 1px solid #34495e;
          }

          .sidebar-link.logout {
            border: none;
            background: none;
            cursor: pointer;
            width: 100%;
            text-align: left;
          }

          .admin-main {
            flex: 1;
            display: flex;
            flex-direction: column;
          }

          .admin-header {
            background: white;
            padding: 15px 20px;
            border-bottom: 1px solid #ecf0f1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }

          .sidebar-toggle {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 5px;
          }

          @media (min-width: 768px) {
            .sidebar-toggle {
              display: none;
            }
          }

          .header-info {
            font-weight: 500;
          }

          .admin-content {
            flex: 1;
            padding: 20px;
            background: #f8f9fa;
            min-height: calc(100vh - 70px);
          }

          .sidebar-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 999;
            display: block;
          }

          @media (min-width: 768px) {
            .sidebar-overlay {
              display: none;
            }
          }

          .loading {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-size: 1.2rem;
          }
        `}</style>
      </body>
    </html>
  );
}