'use client';

import DragAndDropUploader from '../components/DragAndDropUploader';
import ProgressBar from '../components/ProgressBar';
import { uploadVideo } from '../utils/uploadVideo';
import { useProgress } from '../hooks/useProgress'; // 로딩 상태를 관리하는 커스텀 훅

export default function Home() {
    const progress = useProgress(); // 진행률 상태 가져오기

    const handleFileUpload = async (file) => {
        try {
            await uploadVideo(file, ['Head', 'Torso', 'Upper_Legs'], 10); // 업로드할 파일과 파라미터
            alert('비디오 업로드가 성공적으로 완료되었습니다!');
        } catch (error) {
            alert(`비디오 업로드에 실패했습니다: ${error.message}`);
        }
    };

    return (
        <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>비디오 업로드</h1>
            <DragAndDropUploader onFileUpload={handleFileUpload} />
            <ProgressBar progress={progress} />
        </main>
    );
}
