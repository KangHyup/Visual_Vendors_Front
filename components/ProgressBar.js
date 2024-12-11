import React from "react";
import { LinearProgress, Typography, Box } from "@mui/material";

const ProgressBar = ({ progress }) => {
    const { status, current_frame, total_frames } = progress;
    const percentage = total_frames > 0 ? (current_frame / total_frames) * 100 : 0;

    return (
        <Box sx={{ width: "100%", mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                {status === "processing"
                    ? `Processing... ${current_frame} of ${total_frames} frames`
                    : status === "completed"
                    ? "Processing complete!"
                    : "Idle"}
            </Typography>
            {status === "processing" && (
                <LinearProgress variant="determinate" value={percentage} />
            )}
        </Box>
    );
};

export default ProgressBar;
