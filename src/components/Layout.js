// src/components/Layout.js
'use client'; // if using the App Router

import React from 'react';
import { useRouter } from 'next/router'; // or 'next/navigation' if using App Router
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  const router = useRouter();

  const handleMenuClick = () => {
    router.push('/menu'); // Navigate to /menu
  };

  return (
    <div style={{ minHeight: '100vh', padding: '1rem', position: 'relative' }}>
      <button className={styles['menu-button']} onClick={handleMenuClick}>
        Menu
      </button>
      {children}
    </div>
  );
};

export default Layout;
