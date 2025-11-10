
import React from 'react';
import StyledFileInput from './StyledFileInput';

const FileUpload = ({ name, uploadState, onFileChange, onReset, error }: { name: string; uploadState: any; onFileChange: (arg0: string, arg1: File) => void; onReset: (arg0: string) => void; error?: string; }) => (
    <div className="col-span-full mb-4 max-md:col-span-2 md:col-span-2">
        <StyledFileInput
            label="Upload File Full Naskah Buku"
            description="File Harus Microsoft Word Format (.docx) dengan Ukuran Maksimal 10MB"
            required
            inputName={name}
            uploadState={uploadState}
            onFileChange={onFileChange}
            onReset={onReset}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
);

export default FileUpload;
