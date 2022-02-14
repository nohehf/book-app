import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Response,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream, existsSync } from 'fs';
import { diskStorage } from 'multer';
import { multerOptions } from './upload.config';

@Controller('books')
export class BooksController {
  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    return {
      originalName: file.originalname,
      newName: file.filename,
      path: '/books/' + file.filename,
    };
  }

  @Get(':id')
  getFile(
    @Param('id') id: string,
    @Response({ passthrough: true }) res,
  ): StreamableFile {
    const filepath: string = './uploads/' + id;
    if (existsSync(filepath)) {
      const file = createReadStream(filepath);
      res.set({
        'Content-Disposition': `inline; filename="${id}.pdf"`,
        'Content-Type': 'application/pdf',
      });
      return new StreamableFile(file);
    }
    throw new NotFoundException();
  }
}
