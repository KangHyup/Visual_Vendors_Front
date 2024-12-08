import React from "react";
import { LinearProgress, Typography, Box } from "@mui/material";

const ProgressBar = ({ progress }) => {
    const { status, current_frame, total_frames } = progress;

    if (status === "idle") return null;
    if (status === "complete") {
        return <Typography variant="h6" color="green">Processing complete!</Typography>;
    }
    if (status === "error") {
        return <Typography variant="h6" color="red">Processing failed!</Typography>;
    }

    const progressPercentage = (current_frame / total_frames) * 100;

    return (
        <Box sx={{ width: "100%", mt: 2 }}>
            <Typography variant="h6">Processing: {Math.round(progressPercentage)}%</Typography>
            <LinearProgress variant="determinate" value={progressPercentage} />
        </Box>
    );
};

export default ProgressBar;
