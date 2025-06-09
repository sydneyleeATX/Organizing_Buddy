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
export default function ImageUploader({ onImageConfirmed }) {
  // State to store the image preview URL
  const [imagePreview, setImagePreview] = useState(null);
  // State to store the actual file object
  const [imageFile, setImageFile] = useState(null);
  // State to track if upload is confirmed
  const [isUploadConfirmed, setIsUploadConfirmed] = useState(false);

  /**
   * Handles file selection change
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event
   */
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Preview the image as a data URL
        if (onImageConfirmed) {
          onImageConfirmed(reader.result); // Pass the data URL to parent
        }
      };
      reader.readAsDataURL(file);
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
      // Store the file and confirm the upload
      console.log('File stored:', imageFile.name);
      setIsUploadConfirmed(true);
      if (onImageConfirmed) {
        onImageConfirmed(imageFile);
      }
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
          />  {/* show file name only if file selected*/}
          {imageFile && <p style={styles.fileName}>{imageFile.name}</p>}
          {!isUploadConfirmed && (
            <button 
              onClick={handleUpload} 
              style={styles.uploadButton}
            >
              Upload Photo
            </button>
          )}
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
