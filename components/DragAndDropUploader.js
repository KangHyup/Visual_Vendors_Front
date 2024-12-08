import multer from 'multer';
import nextConnect from 'next-connect';
import path from 'path';
import fs from 'fs';

// Multer 설정
const upload = multer({ dest: 'uploads/' });

// 비디오 처리 함수
const processVideo = (file, parts, rate) => {
// 비디오 처리 로직 구현
// 예: ffmpeg를 사용하여 비디오 변환 등
// 처리 진행률 업데이트 로직 포함
};

// API 핸들러 설정
const apiRoute = nextConnect({
onError: (err, req, res) => {
    console.error(err);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
},
onNoMatch: (req, res) => {
    res.status(404).json({ error: 'API 라우트를 찾을 수 없습니다.' });
},
});

// Multer 미들웨어 추가
apiRoute.use(upload.single('file'));

// POST 요청 처리
apiRoute.post((req, res) => {
const file = req.file;
const { parts, rate } = req.body;

// 파일 유효성 검사
const allowedExtensions = ['.mp4', '.avi', '.mov', '.mkv'];
const fileExtension = path.extname(file.originalname).toLowerCase();
const maxSizeInBytes = 500 * 1024 * 1024; // 500MB

if (!allowedExtensions.includes(fileExtension)) {
    return res.status(400).json({ error: '잘못된 파일 형식입니다.' });
}

if (file.size > maxSizeInBytes) {
    return res.status(400).json({ error: '파일 크기가 500MB를 초과합니다.' });
}

// 비디오 처리
try {
    processVideo(file, parts, rate);
    res.status(200).json({ message: '비디오 처리가 완료되었습니다.' });
} catch (err) {
    console.error(err);
    res.status(500).json({ error: '비디오 처리 중 오류가 발생했습니다.' });
}
});

export default apiRoute;

export const config = {
api: {
    bodyParser: false, // Multer 사용 시 bodyParser 비활성화
},
};
