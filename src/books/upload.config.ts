import { diskStorage } from 'multer';
export const multerOptions = {
  storage: diskStorage({
    destination: './uploads',
  }),
  fileFilter: (req, file, callback) => {
    if (!(file.mimetype === 'application/pdf')) {
      req.fileValidationError = 'Bad file type, only PDFs are allowed';
      return callback(null, false);
    }
    return callback(null, true);
  },
};
