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
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Role } from 'src/users/role.enum';
import { createReadStream, existsSync } from 'fs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { multerOptions } from './upload.config';
import { HasRole } from 'src/users/role.decorator';
import { RolesGuard } from 'src/users/role.guard';

@Controller('books')
export class BooksController {
  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRole(Role.Student, Role.Teacher)
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRole(Role.Teacher)
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
