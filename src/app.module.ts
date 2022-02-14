import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthModuleOptions } from '@nestjs/passport';
import { FilesModule } from './files/files.module';

@Module({
  imports: [UserModule, AuthModule, FilesModule],
  controllers: [AppController],
  providers: [AuthModuleOptions],
})
export class AppModule {}
