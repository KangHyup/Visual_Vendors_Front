import fs from 'fs';
import path from 'path';
import { PassThrough } from 'stream';

let progressData = { status: "idle", current_frame: 0, total_frames: 0 };

// Progress streaming endpoint
export const progressStream = (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const stream = new PassThrough();
    stream.pipe(res);

    const interval = setInterval(() => {
        stream.write(`data: ${JSON.stringify(progressData)}\n\n`);
    }, 1000);

    req.on("close", () => {
        clearInterval(interval);
        stream.end();
    });
};

// Simulate video processing and update progressData
export const processVideo = async (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    try {
        const totalFrames = 100; // Example: Replace with actual total frames
        progressData = { status: "processing", current_frame: 0, total_frames: totalFrames };

        for (let i = 1; i <= totalFrames; i++) {
            await new Promise((resolve) => setTimeout(resolve, 100)); // Simulated frame processing
            progressData.current_frame = i;
        }

        progressData.status = "complete";
        res.status(200).json({ message: "Video processing completed" });
    } catch (error) {
        progressData.status = "error";
        res.status(500).json({ error: "Video processing failed" });
    }
};
