import React, { useState } from "react";
// Dropdown component for storage tips
// Input: this function is called in storage tips, every tip is a dropdown
const Dropdown = ({ label, items }) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={styles.dropdown}>
      <button
        style={styles.dropbtn}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <span style={{
          display: 'inline-block',
          marginRight: 12,
          transition: 'transform 0.2s',
          fontSize: '1.1em',
          verticalAlign: 'middle',
        }}>
          {open ? '▼' : '▶'}
        </span>
        {label}
      </button>
      {open && (
        <div style={styles.dropdownContent}>
          {items.map((item, idx) => (

            // each item is a div with the item text
            <div key={idx} style={styles.dropdownItem}>{item}</div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  dropdown: {
    position: 'relative',
    display: 'inline-block',
    marginBottom: '1em',
    width: '100%',
  },
  dropbtn: {
    backgroundColor: '#f8f9fa',
    color: '#333',
    padding: '12px 20px',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '6px',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
    marginBottom: '0.25em',
    outline: 'none',
  },
  dropdownContent: {
    display: 'block',
    position: 'absolute',
    backgroundColor: '#b2e0eb',
    minWidth: '220px',
    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.1)',
    zIndex: 1,
    border: '1px solid #eee',
    borderRadius: '6px',
    padding: '0.5em 0',
    marginTop: '2px',
    width: '100%',
    color: '#333',
  },
  dropdownItem: {
    padding: '8px 20px',
    cursor: 'pointer',
    fontSize: '0.97rem',
    color: '#333',
    borderBottom: '1px solid #f0f0f0',
    background: 'none',
  },
};

export default Dropdown;
