
import React from 'react';
import { Icon } from '@iconify/react';

const FileUpload = ({name}: {name: string}) => (
    <div className="col-span-full mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="receipted">Upload File Full Naskah Buku</label>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
                <Icon icon="tabler:photo" className="w-12 h-12 text-gray-400 mx-auto" />
                <div className="mt-4 flex justify-center text-sm/6 text-gray-600">
                    <label htmlFor={name} className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600 hover:text-indigo-500">
                        <span>Upload a file</span>
                        <input id={name} type="file" name={name} className="sr-only" accept=".docx" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs/5 text-gray-600">File Harus Microsoft Word Format (.docx) dengan Ukuran Maksimal 10MB</p>
            </div>
        </div>
    </div>
);

export default FileUpload;
