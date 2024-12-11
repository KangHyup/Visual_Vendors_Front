'use client';

import DragAndDropUploader from '../components/DragAndDropUploader';
import { uploadVideo } from '../utils/uploadVideo';
import ProgressBar from '../components/ProgressBar';
import { useProgress } from '../hooks/useProgress';

export default function Home() {
    const progress = useProgress();

    const handleFileUpload = async (file) => {
        try {
            await uploadVideo(file, ['Head', 'Torso', 'Upper_Legs'], 10);
            alert('비디오 업로드가 성공적으로 완료되었습니다!');
        } catch (error) {
            alert(`비디오 업로드에 실패했습니다: ${error.message}`);
        }
    };

    return (
        <main>
            <DragAndDropUploader onFileUpload={handleFileUpload} />
            <ProgressBar progress={progress} />
        </main>
    );
}
