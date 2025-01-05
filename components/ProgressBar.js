// components/ProgressBar.js

import React, { useEffect } from 'react';
import { LinearProgress, Typography, Box, Stack } from '@mui/material';

const ProgressBar = ({ progress }) => {
    const { status, current_frame, total_frames, output } = progress;
    const percentage = total_frames > 0 ? (current_frame / total_frames) * 100 : 0;

    // 처리 완료 시 자동 다운로드 시작
    useEffect(() => {
        if (status === 'completed' && output) {
            window.location.href = `http://localhost:8080/download/${output}`;
        }
    }, [status, output]);

    return (
        <Box sx={{ width: '100%', mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Stack spacing={2} alignItems="center">
                {status === 'processing' && (
                    <>
                        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                            Processing... {current_frame} of {total_frames} frames
                        </Typography>
                        <Box sx={{ width: '60%' }}>
                            <LinearProgress variant="determinate" value={percentage} />
                        </Box>
                    </>
                )}
                {status === 'completed' && (
                    <Typography variant="h6" sx={{ color: 'text.primary' }}>
                        Processing Complete! Starting download...
                    </Typography>
                )}
                {status === 'idle' && (
                    <Typography variant="h6" sx={{ color: 'text.disabled' }}>
                        Idle (No video processing)
                    </Typography>
                )}
                {status === 'error' && (
                    <Typography variant="h6" sx={{ color: 'error.main' }}>
                        Error: {progress.error}
                    </Typography>
                )}
            </Stack>
        </Box>
    );
};

export default ProgressBar;
