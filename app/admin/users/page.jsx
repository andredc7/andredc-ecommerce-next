'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user'
  });
  const router = useRouter();

  useEffect(() => {
    // Check if user is admin
    const currentUser = JSON.parse(localStorage.getItem('andre_user_current') || 'null');
    if (!currentUser || currentUser.role !== 'admin') {
      router.push('/login');
      return;
    }

    loadUsers();
  }, [router]);

  const loadUsers = () => {
    const storedUsers = JSON.parse(localStorage.getItem('andre_users') || '[]');
    setUsers(storedUsers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      id: editingUser ? editingUser.id : Date.now().toString(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      createdAt: editingUser ? editingUser.createdAt : new Date().toISOString()
    };

    let updatedUsers;
    if (editingUser) {
      updatedUsers = users.map(u => u.id === editingUser.id ? userData : u);
    } else {
      updatedUsers = [...users, userData];
    }

    localStorage.setItem('andre_users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    resetForm();
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role
    });
    setShowAddForm(true);
  };

  const handleDelete = (userId) => {
    if (confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter(u => u.id !== userId);
      localStorage.setItem('andre_users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      role: 'user'
    });
    setEditingUser(null);
    setShowAddForm(false);
  };

  return (
    <div className="container">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
        <h1>User Management</h1>
        <div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn"
            style={{marginRight: '10px'}}
          >
            {showAddForm ? 'Cancel' : 'Add User'}
          </button>
          <Link href="/admin">
            <a className="btn secondary">Back to Dashboard</a>
          </Link>
          </div>
        </div>

        {showAddForm && (
          <div className="form-card" style={{marginBottom: '30px'}}>
            <h2>{editingUser ? 'Edit User' : 'Add New User'}</h2>
            <form onSubmit={handleSubmit}>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
                <div>
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="role">Role</label>
                  <select
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    required
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              <div className="form-actions" style={{marginTop: '20px'}}>
                <button type="submit" className="btn">
                  {editingUser ? 'Update User' : 'Add User'}
                </button>
                <button type="button" onClick={resetForm} className="btn secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="users-table" style={{
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead style={{background: '#f8f9fa'}}>
              <tr>
                <th style={{padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6'}}>Name</th>
                <th style={{padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6'}}>Email</th>
                <th style={{padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6'}}>Role</th>
                <th style={{padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6'}}>Created At</th>
                <th style={{padding: '15px', textAlign: 'center', borderBottom: '1px solid #dee2e6'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} style={{borderBottom: '1px solid #dee2e6'}}>
                  <td style={{padding: '15px'}}>{user.name}</td>
                  <td style={{padding: '15px'}}>{user.email}</td>
                  <td style={{padding: '15px'}}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      background: user.role === 'admin' ? '#dc3545' : '#28a745',
                      color: 'white'
                    }}>
                      {user.role}
                    </span>
                  </td>
                  <td style={{padding: '15px'}}>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{padding: '15px', textAlign: 'center'}}>
                    <button
                      onClick={() => handleEdit(user)}
                      className="btn secondary"
                      style={{marginRight: '5px', padding: '6px 12px', fontSize: '12px'}}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="btn"
                      style={{padding: '6px 12px', fontSize: '12px', background: '#dc3545'}}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
}