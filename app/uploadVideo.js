export const uploadVideo = async (file, parts, rate) => {
    const maxSizeInBytes = 500 * 1024 * 1024; // 500MB
    const allowedExtensions = ['.mp4', '.avi', '.mov', '.mkv'];

    // 1. 파일 확장자 검증
    const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
        throw new Error('Invalid file format. Please upload a video file (.mp4, .avi, .mov, .mkv).');
    }

    // 2. 파일 크기 검증
    if (file.size > maxSizeInBytes) {
        throw new Error('File size exceeds the 500MB limit. Please upload a smaller file.');
    }

    // 3. 서버에 파일 전송
    const formData = new FormData();
    formData.append('file', file);
    formData.append('parts', parts.join(','));
    formData.append('rate', rate);

    try {
        const response = await fetch('http://localhost:8080/process-video', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to process video');
        }

        return await response.json();
    } catch (err) {
        throw new Error(`Error uploading video: ${err.message}`);
    }
};
