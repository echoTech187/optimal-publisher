// src/lib/hooks/useFileUpload.test.ts
import { renderHook, act } from '@testing-library/react';
import { useFileUpload } from './useFileUpload';

// Mock the fileService to avoid actual network calls in tests
jest.mock('../services/fileService', () => ({
    uploadFile: jest.fn().mockResolvedValue('mock-file-id-123'),
}));

describe('useFileUpload', () => {
    it('should initialize with an empty uploads object', () => {
        const { result } = renderHook(() => useFileUpload());
        expect(result.current.uploads).toEqual({});
    });

    it('should handle file change and update the uploads state', async () => {
        const { result } = renderHook(() => useFileUpload());
        const mockFile = new File(['dummy'], 'test.png', { type: 'image/png' });
        const inputName = 'profile_picture';
        const uploadUrl = '/api/upload';
        const relativePath = 'profiles';

        // Use await when acting on async operations
        await act(async () => {
            result.current.handleFileChange(inputName, mockFile, uploadUrl, relativePath);
        });

        // Check the state after the async operation has completed
        expect(result.current.uploads[inputName]).toBeDefined();
        expect(result.current.uploads[inputName].file).toBe(mockFile);
        expect(result.current.uploads[inputName].progress).toBe(100);
        expect(result.current.uploads[inputName].uploadedId).toBe('mock-file-id-123');
        expect(result.current.uploads[inputName].error).toBeNull();
    });

    it('should reset a specific upload state', async () => {
        const mockOnChange = jest.fn();
        const { result } = renderHook(() => useFileUpload(mockOnChange));
        const mockFile = new File(['dummy'], 'test.png', { type: 'image/png' });
        const inputName = 'profile_picture';

        // First, add a file
        await act(async () => {
            result.current.handleFileChange(inputName, mockFile, '/api/upload', 'profiles');
        });

        // Verify it was added
        expect(result.current.uploads[inputName].uploadedId).toBe('mock-file-id-123');

        // Now, reset the upload
        act(() => {
            result.current.resetUpload(inputName);
        });

        expect(result.current.uploads[inputName].file).toBeNull();
        expect(result.current.uploads[inputName].progress).toBe(0);
        expect(result.current.uploads[inputName].uploadedId).toBeNull();
        expect(result.current.uploads[inputName].error).toBeNull();
        
        // Check if the onChange callback was called with null on reset
        expect(mockOnChange).toHaveBeenLastCalledWith(null, inputName);
    });
});