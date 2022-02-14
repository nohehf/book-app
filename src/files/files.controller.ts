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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream, existsSync } from 'fs';
import { diskStorage } from 'multer';

@Controller('file')
export class FilesController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      originalName: file.originalname,
      newName: file.filename,
      path: '/file/' + file.filename,
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

async function saveFile(file: Express.Multer.File): Promise<any> {
  return;
}
