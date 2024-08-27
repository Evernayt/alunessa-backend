import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { SocialNetworksService } from './social-networks.service';
import { SocialNetworksController } from './social-networks.controller';
import { SocialNetwork } from './social-networks.model';
import { FilesModule } from 'src/files/files.module';

@Module({
  providers: [SocialNetworksService],
  controllers: [SocialNetworksController],
  imports: [
    SequelizeModule.forFeature([SocialNetwork]),
    forwardRef(() => AuthModule),
    forwardRef(() => FilesModule),
  ],
})
export class SocialNetworksModule {}
