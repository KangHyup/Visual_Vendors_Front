'use client'
import React, { useState } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

const DragAndDropUploader = ({ onFileUpload }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

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
            onFileUpload(file).catch((error) => {
                setErrorMessage(error.message);
            });
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadedFile(file);
            onFileUpload(file).catch((error) => {
                setErrorMessage(error.message);
            });
        }
    };

    const handleCloseError = () => {
        setErrorMessage(null);
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
                    <input type="file" hidden onChange={handleFileUpload} />
                </Button>
                {uploadedFile && (
                    <Typography variant="body2" sx={{ mt: 2, color: '#1e88e5' }}>
                        업로드된 파일: {uploadedFile.name}
                    </Typography>
                )}
            </Box>

            {/* 에러 메시지 팝업 */}
            {errorMessage && (
                <Box
                    sx={{
                        mt: 2,
                        p: 2,
                        backgroundColor: '#ffcdd2',
                        color: '#b71c1c',
                        border: '1px solid #f44336',
                        borderRadius: 1,
                    }}
                >
                    <Typography variant="body2">{errorMessage}</Typography>
                    <Button
                        onClick={handleCloseError}
                        variant="text"
                        sx={{ color: '#b71c1c', mt: 1 }}
                    >
                        닫기
                    </Button>
                </Box>
            )}
        </Container>
    );
};

export default DragAndDropUploader;
