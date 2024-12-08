//비디오 처리 로직
import { sendProgress } from "../pages/api/progress";

export const processVideo = async (file, parts, rate) => {
try {
    // 비디오 처리 로직 (예: ffmpeg 등 사용)
    let progress = 0;
    const totalFrames = 100; // 예제 값

    for (let currentFrame = 0; currentFrame <= totalFrames; currentFrame++) {
    progress = Math.round((currentFrame / totalFrames) * 100);
    sendProgress({ status: "processing", progress });
    await new Promise((resolve) => setTimeout(resolve, 100)); // 가짜 딜레이
    }

    sendProgress({ status: "completed", progress: 100 });
} catch (err) {
    throw new Error("Error during video processing.");
}
};
