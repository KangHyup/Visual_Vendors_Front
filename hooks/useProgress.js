//엔드포인트와 연결하여 서버에서 실시간 데이터를 스트리밍을 받음
import { useEffect, useState } from "react";

export const useProgress = () => {
    const [progress, setProgress] = useState({
        status: "idle",
        current_frame: 0,
        total_frames: 0,
    });

    useEffect(() => {
        // Flask 서버의 /progress 엔드포인트로 직접 연결
        const eventSource = new EventSource("http://localhost:8080/progress");

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setProgress(data);
            console.log("서버로부터 받은 데이터:", data);
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
