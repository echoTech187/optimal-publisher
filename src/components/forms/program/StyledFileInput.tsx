
import React from 'react';
import { Icon } from '@iconify/react';

const StyledFileInput = ({ label, description, accepted, required, uploadState, onFileChange, inputName, onReset }: { label: string; description: string; accepted?: string; required: boolean; uploadState: any; onFileChange: (arg0: string, arg1: File) => void; inputName: string; onReset: (arg0: string) => void; }) => {
    const { file, progress, uploadedId, error } = uploadState;

    const handleFileSelect = (event: any) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            onFileChange(inputName, selectedFile);
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <p className="text-xs text-gray-500 mb-2">{description}</p>
            
            {error ? (
                <div className="w-full bg-red-100 border border-red-200 text-red-800 rounded-lg py-3 px-4 flex items-center justify-between">
                    <span className="font-semibold truncate">{file?.name || 'Upload failed'}</span>
                    <button type="button" onClick={() => onReset(inputName)} className="text-red-600 hover:text-red-800">
                        <Icon icon="ion:close-circle" className="text-2xl" />
                    </button>
                </div>
            ) : uploadedId ? (
                <div className="w-full bg-green-100 border border-green-200 text-green-800 rounded-lg py-3 px-4 flex items-center justify-between">
                    <span className="font-semibold truncate">{file.name}</span>
                    <Icon icon="ion:checkmark-circle" className="text-2xl" />
                </div>
            ) : file ? (
                <div className="w-full bg-gray-100 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm truncate">{file.name}</span>
                        <span className="text-sm text-gray-600">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            ) : (
                <div className="w-full bg-white border border-gray-200 rounded-lg py-2 px-4 flex items-center justify-between">
                    <label htmlFor={inputName} className="cursor-pointer text-gray-700 text-sm py-1 rounded-lg flex items-center">
                        <Icon icon="ion:attach" className="size-6 mr-2" /><span className='mt-1 font-semibold'>{label}</span> 
                    </label>
                    <span className="text-sm text-gray-500 ml-2 truncate">
                        {file ? file.name : 'Tidak ada file yang dipilih'}
                    </span>
                    <input id={inputName} type="file" className="hidden" onChange={handleFileSelect} accept={accepted || ''} />
                </div>
            )}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default StyledFileInput;
