import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as sharp from 'sharp';
import { DeleteFileDto } from './dto/deleteFileDto';
import { IFile } from 'src/common/types/IFile';

@Injectable()
export class FilesService {
  async uploadAvatar(file: IFile) {
    try {
      const fileName = `${uuidv4()}.jpg`;
      const avatarsPath = path.join(__dirname, '../..', 'static', 'avatar');

      if (!fs.existsSync(avatarsPath)) {
        fs.mkdirSync(avatarsPath, { recursive: true });
      }

      await sharp(file.buffer)
        .resize(200)
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

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.join(filePath, fileName), file.buffer);

      return { fileName };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async uploadImages(files: IFile[]) {
    try {
      const imagesPath = path.join(__dirname, '../..', 'static', 'images');

      if (!fs.existsSync(imagesPath)) {
        fs.mkdirSync(imagesPath, { recursive: true });
      }

      const images = [];

      for (const file of files) {
        const fileExtension = file.originalname.split('.').pop();
        const fileName = uuidv4() + '.' + fileExtension;
        const compressedFileName = 'c_' + fileName;

        await sharp(file.buffer)
          .jpeg({ quality: 60 })
          .flatten({ background: '#FFF' })
          .resize(500)
          .toFile(path.join(imagesPath, compressedFileName));

        fs.writeFileSync(path.join(imagesPath, fileName), file.buffer);

        images.push({
          originalFileName: fileName,
          compressedFileName,
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

      fileNames.forEach((fileName) => {
        const filePath = path.join(folderPath, fileName);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });

      return true;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
