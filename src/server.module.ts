import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { DrawingsModule } from './drawings/drawings.module';
import { ClientsModule } from './clients/clients.module';
import { SocialNetworksModule } from './social-networks/social-networks.module';
import { UsersModule } from './users/users.module';
import { InfoModule } from './info/info.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '../static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'mariadb',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_HOST),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
      //sync: { force: true },
    }),
    AuthModule,
    FilesModule,
    DrawingsModule,
    ClientsModule,
    SocialNetworksModule,
    UsersModule,
    InfoModule,
  ],
})
export class ServerModule {}
