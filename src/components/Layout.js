// src/components/Layout.js
'use client'; // if using the App Router

import React from 'react';
import { useRouter } from 'next/router'; // or 'next/navigation' if using App Router
import styles from './Layout.module.css';
//import FabButton from './FabButton';

const Layout = ({ children, fabActions = [] }) => {
  const router = useRouter();

  const handleMenuClick = () => {
    router.push('/menu');
  };

  return (
    <div style={{ minHeight: '100vh', padding: '1rem', position: 'relative' }}>
      <button className={styles['menu-button']} onClick={handleMenuClick}>
        Menu
      </button>
      {children}
      {/*<FabButton actions={fabActions} />*/}
    </div>
  );
};

export default Layout;
