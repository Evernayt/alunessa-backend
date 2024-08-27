import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { Client } from './clients.model';
import { FilesModule } from 'src/files/files.module';

@Module({
  providers: [ClientsService],
  controllers: [ClientsController],
  imports: [
    SequelizeModule.forFeature([Client]),
    forwardRef(() => AuthModule),
    forwardRef(() => FilesModule),
  ],
})
export class ClientsModule {}
