import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { InfoService } from './info.service';
import { InfoController } from './info.controller';
import { Info } from './info.model';

@Module({
  providers: [InfoService],
  controllers: [InfoController],
  imports: [SequelizeModule.forFeature([Info]), forwardRef(() => AuthModule)],
})
export class InfoModule {}
