// src/components/forms/generic/GenericFileUpload.tsx
'use client';

import React, { useState } from 'react';
import { Icon } from '@iconify/react';

interface GenericFileUploadProps {
    field: {
        name: string;
        accept?: string;
    };
    onFileChange: (fieldName: string, fileId: string) => void;
    error?: string | null;
}

const GenericFileUpload: React.FC<GenericFileUploadProps> = ({ field, onFileChange, error }) => {
    const [progress, setProgress] = useState(0);
    const [fileName, setFileName] = useState('');

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            setProgress(0);
            // This is a fake progress bar for UI purposes.
            // In a real app, this would be driven by the actual upload progress.
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        // In a real app, the fileId would come from the server response.
                        onFileChange(field.name, `uploaded_${file.name}`);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 200);
        }
    };

    return (
        <div className={`p-4 border-2 border-dashed rounded-lg text-center ${error ? 'border-red-500' : 'border-gray-300'}`}>
            <label htmlFor={field.name} className="cursor-pointer">
                <Icon icon="ion:cloud-upload-outline" className="mx-auto text-4xl text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Klik untuk mengunggah atau tarik file ke sini</p>
                <p className="text-xs text-gray-500">{field.accept}</p>
            </label>
            <input id={field.name} name={field.name} type="file" accept={field.accept} onChange={handleFileSelect} className="hidden" />
            {fileName && (
                <div className="mt-2 text-left">
                    <p className="text-sm text-gray-600">{fileName}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            )}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default GenericFileUpload;
