"use client";
import StyledFileInput from "./StyledFileInput";
import { useFileUpload } from "@/lib/hooks/useFileUpload";
import { FormField } from "@/types/program";

// Define a more specific type for the props
interface StyledFileUploadFieldProps {
    field: FormField;
    error?: string;
    onChange: (fileId: string | null) => void;
}

const StyledFileUploadField = ({ field, error, onChange }: StyledFileUploadFieldProps) => {
    // All logic and state are now encapsulated in the hook
    const { uploads, handleFileChange, resetUpload } = useFileUpload((fileId) => {
        if (onChange) {
            onChange(fileId);
        }
    });

    // Wrapper function to pass the necessary parameters from the 'field' prop
    const onFileChange = (inputName: string, file: File) => {
        if (field.upload_url && field.relative_path) {
            handleFileChange(inputName, file, field.upload_url, field.relative_path);
        } else {
            console.error("Error: 'upload_url' or 'relative_path' is not defined in the field prop.");
        }
    };

    return (
        <div className="col-span-full max-md:col-span-2 md:col-span-2">
            <StyledFileInput
                label={field.label || "Unggah File Naskah Anda"}
                description={field.file_description || "Format file yang diterima: .docx. Ukuran maksimal 10MB."}
                required={field.required_frontend}
                accepted={field.accepted_file_types} // Assuming rules contain accepted file types
                maxFileSize={field.max_file_size && field.max_file_size * 1024 * 1024} // Assuming max_file_size is in MB, let's make it more robust later
                inputName={field.name}
                uploadState={uploads[field.name] || { file: null, progress: 0, uploadedId: null, error: null }}
                onFileChange={onFileChange}
                onReset={resetUpload}
            />
            {/* {error && <p className="text-red-500 text-sm mt-1">{error}</p>} */}
        </div>
    );
};

export default StyledFileUploadField;