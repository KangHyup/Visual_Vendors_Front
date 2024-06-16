'use client'

import React, { useState } from 'react';
import { Container, Box, Button, Typography } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

export default function InputBox() { 
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        const file = event.dataTransfer.files[0];
        console.log('File uploaded:', file);
        // 여기서 파일 업로드 로직을 추가할 수 있습니다.
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        console.log('File uploaded:', file);
    };

return (
    <Container maxWidth="md">
    <Box
        sx={{
        mt: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#e3f2fd',
        p: 4,
        borderRadius: 1,
        border: '2px dashed #90caf9',
        transition: 'background-color 0.3s',
        backgroundColor: isDragging ? '#bbdefb' : '#e3f2fd',
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
    </Box>
    </Container>
);
}
