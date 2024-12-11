import React, { useEffect } from 'react';
import { LinearProgress, Typography, Box, Stack } from '@mui/material';

const ProgressBar = ({ progress }) => {
    const { status, current_frame, total_frames, output_file } = progress;
    const percentage = total_frames > 0 ? (current_frame / total_frames) * 100 : 0;

    // 처리 완료 시 자동 다운로드 시작
    useEffect(() => {
        if (status === 'completed' && output_file) {
            // 자동으로 다운로드 링크로 이동하여 다운로드 시작
            window.location.href = `http://localhost:8080/download/${output_file}`;
        }
    }, [status, output_file]);

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
            </Stack>
        </Box>
    );
};

export default ProgressBar;
