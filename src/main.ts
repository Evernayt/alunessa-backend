import { NestFactory } from '@nestjs/core';
import { ServerModule } from './server.module';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';
import * as path from 'path';

function createFolders() {
  const avatarPath = path.join(__dirname, '..', 'static', 'avatar');
  const imagesPath = path.join(__dirname, '..', 'static', 'images');
  const iconsPath = path.join(__dirname, '..', 'static', 'icons');

  const paths = [avatarPath, imagesPath, iconsPath];
  paths.forEach((path) => {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
  });
}

async function bootstrap() {
  const PORT = process.env.PORT || 5000;

  const server = await NestFactory.create(ServerModule, { cors: true });
  server.use(bodyParser.json({ limit: '50mb' }));
  server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

  await server.listen(PORT, () =>
    console.log(`[SERVER] STARTED ON PORT ${PORT}`),
  );
}

createFolders();
bootstrap();
