//파일 업로드를 처리하고, videoProcessor를 호출하여 비디오를 처리
import nextConnect from "next-connect";
import multer from "multer";
import { validateFile } from "../../utils/fileValidation";
import { processVideo } from "../../utils/videoProcessor";

const upload = multer({ dest: "uploads/" });

const apiRoute = nextConnect();

apiRoute.use(upload.single("file"));

apiRoute.post(async (req, res) => {
  try {
    const file = req.file;
    const { parts, rate } = req.body;

    // 파일 유효성 검사
    validateFile(file);

    // 비디오 처리
    await processVideo(file, parts, rate);

    res.status(200).json({ message: "Video processing started successfully." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Multer 사용 시 필요
  },
};
