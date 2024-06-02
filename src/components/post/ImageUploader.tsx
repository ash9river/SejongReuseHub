import { Button } from '@mui/material';
import React, { useState, ChangeEvent, useCallback, useEffect } from 'react';
import styles from './ImageUploader.module.scss';

interface UploaderProps {
  // PreviewURL: any;
  setImage: (image: { image_file: any; preview_URL: any }) => void;
}
// 사진 미리보기 삭제해서 previewURL없음
function ImageUploader({ setImage }: UploaderProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string>('');
  let inputRef: any;

  const saveImage = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const file = e.target.files?.[0];
      if (!file) {
        alert('파일이 없습니다.');
        return;
      }

      const fileReader = new FileReader();

      setImage({
        image_file: e.target.files ? e.target.files[0] : null,
        preview_URL: file,
      });
    },
    [fileName],
  );

  function getDisplayFileName(name: string) {
    if (name.length > 15) {
      return `${name.substring(0, 10)}...`;
    }
  }

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
      <div className={styles['img-wrapper']}>
        {/* <img src={PreviewURL} alt="Preview" /> */}
      </div>
      <div className={styles['upload-button']}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => inputRef.click()}
        >
          사진 고르기
        </Button>
      </div>
      {fileName && (
        <div className={styles['file-name']}>
          {getDisplayFileName(fileName)}
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
