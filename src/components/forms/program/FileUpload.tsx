
import React from 'react';
import StyledFileInput from './StyledFileInput';

const FileUpload = ({ name, label,description,accept, uploadState, onFileChange, onReset, error }: { name: string; label?: string; description?: string; accept?: string; uploadState: any; onFileChange: (arg0: string, arg1: File) => void; onReset: (arg0: string) => void; error?: string; }) => (
    <div className="col-span-full mb-4 max-md:col-span-2 md:col-span-2">
        <StyledFileInput
            label={label ? label : "Unggah File Naskah Anda"}
            description={description ? description : "Format file yang diterima: .docx. Ukuran maksimal 10MB."}
            required
            accepted={accept}
            inputName={name}
            uploadState={uploadState}
            onFileChange={onFileChange}
            onReset={onReset}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
);

export default FileUpload;
