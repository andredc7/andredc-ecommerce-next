'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { loginUser } from '../../lib/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await loginUser(email, password);
      router.push('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Navbar />

      <div className="form-page">
        <div className="form-card">
          <h2>Login</h2>
          {error && <p style={{color: '#dc3545', marginBottom: '10px'}}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="form-actions">
              <button type="submit" className="btn">Login</button>
              <div style={{marginTop: '10px'}}>
                <Link href="/forgot-password" className="link">Forgot Password?</Link>
              </div>
              <Link href="/register" className="link">Don't have an account? Register</Link>
            </div>
          </form>
        </div>
      </div>

      <footer className="footer">
        © 2025 andre-ecommerce
      </footer>
    </>
  );
}