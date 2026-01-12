'use client';

import { useEffect } from 'react';

export default function Seed() {
  useEffect(() => {
    // Run seed on client-side
    if (typeof window !== 'undefined') {
      const usersKey = 'andre_users';

      if (!localStorage.getItem(usersKey)) {
        const demoUsers = [
          {
            id: 1,
            name: "Admin User",
            email: "admin@example.com",
            password: "admin123",
            role: "admin",
            createdAt: new Date().toISOString()
          },
          {
            id: 2,
            name: "Andre Dwi",
            email: "andre@example.com",
            password: "andre123",
            role: "user",
            createdAt: new Date().toISOString()
          },
          {
            id: 3,
            name: "Budi Santoso",
            email: "budi@example.com",
            password: "budi123",
            role: "user",
            createdAt: new Date().toISOString()
          },
          {
            id: 4,
            name: "Citra Lestari",
            email: "citra@example.com",
            password: "citra123",
            role: "user",
            createdAt: new Date().toISOString()
          }
        ];

        localStorage.setItem(usersKey, JSON.stringify(demoUsers));
        console.log('Demo users seeded successfully!');
      }
    }
  }, []);

  return null; // This component doesn't render anything
}