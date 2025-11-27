// src/features/profile/hooks/useProfile.ts
"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useFileUpload } from '@/lib/hooks/useFileUpload';

// Define a type for the user state for better type safety
interface UserProfile {
    full_name: string;
    phone_number: string;
    institution_id: string;
    major_id: string;
    position: string;
    avatar: string | null;
}

export function useProfile() {
    const router = useRouter();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");

    // State for dropdown options
    const [institutions, setInstitutions] = useState([]);
    const [majors, setMajors] = useState([]);

    // Re-use the file upload hook for the avatar
    const { uploads: avatarUploads, handleFileChange: handleAvatarChange, resetUpload } = useFileUpload();
    const avatarUploadState = avatarUploads['avatar'] || { file: null, progress: 0, uploadedId: null, error: null };

    // Effect to fetch all initial data
    useEffect(() => {
        const fetchInitialData = async () => {
            setIsLoading(true);
            try {
                const [userResponse, institutionsResponse, majorsResponse] = await Promise.all([
                    fetch('/api/profile'),
                    fetch('/api/institutions'),
                    fetch('/api/majors'),
                ]);

                if (!userResponse.ok) throw new Error("Gagal memuat data profil.");

                const [userData, institutionsData, majorsData] = await Promise.all([
                    userResponse.json(),
                    institutionsResponse.json(),
                    majorsResponse.json(),
                ]);

                setUser(userData.data);
                setInstitutions(institutionsData);
                setMajors(majorsData);
            } catch (error: any) {
                setSubmitError("Gagal memuat data: " + error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    // Handler for standard input changes
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setUser(prev => (prev ? { ...prev, [name]: value } : null));
    };

    // Handler for avatar file selection, using the useFileUpload hook's handler
    const handleFileChange = (inputName: string, file: File) => {
        // The upload URL should ideally come from a config or env variable
        const uploadUrl = 'http://localhost:8000/api/v1/profile/upload-file';
        handleAvatarChange(inputName, file, uploadUrl, 'user/profile');
    };

    // Form submission handler
    const updateProfile = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!user) return;

        setIsSubmitting(true);
        setSubmitError("");

        const formData = new FormData();
        formData.append('full_name', user.full_name);
        formData.append('institution_id', user.institution_id);
        formData.append('major_id', user.major_id);
        formData.append('position', user.position);

        // Use the uploadedId from the file upload hook's state
        if (avatarUploadState.uploadedId) {
            formData.append('avatar', 'user/profile/' + avatarUploadState.uploadedId);
        }

        try {
            const response = await fetch('/api/profile/update', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                // Instead of reloading, we can just refresh the router for a smoother experience
                router.refresh(); 
                // Optionally show a success message here
            } else {
                const error = await response.json();
                setSubmitError(error.message || "Gagal memperbarui profil.");
            }
        } catch (error: any) {
            setSubmitError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        user,
        isLoading,
        isSubmitting,
        submitError,
        institutions,
        majors,
        avatarUploadState,
        handleInputChange,
        handleFileChange,
        resetUpload,
        updateProfile,
    };
}
