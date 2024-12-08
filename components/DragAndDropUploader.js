'use client';

import React, { useState } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

const DragAndDropUploader = ({ onFileUpload }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);

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
            onFileUpload(file); // 부모 컴포넌트에 파일 전달
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadedFile(file);
            onFileUpload(file); // 부모 컴포넌트에 파일 전달
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
                    <input type="file" hidden onChange={handleFileUpload} />
                </Button>
                {uploadedFile && (
                    <Typography variant="body2" sx={{ mt: 2, color: '#1e88e5' }}>
                        업로드된 파일: {uploadedFile.name}
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default DragAndDropUploader;
