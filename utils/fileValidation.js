export const validateFile = (file) => {
    if (!file) {
    throw new Error("No file uploaded");
    }

    const allowedExtensions = [".mp4", ".avi", ".mov", ".mkv"];
    const maxSizeInBytes = 500 * 1024 * 1024; // 500MB
    const fileExtension = file.originalname.slice(file.originalname.lastIndexOf(".")).toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
    throw new Error("파일 확장자가 이상하오");
    }

    if (file.size > maxSizeInBytes) {
    throw new Error("파일 크기가 너무 크오");
    }
};
