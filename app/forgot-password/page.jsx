'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Simple validation
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    // In a real application, you would send a request to your backend
    // For now, we'll simulate the forgot password functionality
    try {
      // Check if user exists in localStorage
      const users = JSON.parse(localStorage.getItem('andre_users') || '[]');
      const user = users.find(u => u.email === email);

      if (user) {
        // Simulate sending reset email
        setMessage('Password reset link has been sent to your email address. Please check your inbox.');
      } else {
        setError('No account found with this email address');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Navbar />

      <div className="form-page">
        <div className="form-card">
          <h2>Forgot Password</h2>
          <p style={{marginBottom: '20px', color: '#666'}}>
            Enter your email address and we'll send you a link to reset your password.
          </p>

          {error && <p style={{color: '#dc3545', marginBottom: '10px'}}>{error}</p>}
          {message && <p style={{color: '#28a745', marginBottom: '10px'}}>{message}</p>}

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email address"
            />

            <div className="form-actions">
              <button type="submit" className="btn">Send Reset Link</button>
              <Link href="/login" className="link">Back to Login</Link>
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