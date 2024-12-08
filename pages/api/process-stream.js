let progressData = { status: "idle", current_frame: 0, total_frames: 0 };

// 가상 진행률 업데이트 함수
function simulateProgress() {
progressData = { status: "processing", current_frame: 0, total_frames: 100 };

const interval = setInterval(() => {
    if (progressData.current_frame >= progressData.total_frames) {
    progressData.status = "completed";
    clearInterval(interval);
    } else {
    progressData.current_frame += 1;
    }
}, 1000);
}

simulateProgress();

export default function handler(req, res) {
if (req.method === "GET") {
    res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    });

    const interval = setInterval(() => {
    res.write(`data: ${JSON.stringify(progressData)}\n\n`);
    }, 1000);

    req.on("close", () => {
    clearInterval(interval);
    });
} else {
    res.status(405).json({ error: "Method not allowed" });
}
}
