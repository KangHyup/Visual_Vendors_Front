import React from 'react';
import { LinearProgress, Box, Typography } from '@mui/material';

const ProgressBar = ({ progress }) => {
    if (!progress || progress.status === 'idle') {
        return null; // 로딩 중이 아닐 때 ProgressBar 숨김
    }

    const { current_frame, total_frames } = progress;

    // 진행률 계산
    const percentage = total_frames
        ? Math.round((current_frame / total_frames) * 100)
        : 0;

    return (
        <Box sx={{ width: '100%', mt: 4 }}>
            <Typography variant="body1" sx={{ mb: 1, color: '#90caf9' }}>
                처리 진행률: {percentage}% ({current_frame}/{total_frames} 프레임)
            </Typography>
            <LinearProgress
                variant="determinate"
                value={percentage}
                sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: '#e3f2fd',
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: '#1e88e5',
                    },
                }}
            />
        </Box>
    );
};

export default ProgressBar;
