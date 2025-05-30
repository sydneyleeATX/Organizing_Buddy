'use client';
import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';

export default function CelebrationPage() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [width, height] = useWindowSize(); // gets current window dimensions

  useEffect(() => {
    // Automatically stop confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ textAlign: 'center', paddingTop: '5rem' }}>
      {showConfetti && <Confetti width={width} height={height} />}
    </div>
  );
}
