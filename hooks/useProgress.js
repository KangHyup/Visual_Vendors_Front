//엔드포인트와 연결하여 서버에서 실시간 데이터를 스트리밍을 받음
// hooks/useProgress.js

import { useEffect, useState } from "react";

export const useProgress = (isProcessing) => {
    const [progress, setProgress] = useState({
        status: "idle",
        current_frame: 0,
        total_frames: 0,
        output: null,
    });

    useEffect(() => {
        if (!isProcessing) return;

        const eventSource = new EventSource("http://localhost:8080/progress");

        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                setProgress(data);
                console.log("서버로부터 받은 데이터:", data);
            } catch (error) {
                console.error("Error parsing progress data:", error);
            }
        };

        eventSource.onerror = (err) => {
            console.error("Error receiving progress updates.", err);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, [isProcessing]);

    return progress;
};


