
export const uploadFile = async (
  file: File,
  url: string,
  relativePath: string,
  onProgress: (progress: number) => void
): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file); // 'file' must match the name your backend expects
  formData.append('relative_path', relativePath);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const percentCompleted = Math.round((event.loaded * 100) / event.total);
        onProgress(percentCompleted);
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve(response.fileId); // Assumes backend returns { fileId: '...' }
        } catch (e) {
          reject(new Error('Gagal memproses respons dari server.'));
        }
      } else {
        try {
          const errorResponse = JSON.parse(xhr.responseText);
          reject(new Error(errorResponse.message || 'File gagal diunggah.'));
        } catch (e) {
          reject(new Error('Terjadi kesalahan saat mengunggah file. Silakan coba lagi.'));
        }
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('File gagal diunggah karena masalah jaringan. Silakan coba lagi.'));
    });

    // IMPORTANT: Replace with your actual backend endpoint URL
    xhr.open('POST', url || '');

    // If you use authentication, set the header here
    // xhr.setRequestHeader('Authorization', `Bearer ${yourAuthToken}`);

    xhr.send(formData);
  });
};
