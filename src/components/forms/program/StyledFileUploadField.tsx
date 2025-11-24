"use client";
import { useState } from "react";
import FileUpload from "./FileUpload";
const uploadFileToServer = async (file: string | Blob, url: string | undefined, onProgress: { (progress: any): void; (arg0: number): void; }) => {
    const formData = new FormData();
    formData.append('file', file); // 'file' must match the name your backend expects

    try {
        return await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.upload.addEventListener('progress', (event) => {
                if (event.lengthComputable) {
                    const percentCompleted = Math.round((event.loaded * 100) / event.total);
                    onProgress(percentCompleted);
                }
            });

            xhr.addEventListener('load', () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const response = JSON.parse(xhr.responseText);
                    resolve(response.fileId); // Assumes backend returns { fileId: '...' }
                } else {
                    try {
                        const errorResponse = JSON.parse(xhr.responseText);
                        reject(new Error(errorResponse.message || 'Failed to upload file.'));
                    } catch (e) {
                        reject(new Error('An unknown error occurred during upload.'));
                    }
                }
            });

            xhr.addEventListener('error', () => {
                reject(new Error('A network or server error occurred.'));
            });

            // IMPORTANT: Replace with your actual backend endpoint URL
            xhr.open('POST', url || '');

            // If you use authentication, set the header here
            // xhr.setRequestHeader('Authorization', `Bearer ${yourAuthToken}`);

            xhr.send(formData);
        });

    } catch (error) {
        console.error('Upload error:', error);
        throw error; // Re-throw the error to be caught by handleFileChange
    }
};
const StyledFileUploadField = ({ field, error }: any) => {
    const [uploads, setUploads] = useState({
            manuscript: { file: null, progress: 0, uploadedId: null, error: null },
        });
     const resetUpload = (inputName: any) => {
        setUploads(prev => ({
            ...prev,
            [inputName]: { file: null, progress: 0, uploadedId: null, error: null }
        }));
    };

    const handleFileChange = (inputName: string, file: File) => {
        setUploads(prev => ({ ...prev, [inputName]: { file, progress: 0, uploadedId: null, error: null } }));

        uploadFileToServer(file,field.upload_url, (progress: any) => {
            setUploads(prev => ({ ...prev, [inputName]: { ...prev[inputName as keyof typeof prev], file: file, progress } }));
        })
            .then(fileId => {
                setUploads(prev => ({ ...prev, [inputName]: { ...prev[inputName as keyof typeof prev], file: file, uploadedId: fileId, progress: 100 } }));
            })
            .catch(err => {
                console.error(`Error uploading ${inputName}:`, err.message);
                setUploads(prev => ({ ...prev, [inputName]: { ...prev[inputName as keyof typeof prev], file: file, error: err.message || "Upload failed. Please try again." } }));
            });
    };
    return (
        <FileUpload name={field.name} label={field.label} description={field.description} accept={field.accept} uploadState={uploads.manuscript} onFileChange={handleFileChange} onReset={resetUpload} error={error} /> 
    )
};

export default StyledFileUploadField;