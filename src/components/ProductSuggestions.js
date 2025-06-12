import React, { useState } from "react";

const ProductSuggestions = ({ open, onClose }) => {
  const [form, setForm] = useState({ color: '', material: '', containerType: '', brand: '' });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  if (!open) return null;

  const handleChange = (e) => {
    // update the form state with the new value
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults(null);
    setError(null);
    try {
      // send a POST request to the API endpoint
      const res = await fetch('/api/scrapingdog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          color: form.color,
          material: form.material,
          containerType: form.containerType,
          brand: form.brand
        })
      });
      // if the response is not ok, throw an error
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      // set the results state to the data
      setResults(data);
    } catch (err) {
      setError('Failed to fetch product suggestions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={inlineStyles.overlay}>
      <div style={inlineStyles.modal}>
        <button style={inlineStyles.closeButton} onClick={onClose}>&times;</button>
        <h2>Product Suggestions</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* handle the user input */}
          <input   
            name="color"
            placeholder="Color"
            value={form.color}
            onChange={handleChange}
            style={inlineStyles.input}
          />
          <input
            name="material"
            placeholder="Material"
            value={form.material}
            onChange={handleChange}
            style={inlineStyles.input}
          />
          <input
            name="containerType"
            placeholder="Container Type"
            value={form.containerType}
            onChange={handleChange}
            style={inlineStyles.input}
          />
          <input
            name="brand"
            placeholder="Brand (optional)"
            value={form.brand}
            onChange={handleChange}
            style={inlineStyles.input}
          />
          <input
            name="keyword"
            placeholder="Keywords (optional)"
            value={form.keyword}
            onChange={handleChange}
            style={inlineStyles.input}
          />
          <button type="submit" style={inlineStyles.submitButton} disabled={loading}>
            {loading ? 'Searching...' : 'Submit'}
          </button>
        </form>
        {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
        {/* Support both array and products field from API */}
        {(() => {
          const products = Array.isArray(results?.shopping_results)
            ? results.shopping_results
            : Array.isArray(results)
              ? results
              : Array.isArray(results?.products)
                ? results.products
                : [];

          if (products.length > 0) {
            return (
              <div style={inlineStyles.resultsContainer}>
                {products.slice(0, 5).map((product, idx) => (
                  <div key={idx} style={inlineStyles.resultCard}>
                    <img src={product.product_img || product.img || product.image || product.thumbnail} alt={product.product_title || product.title} style={inlineStyles.resultImg} />
                    <div>
                      <a href={product.product_link || product.link} target="_blank" rel="noopener noreferrer" style={inlineStyles.resultLink}>
                        {product.product_title || product.title}
                      </a>
                      <div style={inlineStyles.resultPrice}>
                        {product.product_price || product.price || product.extracted_price || 'No price listed'}
                        {/* Show seller/source */}
                        {product.source && (
                          <span style={{ marginLeft: 12, color: '#888', fontStyle: 'italic' }}>
                            {product.source}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          } else if (results) {
            return <div style={{ marginTop: '1rem', color: 'gray' }}>No products found.</div>;
          } else {
            return null;
          }
        })()}

      </div>
    </div>
  );
};

export default ProductSuggestions;

const inlineStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000
  },
  modal: {
    background: 'white',
    borderRadius: '12px',
    padding: '2rem',
    minWidth: '340px',
    maxWidth: '90vw',
    boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
    position: 'relative',
    textAlign: 'left',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'transparent',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#888',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    width: '100%',
  },
  submitButton: {
    padding: '0.75rem',
    borderRadius: '6px',
    border: 'none',
    background: '#007bff',
    color: 'white',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '0.5rem',
  },
  resultsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1rem',
  },
  resultCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    borderRadius: '6px',
    border: '1px solid #ddd',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  resultImg: {
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    borderRadius: '6px',
  },
  resultLink: {
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  resultPrice: {
    color: '#666',
    fontSize: '0.875rem',
  },
};
