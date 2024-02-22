import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { mockApiCall, saveImagesToLocalStorage, getImagesFromLocalStorage } from '../utils/mockApi';

const ImageUpload = ({ setImages }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (event) => {
    if (event.target.files) {
      setIsUploading(true);
      const filesArray = Array.from(event.target.files);

      const allFilesAreImages = filesArray.every((file) =>
        file.type.startsWith('image/')
      );

      if (!allFilesAreImages) {
        alert('Only image files are allowed.');
        setIsUploading(false);
        return;
      }

      const reader = new FileReader();
      const newImages = [];

      reader.onload = async (e) => {
        const imageData = e.target.result;
        newImages.push({
          id: Date.now(), // Use a unique identifier
          name: filesArray[0].name, // Assuming only one file is selected
          data: imageData, // Store image data as Base64 string
        });

        await mockApiCall(newImages);

        const currentImages = getImagesFromLocalStorage();
        const updatedImages = [...currentImages, ...newImages];
        saveImagesToLocalStorage(updatedImages);
        setImages(updatedImages);

        setIsUploading(false);
      };

      reader.readAsDataURL(filesArray[0]); // Read the first selected file as Base64
    }
  };

  return (
    <div>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={handleFileSelect}
        disabled={isUploading}
      />
      <label htmlFor="raised-button-file">
        <Button variant="contained" component="span" disabled={isUploading}>
          {isUploading ? <CircularProgress size={24} /> : 'Upload'}
        </Button>
      </label>
    </div>
  );
};

export default ImageUpload;
