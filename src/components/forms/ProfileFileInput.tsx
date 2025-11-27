// src/components/forms/ProfileFileInput.tsx
"use client";

import { Icon } from '@iconify/react';
import React from 'react';

interface ProfileFileInputProps {
    label: string;
    description: string;
    required: boolean;
    uploadState: {
        file: File | null;
        progress: number;
        uploadedId: string | null;
        error: string | null;
    };
    onFileChange: (inputName: string, file: File) => void;
    inputName: string;
    onReset: (inputName: string) => void;
    avatar: string | null;
}

const ProfileFileInput: React.FC<ProfileFileInputProps> = ({ label, description, required, uploadState, onFileChange, inputName, onReset, avatar }) => {
    const { file, progress, uploadedId, error } = uploadState;

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            onFileChange(inputName, selectedFile);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="relative">
                <img src={file ? URL.createObjectURL(file) : (avatar || '/images/placeholder.png')} alt="Avatar" className="w-32 h-32 rounded-full object-cover" />
                <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700">
                    <Icon icon="ic:round-edit" className="w-6 h-6" />
                </label>
                <input id="avatar-upload" type="file" className="hidden" onChange={handleFileSelect} accept="image/*" />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            {file && !uploadedId && !error && (
                <div className="w-full bg-gray-100 border border-gray-200 rounded-lg p-4 mt-4">
                    <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm truncate">{file.name}</span>
                        <span className="text-sm text-gray-600">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            )}
            {uploadedId && (
                <div className="fixed top-12 right-6 w-fit bg-green-100 border border-green-200 text-green-800 rounded-lg py-3 px-4 flex items-center justify-between gap-4 mt-4">
                    <span className="font-semibold truncate">Foto berhasil diupload</span>
                    <Icon icon="ion:checkmark-circle" className="text-2xl" />
                </div>
            )}
        </div>
    );
};

export default ProfileFileInput;
