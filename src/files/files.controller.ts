import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import getBytesByMb from 'src/common/helpers/getBytesByMb';
import { DeleteFileDto } from './dto/deleteFileDto';
import { IFile } from 'src/common/types/IFile';

@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload-avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: getBytesByMb(5) },
    }),
  )
  uploadAvatar(@UploadedFile() file: IFile) {
    return this.filesService.uploadAvatar(file);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload-icon')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: getBytesByMb(5) },
    }),
  )
  uploadIcon(@UploadedFile() file: IFile) {
    return this.filesService.uploadIcon(file);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload-images')
  @UseInterceptors(
    FilesInterceptor('files', 100, { limits: { fileSize: getBytesByMb(300) } }),
  )
  uploadImages(@UploadedFiles() files: any[]) {
    return this.filesService.uploadImages(files);
  }

  @Get('delete-file')
  deleteFile(@Query() deleteFileDto: DeleteFileDto) {
    return this.filesService.deleteFile(deleteFileDto);
  }
}
