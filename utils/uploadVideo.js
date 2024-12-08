export const uploadVideo = async (file, parts, rate) => {
    const maxSizeInBytes = 500 * 1024 * 1024; // 500MB
    const allowedExtensions = ['.mp4', '.avi', '.mov', '.mkv'];

    // 1. 파일 확장자 검증
    const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
        throw new Error('다음과 같은 형식의 파일만 넣어주쇼 (.mp4, .avi, .mov, .mkv).');
    }

    // 2. 파일 크기 검증
    if (file.size > maxSizeInBytes) {
        throw new Error('파일이 너무 커요 500MB이하만 넣어 주세요');
    }

    // 3. 서버에 파일 전송
    const formData = new FormData();
    formData.append('file', file);
    formData.append('parts', parts.join(','));
    formData.append('rate', rate);

    try {
        const response = await fetch('/api/process-video', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const contentType = response.headers.get('content-type');
            
            if (contentType && contentType.includes('application/json')) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to process video');
        }   else {
                throw new Error('Server returned an unexpected response');
        }
        }

        return await response.json();
    } catch (err) {
        throw new Error(`Error uploading video: ${err.message}`);
    }
};
