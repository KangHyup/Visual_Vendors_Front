import multer from "multer";
import nextConnect from "next-connect";
import { validateFile } from "../../utils/fileValidation";
import { processVideo } from "../../utils/videoProcessor";

const upload = multer({ dest: "uploads/" });

const apiRoute = nextConnect({
  onError: (err, req, res) => {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  },
  onNoMatch: (req, res) => {
    res.status(405).json({ error: "Method Not Allowed" });
  },
});

// Multer 미들웨어 추가
apiRoute.use(upload.single("file"));

// POST 요청 처리
apiRoute.post(async (req, res) => {
  try {
    const file = req.file;
    const { parts, rate } = req.body;

    // 파일 유효성 검사
    validateFile(file);

    // 비디오 처리 호출
    await processVideo(file, parts, rate);

    res.status(200).json({ message: "Video processing started successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Failed to process video" });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Multer 사용 시 필요
  },
};
