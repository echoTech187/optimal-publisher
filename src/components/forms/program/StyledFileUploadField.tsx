"use client";
import { useState } from "react";
import FileUpload from "./FileUpload";
import { m } from "framer-motion";
import StyledFileInput from "./StyledFileInput";

const StyledFileUploadField = ({ field, error, onChange }: any) => {
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

                xhr.addEventListener('error', (e) => {
                    console.log(e);
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
        uploadFileToServer(file, field.upload_url, (progress: any) => {
            setUploads(prev => ({ ...prev, [inputName]: { ...prev[inputName as keyof typeof prev], file: file, progress } }));
        })
            .then(fileId => {
                setUploads(prev => ({ ...prev, [inputName]: { ...prev[inputName as keyof typeof prev], file: file, uploadedId: fileId, progress: 100 } }));
                if (onChange) {
                    onChange(fileId);
                }
            })
            .catch(err => {
                console.error(`Error uploading ${inputName}:`, err.message);
                setUploads(prev => ({ ...prev, [inputName]: { ...prev[inputName as keyof typeof prev], file: file, error: err.message || "Upload failed. Please try again." } }));
            });
    };
    return (
        <>
            <div className="col-span-full mb-4 max-md:col-span-2 md:col-span-2">
                <StyledFileInput
                    label={field.label ? field.label : "Unggah File Naskah Anda"}
                    description={field.description ? field.description : "Format file yang diterima: .docx. Ukuran maksimal 10MB."}
                    required
                    accepted={field.accepted_file_types}
                    maxFileSize={field.max_file_size * 1024 * 1024}
                    inputName={field.name}
                    uploadState={uploads.manuscript}
                    onFileChange={handleFileChange}
                    onReset={resetUpload}
                />
                {/* {error && <p className="text-red-500 text-sm mt-1">{error}</p>} */}
            </div>
        </>
    );
};

export default StyledFileUploadField;