import React from "react";
import { LinearProgress, Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled } from '@mui/material/styles';

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
height: 10,
borderRadius: 5,
backgroundColor: theme.palette.grey[300],
'& .MuiLinearProgress-bar': {
    borderRadius: 5,
    backgroundColor: theme.palette.primary.main,
},
}));

const ProgressBar = ({ progress }) => {
    const { status, current_frame, total_frames } = progress;
    const percentage = total_frames > 0 ? (current_frame / total_frames) * 100 : 0;

    let content;
    if (status === "processing") {
        content = (
            <Stack spacing={2} sx={{ width: '100%', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ color: "text.secondary" }}>
                    Processing... {current_frame} of {total_frames} frames
                </Typography>
                <Box sx={{ width: '60%' }}>
                    <StyledLinearProgress variant="determinate" value={percentage} />
                </Box>
            </Stack>
        );
    } else if (status === "completed") {
        content = (
            <Stack spacing={2} sx={{ width: '100%', alignItems: 'center' }}>
                <CheckCircleIcon color="success" style={{ fontSize: 48 }} />
                <Typography variant="h6" sx={{ color: "text.primary" }}>
                    Processing Complete!
                </Typography>
            </Stack>
        );
    } else {
        content = (
            <Stack spacing={2} sx={{ width: '100%', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ color: "text.disabled" }}>
                    Idle (No video processing)
                </Typography>
                <Box sx={{ width: '60%' }}>
                    {/* Idle 상태에서는 바를 표시하지 않고 회색 바탕만 깔아둘 수도 있음 */}
                    <StyledLinearProgress variant="determinate" value={0} />
                </Box>
            </Stack>
        );
    }

    return (
        <Box sx={{ width: "100%", mt: 4, display: "flex", justifyContent: "center" }}>
            {content}
        </Box>
    );
};

export default ProgressBar;
