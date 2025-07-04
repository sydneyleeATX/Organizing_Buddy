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
        // Create an image to resize/compress
        const img = new window.Image();
        img.onload = () => {
          // Resize logic
          const MAX_DIM = 800;
          let { width, height } = img;
          if (width > MAX_DIM || height > MAX_DIM) {
            if (width > height) {
              height = Math.round(height * (MAX_DIM / width));
              width = MAX_DIM;
            } else {
              width = Math.round(width * (MAX_DIM / height));
              height = MAX_DIM;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          // Compress to JPEG at 0.8 quality
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          setImagePreview(dataUrl);
          // Do not notify parent yet; wait for Upload Photo button click
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    } else {
      // Clear both states if no file is selected      setImageFile(null);
      setImagePreview(null);
    }
  };

  /**
   * Handles the upload action
   * @todo Implement actual file upload to server
   */
  const handleUpload = () => {
    if (imageFile && imagePreview) {
      // Store the file and confirm the upload
      console.log('File stored:', imageFile.name);
      setIsUploadConfirmed(true);
      if (onImageConfirmed) {
        onImageConfirmed(imagePreview); // Pass the preview dataUrl to parent
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
