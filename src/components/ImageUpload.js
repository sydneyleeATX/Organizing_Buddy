/**
 * @file ImageUpload.js
 * @description A reusable image upload component with preview functionality
 * 
 * Features:
 * - File selection with preview
 * - Image validation (accepts only image files)
 * - Preview display with dimensions limit
 * - Upload handling (currently demo, can be extended for actual server upload)
 */

'use client';
import React, { useState } from 'react';

/**
 * Reusable image upload component with preview functionality
 * @returns {JSX.Element} The image upload component with preview
 */
export default function ImageUploader() {
  // State to store the image preview URL
  const [imagePreview, setImagePreview] = useState(null);
  // State to store the actual file object
  const [imageFile, setImageFile] = useState(null);

  /**
   * Handles file selection change
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event
   */
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Store the file and create a preview URL
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      // Clear both states if no file is selected
      setImageFile(null);
      setImagePreview(null);
    }
  };

  /**
   * Handles the upload action
   * @todo Implement actual file upload to server
   */
  const handleUpload = () => {
    if (imageFile) {
      // In a real app, you'd send 'imageFile' to a server (e.g., using FormData)
      console.log('Uploading file:', imageFile.name, imageFile);
      // Example implementation:
      // const formData = new FormData();
      // formData.append('image', imageFile);
      // fetch('/api/upload', { method: 'POST', body: formData });
      alert('File ready to upload! Check console.');
    } else {
      alert('Please select an image first.');
    }
  };

  return (
    <div className="image-uploader">
      <h3 style={styles.title}>Upload Photo from Gallery</h3>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageChange} 
        style={styles.input}
      />
      
      {imagePreview && (
        <div style={styles.previewContainer}>
          <img 
            src={imagePreview} 
            alt="Preview" 
            style={styles.previewImage}
          />
          <p style={styles.fileName}>{imageFile.name}</p>
          <button 
            onClick={handleUpload} 
            style={styles.uploadButton}
          >
            Confirm Upload
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  title: {
    marginBottom: '10px'
  },
  input: {
    marginBottom: '10px'
  },
  previewContainer: {
    marginTop: '10px'
  },
  previewImage: {
    maxWidth: '200px',
    maxHeight: '200px',
    borderRadius: '8px'
  },
  fileName: {
    marginBottom: '10px'
  },
  uploadButton: {
    marginTop: '10px',
    padding: '8px 16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
}
