import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

//imports:  //[MulterModule.register({ dest: './src/files/uploads' })],
@Module({
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
