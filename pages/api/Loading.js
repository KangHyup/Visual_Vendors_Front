import { useEffect, useState } from "react";

export const useProgress = () => {
const [progress, setProgress] = useState({ status: "idle", current_frame: 0, total_frames: 0 });

useEffect(() => {
    const eventSource = new EventSource("/api/progress-stream");

    eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    setProgress(data);
    };

    eventSource.onerror = () => {
    console.error("Error receiving progress updates.");
    eventSource.close();
    };

    return () => {
    eventSource.close();
    };
}, []);

return progress;
};
