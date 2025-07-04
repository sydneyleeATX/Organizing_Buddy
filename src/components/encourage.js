/**
 * @file encourage.js
 * @description Component that displays encouraging messages to motivate users
 * 
 * This component provides positive reinforcement and motivational messages
 * throughout the organizing process.
 * 
 * Usage:
 * <EncouragementPopup
 *   messages={['message1', 'message2', 'message3']}
 *   interval={180000} // 3 minutes between messages
 *   duration={20000}  // 20 seconds message duration
 * />
 */

'use client';
import React, { useState, useEffect } from 'react';

/**
 * EncouragementPopup component
 * 
 * Displays random encouraging messages at regular intervals
 * 
 * @param {Object} props - Component props
 * @param {Array<string>} props.messages - Array of encouraging messages
 * @param {number} props.interval - Time between messages (default: 180000ms/3min)
 * @param {number} props.duration - Duration to show each message (default: 20000ms/20s)
 */
export default function EncouragementPopup({ messages, interval = 180000, duration = 20000 }) {
  // State variables
  const [visible, setVisible] = useState(false);  // Controls popup visibility
  const [message, setMessage] = useState('');     // Stores current message

  // Effect hook to handle message timing
  useEffect(() => {
    // Set up interval to show messages
    const intervalId = setInterval(() => {
      // Select random message and show popup
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      setMessage(randomMsg);
      setVisible(true);

      // setTimeout(...) schedules a one-time function to run after duration milliseconds.
      // In this case, it sets visible to false, which likely hides a popup.
      // timeoutId stores the ID returned by setTimeout so we can cancel it later.
      const timeoutId = setTimeout(() => setVisible(false), duration);

      // Cleanup timeout when component unmounts
      return () => clearTimeout(timeoutId);
    }, interval);

    // cancels the scheduled setTimeout using clearTimeout(timeoutId)
    return () => clearInterval(intervalId);
  }, [messages, interval, duration]);  // Dependencies for effect

  // Return null when popup is not visible
  if (!visible) return null;

  return (
    <div style={styles.popup}>
      {message}
    </div>
  );
}

/**
 * Styles for the popup component
 * 
 * Creates a floating, semi-transparent message box that appears in the center
 * of the screen with a green background and shadow effect.
 */
const styles = {
  popup: {
    // Positioning and layout
    position: 'fixed',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    // Visual styling
    backgroundColor: '#b2e0eb',  // light blue background
    color: 'white',              // White text
    padding: '1rem 2rem',
    borderRadius: '10px',
    fontSize: '1.2rem',
    boxShadow: '0 0 10px rgba(0,0,0,0.3)',  // Subtle shadow
    zIndex: 1000,              // Ensure it appears above other content
  },
};