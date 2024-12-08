//파일 유효성검사
import path from "path";

export const validateFile = (file) => {
const allowedExtensions = [".mp4", ".avi", ".mov", ".mkv"];
const maxSizeInBytes = 500 * 1024 * 1024; // 500MB

const fileExtension = path.extname(file.originalname).toLowerCase();

if (!allowedExtensions.includes(fileExtension)) {
    throw new Error("Invalid file format.");
}

if (file.size > maxSizeInBytes) {
    throw new Error("File size exceeds the 500MB limit.");
}
};
