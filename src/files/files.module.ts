import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  providers: [FilesService],
  controllers: [FilesController],
  imports: [forwardRef(() => AuthModule)],
  exports: [FilesService],
})
export class FilesModule {}
