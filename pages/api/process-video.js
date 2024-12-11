import multer from "multer";
import { validateFile } from "../../utils/fileValidation";
import { processVideo } from "../../utils/videoProcessor";

// Multer 설정
const upload = multer({ dest: "uploads/" });

export const config = {
  api: {
    bodyParser: false, // Multer 사용 시 필요
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Multer를 직접 사용하여 파일 업로드 처리
    upload.single("file")(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "File upload failed." });
      }

      try {
        const file = req.file;
        const { parts, rate } = req.body;

        // 파일 유효성 검사
        validateFile(file);

        // 비디오 처리 호출
        await processVideo(file, parts, rate);

        return res.status(200).json({ message: "Video processing started successfully." });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message || "Failed to process video" });
      }
    });
  } else {
    // 잘못된 HTTP 메서드 처리
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
