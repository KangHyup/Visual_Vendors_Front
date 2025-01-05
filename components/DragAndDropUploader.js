// components/DragAndDropUploader.js

import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { useProgress } from '../hooks/useProgress';
import ProgressBar from '../components/ProgressBar';

const DragAndDropUploader = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const progress = useProgress(isProcessing);

    // 진행 상태가 완료되거나 에러가 발생하면 isProcessing을 false로 설정
    useEffect(() => {
        if (progress.status === 'completed' || progress.status === 'error') {
            setIsProcessing(false);
        }
    }, [progress.status]);

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);

        const file = event.dataTransfer.files[0];
        if (file) {
            setUploadedFile(file);
            handleFileUpload(file);
        }
    };

    const handleFileUpload = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('parts', 'Head,Torso,Upper_Legs');
            formData.append('rate', '10');

            const response = await fetch('http://localhost:8080/process-video', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                alert('비디오 업로드가 성공적으로 완료되었습니다!');
                setIsProcessing(true); // POST 요청 성공 후 진행 상태 시작
            } else {
                alert(`비디오 업로드에 실패했습니다: ${data.error}`);
            }
        } catch (error) {
            alert(`비디오 업로드에 실패했습니다: ${error.message}`);
        }
    };

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    mt: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: isDragging ? '#bbdefb' : '#e3f2fd',
                    p: 4,
                    borderRadius: 1,
                    border: '2px dashed #90caf9',
                    transition: 'background-color 0.3s',
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <CloudUpload sx={{ fontSize: 80, color: '#90caf9' }} />
                <Typography variant="h6" sx={{ mt: 2, mb: 2, color: '#90caf9' }}>
                    비디오 파일을 드래그 앤 드롭 하세요
                </Typography>
                <Button
                    variant="contained"
                    component="label"
                    sx={{ backgroundColor: '#1e88e5', color: '#ffffff' }}
                >
                    파일 업로드
                    <input type="file" hidden onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            setUploadedFile(file);
                            handleFileUpload(file);
                        }
                    }} />
                </Button>
                {uploadedFile && (
                    <Typography variant="body2" sx={{ mt: 2, color: '#1e88e5' }}>
                        업로드된 파일: {uploadedFile.name}
                    </Typography>
                )}
                {isProcessing && (
                    <ProgressBar progress={progress} />
                )}
            </Box>
        </Container>
    );
};

export default DragAndDropUploader;
