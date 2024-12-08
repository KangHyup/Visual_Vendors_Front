export const validateFile = (file) => {
    if (!file) {
    throw new Error("No file uploaded");
    }

    const allowedExtensions = [".mp4", ".avi", ".mov", ".mkv"];
    const maxSizeInBytes = 500 * 1024 * 1024; // 500MB
    const fileExtension = file.originalname.slice(file.originalname.lastIndexOf(".")).toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
    throw new Error("Invalid file format");
    }

    if (file.size > maxSizeInBytes) {
    throw new Error("File size exceeds 500MB limit");
    }
};
