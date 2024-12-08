import multer from "multer";
import nextConnect from "next-connect";
import path from "path";
import fs from "fs";

// Multer 설정
const upload = multer({ dest: "uploads/" });

// Handler 설정
const apiRoute = nextConnect({
onError: (err, req, res) => {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
},
onNoMatch: (req, res) => {
    res.status(404).json({ error: "API route not found" });
},
});

// Multer 미들웨어 추가
apiRoute.use(upload.single("file"));

apiRoute.post((req, res) => {
try {
    const file = req.file;
    const { parts, rate } = req.body;

    // 파일 검증
    const allowedExtensions = [".mp4", ".avi", ".mov", ".mkv"];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    const maxSizeInBytes = 500 * 1024 * 1024; // 500MB

    if (!allowedExtensions.includes(fileExtension)) {
    return res.status(400).json({ error: "Invalid file format." });
    }

    if (file.size > maxSizeInBytes) {
    return res.status(400).json({ error: "File size exceeds 500MB." });
    }

    // 비디오 처리 로직 삽입 (예제 코드, 실제 처리는 비동기 함수로 구현 가능)
    const outputPath = path.join("outputs", `processed_${file.originalname}`);
    fs.copyFileSync(file.path, outputPath); // 처리 완료된 비디오를 임시로 복사

    // 응답
    res.status(200).json({
    message: "Video processed successfully!",
    output: `/outputs/processed_${file.originalname}`,
    });
} catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process video." });
}
});

export default apiRoute;

export const config = {
api: {
    bodyParser: false, // Multer 사용 시 bodyParser 비활성화 필요
},
};
