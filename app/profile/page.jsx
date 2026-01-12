'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import { getCurrentUser, logout } from '../../lib/auth';

export default function Profile() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />

      <main className="container">
        <h2 className="section-title">Profile</h2>

        <div className="card" style={{maxWidth: '600px', margin: '0 auto'}}>
          <h3>Account Information</h3>

          <div style={{marginBottom: '20px'}}>
            <div style={{marginBottom: '15px'}}>
              <label style={{display: 'block', fontWeight: 'bold', marginBottom: '5px'}}>Name</label>
              <p>{user.name}</p>
            </div>

            <div style={{marginBottom: '15px'}}>
              <label style={{display: 'block', fontWeight: 'bold', marginBottom: '5px'}}>Email</label>
              <p>{user.email}</p>
            </div>

            <div style={{marginBottom: '15px'}}>
              <label style={{display: 'block', fontWeight: 'bold', marginBottom: '5px'}}>Member Since</label>
              <p>{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div style={{borderTop: '1px solid #eee', paddingTop: '20px'}}>
            <button onClick={handleLogout} className="btn" style={{background: '#dc3545'}}>
              Logout
            </button>
          </div>
        </div>
      </main>

      <footer className="footer">
        © 2025 andre-ecommerce
      </footer>
    </>
  );
}