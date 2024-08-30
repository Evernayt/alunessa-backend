import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as sharp from 'sharp';
import { encode } from 'blurhash';
import { DeleteFileDto } from './dto/deleteFileDto';
import { IFile } from 'src/common/types/IFile';

const encodeImageToBlurhash = (path: string): Promise<string> =>
  new Promise((resolve, reject) => {
    sharp(path)
      .raw()
      .ensureAlpha()
      .resize(32, 32, { fit: 'inside' })
      .toBuffer((err, buffer, { width, height }) => {
        if (err) return reject(err);
        resolve(encode(new Uint8ClampedArray(buffer), width, height, 4, 4));
      });
  });

@Injectable()
export class FilesService {
  async uploadAvatar(file: IFile) {
    try {
      const fileName = `${uuidv4()}.jpg`;
      const avatarsPath = path.join(__dirname, '../..', 'static', 'avatar');

      await sharp(file.buffer)
        .resize(160, 160, { fit: 'cover' })
        .jpeg({ quality: 80 })
        .flatten({ background: '#FFF' })
        .toFile(path.join(avatarsPath, fileName));

      return { fileName };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async uploadIcon(file: IFile) {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuidv4() + '.' + fileExtension;
      const filePath = path.join(__dirname, '../..', 'static', 'icons');

      await fs.promises.writeFile(path.join(filePath, fileName), file.buffer);

      return { fileName };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async uploadImages(files: IFile[]) {
    try {
      const imagesPath = path.join(__dirname, '../..', 'static', 'images');
      const images = [];

      for (const file of files) {
        const fileName = uuidv4();
        const mediumImage = `m_${fileName}.jpg`;
        const smallImage = `s_${fileName}.jpg`;

        const metadata = await sharp(file.buffer).metadata();
        const width = metadata.width;
        const height = metadata.height;
        const isLandscape = width > height;

        let mediumWidth = 800;
        let mediumHeight = Math.round(height * (mediumWidth / width));
        let smallWidth = 500;
        let smallHeight = Math.round(height * (smallWidth / width));

        if (isLandscape) {
          mediumHeight = mediumWidth;
          mediumWidth = Math.round(width * (mediumHeight / height));
          smallHeight = smallWidth;
          smallWidth = Math.round(width * (smallHeight / height));
        }

        await sharp(file.buffer)
          .jpeg({ quality: 80 })
          .flatten({ background: '#FFF' })
          .resize(mediumWidth, mediumHeight)
          .toFile(path.join(imagesPath, mediumImage));

        await sharp(file.buffer)
          .jpeg({ quality: 60 })
          .flatten({ background: '#FFF' })
          .resize(smallWidth, smallHeight)
          .toFile(path.join(imagesPath, smallImage));

        const blurHash = await encodeImageToBlurhash(
          path.join(imagesPath, smallImage),
        );

        images.push({
          mediumImage,
          smallImage,
          mediumWidth,
          mediumHeight,
          smallWidth,
          smallHeight,
          blurHash,
        });
      }

      return { images };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteFile(deleteFileDto: DeleteFileDto) {
    try {
      const { folder, fileNames } = deleteFileDto;

      const folderPath = path.join(__dirname, '../..', 'static', folder);

      for (const fileName of fileNames) {
        const filePath = path.join(folderPath, fileName);
        await fs.promises.unlink(filePath);
      }

      return true;
    } catch (e) {
      if (e.code !== 'ENOENT') {
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
