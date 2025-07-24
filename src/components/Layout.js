// src/components/Layout.js
'use client'; // if using the App Router

import React from 'react';
import { useRouter } from 'next/router'; // or 'next/navigation' if using App Router
import styles from './Layout.module.css';
import TimelineButton from './TimelineButton';
//import FabButton from './FabButton';

const Layout = ({ children, fabActions = [], showTimeline = false, currentStep = null }) => {
  const router = useRouter();

  const handleMenuClick = () => {
    router.push('/menu');
  };

  return (
    <div style={{ minHeight: '100vh', padding: '1rem', position: 'relative' }}>
      <div className={styles.headerButtons}>
        <button className={styles['menu-button']} onClick={handleMenuClick}>
          Menu
        </button>
        {showTimeline && (
          <TimelineButton currentStep={currentStep} style={{ marginLeft: '8px' }} />
        )}
      </div>
      {children}
      {/*<FabButton actions={fabActions} />*/}
    </div>
  );
};

export default Layout;
