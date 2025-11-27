
import { useState } from 'react';
import { uploadFile } from '../services/fileService';

export interface UploadState {
  file: File | null;
  progress: number;
  uploadedId: string | null;
  error: string | null;
}

export interface AllUploadsState {
  [key: string]: UploadState;
}

export const useFileUpload = (onChange?: (fileId: string | null, inputName: string) => void) => {
  const [uploads, setUploads] = useState<AllUploadsState>({});

  const handleFileChange = (
    inputName: string,
    file: File,
    uploadUrl: string,
    relativePath: string
  ) => {
    // Initialize state for the new upload
    setUploads(prev => ({
      ...prev,
      [inputName]: { file, progress: 0, uploadedId: null, error: null }
    }));

    uploadFile(file, uploadUrl, relativePath, (progress) => {
      setUploads(prev => ({
        ...prev,
        [inputName]: { ...prev[inputName], file, progress }
      }));
    })
      .then(fileId => {
        setUploads(prev => ({
          ...prev,
          [inputName]: { ...prev[inputName], file, uploadedId: fileId, progress: 100, error: null }
        }));
        if (onChange) {
          onChange(fileId, inputName);
        }
      })
      .catch(err => {
        const errorMessage = err instanceof Error ? err.message : "File gagal diunggah.";
        console.error(`Error uploading ${inputName}:`, errorMessage);
        setUploads(prev => ({
          ...prev,
          [inputName]: { ...prev[inputName], file, error: errorMessage }
        }));
        if (onChange) {
          onChange(null, inputName);
        }
      });
  };

  const resetUpload = (inputName: string) => {
    setUploads(prev => ({
      ...prev,
      [inputName]: { file: null, progress: 0, uploadedId: null, error: null }
    }));
    if (onChange) {
        onChange(null, inputName);
    }
  };

  return { uploads, handleFileChange, resetUpload };
};
