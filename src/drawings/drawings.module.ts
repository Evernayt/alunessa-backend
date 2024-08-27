import { forwardRef, Module } from '@nestjs/common';
import { DrawingsService } from './drawings.service';
import { DrawingsController } from './drawings.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Drawing } from './drawings.model';
import { AuthModule } from 'src/auth/auth.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  providers: [DrawingsService],
  controllers: [DrawingsController],
  imports: [
    SequelizeModule.forFeature([Drawing]),
    forwardRef(() => AuthModule),
    forwardRef(() => FilesModule),
  ],
})
export class DrawingsModule {}
