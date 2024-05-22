import { Button } from '@mui/material';
import React, { useState, ChangeEvent } from 'react';
import styles from './ImageUploader.module.scss';

interface UploaderProps {
  PreviewURL: any;
  setImage: (image: { image_file: any; preview_URL: any }) => void;
}
function ImageUploader({ PreviewURL, setImage }: UploaderProps) {
  let inputRef: any;

  const saveImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setImage({
        image_file: e.target.files ? e.target.files[0] : null,
        preview_URL: fileReader.result,
      });
    };
  };

  return (
    <div className={styles['uploader-wrapper']}>
      <input
        type="file"
        accept="image/*"
        onChange={saveImage}
        ref={(refParam: any) => {
          inputRef = refParam;
        }}
        style={{ display: 'none' }}
      />
      <div className="img-wrapper">
        <img src={PreviewURL} alt="Preview" />
      </div>
      <div className="upload-button">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => inputRef.click()}
        >
          😎사진 고르기😎
        </Button>
      </div>
    </div>
  );
}

export default ImageUploader;
